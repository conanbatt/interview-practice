"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    WORKER_SELF_EXIT_CODE: null,
    initializeServerWorker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    WORKER_SELF_EXIT_CODE: function() {
        return WORKER_SELF_EXIT_CODE;
    },
    initializeServerWorker: function() {
        return initializeServerWorker;
    }
});
require("./cpu-profile");
const _v8 = /*#__PURE__*/ _interop_require_default(require("v8"));
const _http = /*#__PURE__*/ _interop_require_default(require("http"));
require("../require-hook");
require("../node-polyfill-fetch");
const _log = require("../../build/output/log");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
process.on("unhandledRejection", (err)=>{
    console.error(err);
});
process.on("uncaughtException", (err)=>{
    console.error(err);
});
const WORKER_SELF_EXIT_CODE = 77;
const MAXIMUM_HEAP_SIZE_ALLOWED = _v8.default.getHeapStatistics().heap_size_limit / 1024 / 1024 * 0.9;
async function initializeServerWorker(requestHandler, upgradeHandler, opts) {
    const server = _http.default.createServer((req, res)=>{
        return requestHandler(req, res).catch((err)=>{
            res.statusCode = 500;
            res.end("Internal Server Error");
            console.error(err);
        }).finally(()=>{
            if (process.memoryUsage().heapUsed / 1024 / 1024 > MAXIMUM_HEAP_SIZE_ALLOWED) {
                (0, _log.warn)("The server is running out of memory, restarting to free up memory.");
                server.close();
                process.exit(WORKER_SELF_EXIT_CODE);
            }
        });
    });
    if (opts.keepAliveTimeout) {
        server.keepAliveTimeout = opts.keepAliveTimeout;
    }
    return new Promise(async (resolve, reject)=>{
        server.on("error", (err)=>{
            console.error(`Invariant: failed to start server worker`, err);
            process.exit(1);
        });
        if (upgradeHandler) {
            server.on("upgrade", (req, socket, upgrade)=>{
                upgradeHandler(req, socket, upgrade);
            });
        }
        let hostname = opts.hostname || "localhost";
        server.on("listening", async ()=>{
            try {
                const addr = server.address();
                const host = addr ? typeof addr === "object" ? addr.address : addr : undefined;
                const port = addr && typeof addr === "object" ? addr.port : 0;
                if (!port || !host) {
                    console.error(`Invariant failed to detect render worker host/port`, addr);
                    process.exit(1);
                }
                resolve({
                    server,
                    port,
                    hostname: host
                });
            } catch (err) {
                return reject(err);
            }
        });
        server.listen(0, hostname);
    });
}

//# sourceMappingURL=setup-server-worker.js.map