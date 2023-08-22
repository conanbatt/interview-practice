"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    defineConfig: null,
    test: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    defineConfig: function() {
        return _index.defineConfig;
    },
    test: function() {
        return test;
    },
    default: function() {
        return _default;
    }
});
0 && __export(require("msw")) && __export(require("@playwright/test"));
const _index = require("./index");
const _msw = _export_star(require("msw"), exports);
const _stricteventemitter = require("strict-event-emitter");
_export_star(require("@playwright/test"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
const test = _index.test.extend({
    mswHandlers: [
        [],
        {
            option: true
        }
    ],
    msw: [
        async ({ next , mswHandlers  }, use)=>{
            const handlers = [
                ...mswHandlers
            ];
            const emitter = new _stricteventemitter.Emitter();
            next.onFetch(async (request)=>{
                const { body , method , headers , credentials , cache , redirect , integrity , keepalive , mode , destination , referrer , referrerPolicy  } = request;
                const mockedRequest = new _msw.MockedRequest(new URL(request.url), {
                    body: body ? await request.arrayBuffer() : undefined,
                    method,
                    headers: Object.fromEntries(headers),
                    credentials,
                    cache,
                    redirect,
                    integrity,
                    keepalive,
                    mode,
                    destination,
                    referrer,
                    referrerPolicy
                });
                let isPassthrough = false;
                let mockedResponse;
                await (0, _msw.handleRequest)(mockedRequest, handlers.slice(0), {
                    onUnhandledRequest: "error"
                }, emitter, {
                    onPassthroughResponse: ()=>{
                        isPassthrough = true;
                    },
                    onMockedResponse: (r)=>{
                        mockedResponse = r;
                    }
                });
                if (isPassthrough) {
                    return "continue";
                }
                if (mockedResponse) {
                    const { status , headers: responseHeaders , body: responseBody , delay  } = mockedResponse;
                    if (delay) {
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                    }
                    return new Response(responseBody, {
                        status,
                        headers: new Headers(responseHeaders)
                    });
                }
                return "abort";
            });
            await use({
                use: (...newHandlers)=>{
                    handlers.unshift(...newHandlers);
                }
            });
            handlers.length = 0;
        },
        {
            auto: true
        }
    ]
});
const _default = test;

//# sourceMappingURL=msw.js.map