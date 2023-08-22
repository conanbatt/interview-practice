"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    interceptTestApis: null,
    wrapRequestHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _async_hooks = require("async_hooks");
const _ClientRequest = require("next/dist/compiled/@mswjs/interceptors/ClientRequest");
const testStorage = new _async_hooks.AsyncLocalStorage();
async function buildProxyRequest(testData, request) {
    const { url , method , headers , body , cache , credentials , integrity , mode , redirect , referrer , referrerPolicy  } = request;
    return {
        testData,
        api: "fetch",
        request: {
            url,
            method,
            headers: Array.from(headers),
            body: body ? Buffer.from(await request.arrayBuffer()).toString("base64") : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status , headers , body  } = proxyResponse.response;
    return new Response(body ? Buffer.from(body, "base64") : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = testStorage.getStore();
    if (!testInfo) {
        throw new Error("No test info");
    }
    const { testData , proxyPort  } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: "POST",
        body: JSON.stringify(proxyRequest)
    });
    if (!resp.ok) {
        throw new Error(`Proxy request failed: ${resp.status}`);
    }
    const proxyResponse = await resp.json();
    const { api  } = proxyResponse;
    switch(api){
        case "continue":
            return originalFetch(request);
        case "abort":
        case "unhandled":
            throw new Error("Proxy request aborted");
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch() {
    const originalFetch = global.fetch;
    global.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
}
function interceptTestApis() {
    const originalFetch = global.fetch;
    interceptFetch();
    const clientRequestInterceptor = new _ClientRequest.ClientRequestInterceptor();
    clientRequestInterceptor.on("request", async ({ request  })=>{
        const response = await handleFetch(originalFetch, request);
        request.respondWith(response);
    });
    clientRequestInterceptor.apply();
    // Cleanup.
    return ()=>{
        clientRequestInterceptor.dispose();
        global.fetch = originalFetch;
    };
}
function wrapRequestHandler(handler) {
    return async (req, res, parsedUrl)=>{
        const proxyPortHeader = req.headers["next-test-proxy-port"];
        if (!proxyPortHeader) {
            await handler(req, res, parsedUrl);
            return;
        }
        const url = req.url ?? "";
        const proxyPort = Number(proxyPortHeader);
        const testData = req.headers["next-test-data"] ?? "";
        const testReqInfo = {
            url,
            proxyPort,
            testData
        };
        await testStorage.run(testReqInfo, ()=>handler(req, res, parsedUrl));
    };
}

//# sourceMappingURL=server.js.map