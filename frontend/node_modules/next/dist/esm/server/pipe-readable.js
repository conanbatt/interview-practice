export function isAbortError(e) {
    return (e == null ? void 0 : e.name) === "AbortError";
}
export async function pipeReadable(readable, writable) {
    const reader = readable.getReader();
    let readerDone = false;
    let writableClosed = false;
    // It's not enough just to check for `writable.destroyed`, because the client
    // may disconnect while we're waiting for a read. We need to immediately
    // cancel the readable, and that requires an out-of-band listener.
    function onClose() {
        writableClosed = true;
        writable.off("close", onClose);
        // If the reader is not yet done, we need to cancel it so that the stream
        // source's resources can be cleaned up. If a read is in-progress, this
        // will also ensure the read promise rejects and frees our resources.
        if (!readerDone) {
            readerDone = true;
            reader.cancel().catch(()=>{});
        }
    }
    writable.on("close", onClose);
    try {
        while(true){
            const { done , value  } = await reader.read();
            readerDone = done;
            if (done || writableClosed) {
                break;
            }
            if (value) {
                writable.write(Buffer.from(value));
                writable.flush == null ? void 0 : writable.flush();
            }
        }
    } catch (e) {
        // If the client disconnects, we don't want to emit an unhandled error.
        if (!isAbortError(e)) {
            throw e;
        }
    } finally{
        writable.off("close", onClose);
        // If we broke out of the loop because of a client disconnect, and the
        // close event hasn't yet fired, we can early cancel.
        if (!readerDone) {
            reader.cancel().catch(()=>{});
        }
        // If the client hasn't disconnected yet, end the writable so that the
        // response sends the final bytes.
        if (!writableClosed) {
            writable.end();
        }
    }
}

//# sourceMappingURL=pipe-readable.js.map