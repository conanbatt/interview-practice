"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRequestHandlers: null,
    startServer: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRequestHandlers: function() {
        return getRequestHandlers;
    },
    startServer: function() {
        return startServer;
    }
});
require("../node-polyfill-fetch");
const _http = /*#__PURE__*/ _interop_require_default(require("http"));
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../build/output/log"));
const _debug = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/debug"));
const _utils = require("./utils");
const _formathostname = require("./format-hostname");
const _routerserver = require("./router-server");
const _isnodedebugging = require("./is-node-debugging");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const debug = (0, _debug.default)("next:start-server");
async function getRequestHandlers({ dir , port , isDev , hostname , minimalMode , isNodeDebugging , keepAliveTimeout , experimentalTestProxy  }) {
    return (0, _routerserver.initialize)({
        dir,
        port,
        hostname,
        dev: isDev,
        minimalMode,
        workerType: "router",
        isNodeDebugging: isNodeDebugging || false,
        keepAliveTimeout,
        experimentalTestProxy
    });
}
async function startServer({ dir , port , isDev , hostname , minimalMode , allowRetry , keepAliveTimeout , isExperimentalTestProxy , logReady =true  }) {
    let handlersReady = ()=>{};
    let handlersError = ()=>{};
    let handlersPromise = new Promise((resolve, reject)=>{
        handlersReady = resolve;
        handlersError = reject;
    });
    let requestHandler = async (req, res)=>{
        if (handlersPromise) {
            await handlersPromise;
            return requestHandler(req, res);
        }
        throw new Error("Invariant request handler was not setup");
    };
    let upgradeHandler = async (req, socket, head)=>{
        if (handlersPromise) {
            await handlersPromise;
            return upgradeHandler(req, socket, head);
        }
        throw new Error("Invariant upgrade handler was not setup");
    };
    // setup server listener as fast as possible
    const server = _http.default.createServer(async (req, res)=>{
        try {
            if (handlersPromise) {
                await handlersPromise;
                handlersPromise = undefined;
            }
            await requestHandler(req, res);
        } catch (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            _log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        }
    });
    if (keepAliveTimeout) {
        server.keepAliveTimeout = keepAliveTimeout;
    }
    server.on("upgrade", async (req, socket, head)=>{
        try {
            await upgradeHandler(req, socket, head);
        } catch (err) {
            socket.destroy();
            _log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        }
    });
    let portRetryCount = 0;
    server.on("error", (err)=>{
        if (allowRetry && port && isDev && err.code === "EADDRINUSE" && portRetryCount < 10) {
            _log.warn(`Port ${port} is in use, trying ${port + 1} instead.`);
            port += 1;
            portRetryCount += 1;
            server.listen(port, hostname);
        } else {
            _log.error(`Failed to start server`);
            console.error(err);
            process.exit(1);
        }
    });
    const isNodeDebugging = (0, _isnodedebugging.checkIsNodeDebugging)();
    await new Promise((resolve)=>{
        server.on("listening", async ()=>{
            const addr = server.address();
            const actualHostname = (0, _formathostname.formatHostname)(typeof addr === "object" ? (addr == null ? void 0 : addr.address) || hostname || "localhost" : addr);
            const formattedHostname = !hostname || hostname === "0.0.0.0" ? "localhost" : actualHostname === "[::]" ? "[::1]" : actualHostname;
            port = typeof addr === "object" ? (addr == null ? void 0 : addr.port) || port : port;
            const appUrl = `http://${formattedHostname}:${port}`;
            if (isNodeDebugging) {
                const debugPort = (0, _utils.getDebugPort)();
                _log.info(`the --inspect${isNodeDebugging === "brk" ? "-brk" : ""} option was detected, the Next.js router server should be inspected at port ${debugPort}.`);
            }
            if (logReady) {
                _log.ready(`started server on ${actualHostname}:${port}, url: ${appUrl}`);
                // expose the main port to render workers
                process.env.PORT = port + "";
            }
            try {
                const cleanup = ()=>{
                    debug("start-server process cleanup");
                    server.close();
                    process.exit(0);
                };
                process.on("exit", cleanup);
                process.on("SIGINT", cleanup);
                process.on("SIGTERM", cleanup);
                process.on("uncaughtException", cleanup);
                process.on("unhandledRejection", cleanup);
                const initResult = await getRequestHandlers({
                    dir,
                    port,
                    isDev,
                    hostname,
                    minimalMode,
                    isNodeDebugging: Boolean(isNodeDebugging),
                    keepAliveTimeout,
                    experimentalTestProxy: !!isExperimentalTestProxy
                });
                requestHandler = initResult[0];
                upgradeHandler = initResult[1];
                handlersReady();
            } catch (err) {
                // fatal error if we can't setup
                handlersError();
                console.error(err);
                process.exit(1);
            }
            resolve();
        });
        server.listen(port, hostname);
    });
}

//# sourceMappingURL=start-server.js.map