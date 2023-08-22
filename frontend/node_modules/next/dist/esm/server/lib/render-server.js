// this must come first as it includes require hooks
import { initializeServerWorker } from "./setup-server-worker";
import { formatHostname } from "./format-hostname";
import next from "../next";
export const WORKER_SELF_EXIT_CODE = 77;
let result;
let app;
let sandboxContext;
let requireCacheHotReloader;
if (process.env.NODE_ENV !== "production") {
    sandboxContext = require("../web/sandbox/context");
    requireCacheHotReloader = require("../../build/webpack/plugins/nextjs-require-cache-hot-reloader");
}
export function clearModuleContext(target) {
    return sandboxContext == null ? void 0 : sandboxContext.clearModuleContext(target);
}
export function deleteAppClientCache() {
    return requireCacheHotReloader == null ? void 0 : requireCacheHotReloader.deleteAppClientCache();
}
export function deleteCache(filePaths) {
    for (const filePath of filePaths){
        requireCacheHotReloader == null ? void 0 : requireCacheHotReloader.deleteCache(filePath);
    }
}
export async function propagateServerField(field, value) {
    if (!app) {
        throw new Error("Invariant cant propagate server field, no app initialized");
    }
    let appField = app.server;
    if (appField) {
        if (typeof appField[field] === "function") {
            await appField[field].apply(app.server, Array.isArray(value) ? value : []);
        } else {
            appField[field] = value;
        }
    }
}
export async function initialize(opts) {
    // if we already setup the server return as we only need to do
    // this on first worker boot
    if (result) {
        return result;
    }
    const type = process.env.__NEXT_PRIVATE_RENDER_WORKER;
    process.title = "next-render-worker-" + type;
    let requestHandler;
    let upgradeHandler;
    const { port , server , hostname  } = await initializeServerWorker((...args)=>{
        return requestHandler(...args);
    }, (...args)=>{
        return upgradeHandler(...args);
    }, opts);
    app = next({
        ...opts,
        _routerWorker: opts.workerType === "router",
        _renderWorker: opts.workerType === "render",
        hostname,
        customServer: false,
        httpServer: server,
        port: opts.port,
        isNodeDebugging: opts.isNodeDebugging
    });
    requestHandler = app.getRequestHandler();
    upgradeHandler = app.getUpgradeHandler();
    await app.prepare(opts.serverFields);
    result = {
        port,
        hostname: formatHostname(hostname)
    };
    return result;
}

//# sourceMappingURL=render-server.js.map