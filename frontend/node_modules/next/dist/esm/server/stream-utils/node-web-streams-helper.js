import { nonNullable } from "../../lib/non-nullable";
import { getTracer } from "../lib/trace/tracer";
import { AppRenderSpan } from "../lib/trace/constants";
import { decodeText, encodeText } from "./encode-decode";
const queueTask = process.env.NEXT_RUNTIME === "edge" ? globalThis.setTimeout : setImmediate;
export const streamToBufferedResult = async (renderResult)=>{
    const renderChunks = [];
    const textDecoder = new TextDecoder();
    const writable = {
        write (chunk) {
            renderChunks.push(decodeText(chunk, textDecoder));
        },
        end () {},
        // We do not support stream cancellation
        on () {},
        off () {}
    };
    await renderResult.pipe(writable);
    return renderChunks.join("");
};
export function cloneTransformStream(source) {
    const sourceReader = source.readable.getReader();
    const clone = new TransformStream({
        async start (controller) {
            while(true){
                const { done , value  } = await sourceReader.read();
                if (done) {
                    break;
                }
                controller.enqueue(value);
            }
        },
        // skip the its own written chunks
        transform () {}
    });
    return clone;
}
export function chainStreams(streams) {
    const { readable , writable  } = new TransformStream();
    let promise = Promise.resolve();
    for(let i = 0; i < streams.length; ++i){
        promise = promise.then(()=>streams[i].pipeTo(writable, {
                preventClose: i + 1 < streams.length
            }));
    }
    return readable;
}
export function streamFromArray(strings) {
    return new ReadableStream({
        start (controller) {
            for (const str of strings){
                controller.enqueue(encodeText(str));
            }
            controller.close();
        }
    });
}
export async function streamToString(stream) {
    const reader = stream.getReader();
    const textDecoder = new TextDecoder();
    let bufferedString = "";
    while(true){
        const { done , value  } = await reader.read();
        if (done) {
            return bufferedString;
        }
        bufferedString += decodeText(value, textDecoder);
    }
}
export function createBufferedTransformStream() {
    let bufferedBytes = new Uint8Array();
    let pendingFlush = null;
    const flushBuffer = (controller)=>{
        if (!pendingFlush) {
            pendingFlush = new Promise((resolve)=>{
                setTimeout(async ()=>{
                    controller.enqueue(bufferedBytes);
                    bufferedBytes = new Uint8Array();
                    pendingFlush = null;
                    resolve();
                }, 0);
            });
        }
        return pendingFlush;
    };
    return new TransformStream({
        transform (chunk, controller) {
            const newBufferedBytes = new Uint8Array(bufferedBytes.length + chunk.byteLength);
            newBufferedBytes.set(bufferedBytes);
            newBufferedBytes.set(chunk, bufferedBytes.length);
            bufferedBytes = newBufferedBytes;
            flushBuffer(controller);
        },
        flush () {
            if (pendingFlush) {
                return pendingFlush;
            }
        }
    });
}
export function createInsertedHTMLStream(getServerInsertedHTML) {
    return new TransformStream({
        async transform (chunk, controller) {
            const insertedHTMLChunk = encodeText(await getServerInsertedHTML());
            controller.enqueue(insertedHTMLChunk);
            controller.enqueue(chunk);
        }
    });
}
export function renderToInitialStream({ ReactDOMServer , element , streamOptions  }) {
    return getTracer().trace(AppRenderSpan.renderToReadableStream, async ()=>ReactDOMServer.renderToReadableStream(element, streamOptions));
}
function createHeadInsertionTransformStream(insert) {
    let inserted = false;
    let freezing = false;
    const textDecoder = new TextDecoder();
    return new TransformStream({
        async transform (chunk, controller) {
            // While react is flushing chunks, we don't apply insertions
            if (freezing) {
                controller.enqueue(chunk);
                return;
            }
            const insertion = await insert();
            if (inserted) {
                controller.enqueue(encodeText(insertion));
                controller.enqueue(chunk);
                freezing = true;
            } else {
                const content = decodeText(chunk, textDecoder);
                const index = content.indexOf("</head>");
                if (index !== -1) {
                    const insertedHeadContent = content.slice(0, index) + insertion + content.slice(index);
                    controller.enqueue(encodeText(insertedHeadContent));
                    freezing = true;
                    inserted = true;
                }
            }
            if (!inserted) {
                controller.enqueue(chunk);
            } else {
                queueTask(()=>{
                    freezing = false;
                });
            }
        },
        async flush (controller) {
            // Check before closing if there's anything remaining to insert.
            const insertion = await insert();
            if (insertion) {
                controller.enqueue(encodeText(insertion));
            }
        }
    });
}
// Suffix after main body content - scripts before </body>,
// but wait for the major chunks to be enqueued.
function createDeferredSuffixStream(suffix) {
    let suffixFlushed = false;
    let suffixFlushTask = null;
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(chunk);
            if (!suffixFlushed && suffix.length) {
                suffixFlushed = true;
                suffixFlushTask = new Promise((res)=>{
                    // NOTE: streaming flush
                    // Enqueue suffix part before the major chunks are enqueued so that
                    // suffix won't be flushed too early to interrupt the data stream
                    setTimeout(()=>{
                        controller.enqueue(encodeText(suffix));
                        res();
                    });
                });
            }
        },
        flush (controller) {
            if (suffixFlushTask) return suffixFlushTask;
            if (!suffixFlushed && suffix.length) {
                suffixFlushed = true;
                controller.enqueue(encodeText(suffix));
            }
        }
    });
}
export function createInlineDataStream(dataStream) {
    let dataStreamFinished = null;
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(chunk);
            if (!dataStreamFinished) {
                const dataStreamReader = dataStream.getReader();
                // NOTE: streaming flush
                // We are buffering here for the inlined data stream because the
                // "shell" stream might be chunkenized again by the underlying stream
                // implementation, e.g. with a specific high-water mark. To ensure it's
                // the safe timing to pipe the data stream, this extra tick is
                // necessary.
                dataStreamFinished = new Promise((res)=>// We use `setTimeout` here to ensure that it's inserted after flushing
                    // the shell. Note that this implementation might get stale if impl
                    // details of Fizz change in the future.
                    // Also we are not using `setImmediate` here because it's not available
                    // broadly in all runtimes, for example some edge workers might not
                    // have it.
                    setTimeout(async ()=>{
                        try {
                            while(true){
                                const { done , value  } = await dataStreamReader.read();
                                if (done) {
                                    return res();
                                }
                                controller.enqueue(value);
                            }
                        } catch (err) {
                            controller.error(err);
                        }
                        res();
                    }, 0));
            }
        },
        flush () {
            if (dataStreamFinished) {
                return dataStreamFinished;
            }
        }
    });
}
/**
 * This transform stream moves the suffix to the end of the stream, so results
 * like `</body></html><script>...</script>` will be transformed to
 * `<script>...</script></body></html>`.
 */ function createMoveSuffixStream(suffix) {
    let foundSuffix = false;
    const textDecoder = new TextDecoder();
    // Remove suffix from the stream, and enqueue it back in flush
    return new TransformStream({
        transform (chunk, controller) {
            if (!suffix || foundSuffix) {
                return controller.enqueue(chunk);
            }
            const content = decodeText(chunk, textDecoder);
            if (content.endsWith(suffix)) {
                foundSuffix = true;
                const contentWithoutSuffix = content.slice(0, -suffix.length);
                controller.enqueue(encodeText(contentWithoutSuffix));
            } else {
                controller.enqueue(chunk);
            }
        },
        flush (controller) {
            if (suffix) {
                controller.enqueue(encodeText(suffix));
            }
        }
    });
}
export function createRootLayoutValidatorStream(assetPrefix = "", getTree) {
    let foundHtml = false;
    let foundBody = false;
    const textDecoder = new TextDecoder();
    return new TransformStream({
        async transform (chunk, controller) {
            if (!foundHtml || !foundBody) {
                const content = decodeText(chunk, textDecoder);
                if (!foundHtml && content.includes("<html")) {
                    foundHtml = true;
                }
                if (!foundBody && content.includes("<body")) {
                    foundBody = true;
                }
            }
            controller.enqueue(chunk);
        },
        flush (controller) {
            // If html or body tag is missing, we need to inject a script to notify
            // the client.
            if (!foundHtml || !foundBody) {
                const missingTags = [
                    foundHtml ? null : "html",
                    foundBody ? null : "body"
                ].filter(nonNullable);
                controller.enqueue(encodeText(`<script>self.__next_root_layout_missing_tags_error=${JSON.stringify({
                    missingTags,
                    assetPrefix: assetPrefix ?? "",
                    tree: getTree()
                })}</script>`));
            }
        }
    });
}
export async function continueFromInitialStream(renderStream, { suffix , dataStream , generateStaticHTML , getServerInsertedHTML , serverInsertedHTMLToHead , validateRootLayout  }) {
    const closeTag = "</body></html>";
    // Suffix itself might contain close tags at the end, so we need to split it.
    const suffixUnclosed = suffix ? suffix.split(closeTag)[0] : null;
    if (generateStaticHTML) {
        await renderStream.allReady;
    }
    const transforms = [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Insert generated tags to head
        getServerInsertedHTML && !serverInsertedHTMLToHead ? createInsertedHTMLStream(getServerInsertedHTML) : null,
        // Insert suffix content
        suffixUnclosed != null ? createDeferredSuffixStream(suffixUnclosed) : null,
        // Insert the flight data stream
        dataStream ? createInlineDataStream(dataStream) : null,
        // Close tags should always be deferred to the end
        createMoveSuffixStream(closeTag),
        // Special head insertions
        // TODO-APP: Insert server side html to end of head in app layout rendering, to avoid
        // hydration errors. Remove this once it's ready to be handled by react itself.
        getServerInsertedHTML && serverInsertedHTMLToHead ? createHeadInsertionTransformStream(getServerInsertedHTML) : null,
        validateRootLayout ? createRootLayoutValidatorStream(validateRootLayout.assetPrefix, validateRootLayout.getTree) : null
    ].filter(nonNullable);
    return transforms.reduce((readable, transform)=>readable.pipeThrough(transform), renderStream);
}

//# sourceMappingURL=node-web-streams-helper.js.map