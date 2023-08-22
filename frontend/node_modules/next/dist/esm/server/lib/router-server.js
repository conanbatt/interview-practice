import url from "url";
import path from "path";
import loadConfig from "../config";
import { serveStatic } from "../serve-static";
import setupDebug from "next/dist/compiled/debug";
import { splitCookiesString, toNodeOutgoingHttpHeaders } from "../web/utils";
import { Telemetry } from "../../telemetry/storage";
import { DecodeError } from "../../shared/lib/utils";
import { filterReqHeaders, ipcForbiddenHeaders } from "./server-ipc/utils";
import { findPagesDir } from "../../lib/find-pages-dir";
import { setupFsCheck } from "./router-utils/filesystem";
import { proxyRequest } from "./router-utils/proxy-request";
import { invokeRequest } from "./server-ipc/invoke-request";
import { isAbortError, pipeReadable } from "../pipe-readable";
import { createRequestResponseMocks } from "./mock-request";
import { createIpcServer, createWorker } from "./server-ipc";
import { getResolveRoutes } from "./router-utils/resolve-routes";
import { getRequestMeta } from "../request-meta";
import { pathHasPrefix } from "../../shared/lib/router/utils/path-has-prefix";
import { removePathPrefix } from "../../shared/lib/router/utils/remove-path-prefix";
import setupCompression from "next/dist/compiled/compression";
import { PHASE_PRODUCTION_SERVER, PHASE_DEVELOPMENT_SERVER, PERMANENT_REDIRECT_STATUS } from "../../shared/lib/constants";
import { signalFromNodeResponse } from "../web/spec-extension/adapters/next-request";
const debug = setupDebug("next:router-server:main");
const nextDeleteCacheCallbacks = [];
const nextDeleteAppClientCacheCallbacks = [];
const nextClearModuleContextCallbacks = [];
export async function initialize(opts) {
    var _renderWorkers_app, _renderWorkers_pages;
    process.title = "next-router-worker";
    if (!process.env.NODE_ENV) {
        // @ts-ignore not readonly
        process.env.NODE_ENV = opts.dev ? "development" : "production";
    }
    const config = await loadConfig(opts.dev ? PHASE_DEVELOPMENT_SERVER : PHASE_PRODUCTION_SERVER, opts.dir, undefined, undefined, true);
    let compress;
    if ((config == null ? void 0 : config.compress) !== false) {
        compress = setupCompression();
    }
    const fsChecker = await setupFsCheck({
        dev: opts.dev,
        dir: opts.dir,
        config,
        minimalMode: opts.minimalMode
    });
    let devInstance;
    if (opts.dev) {
        const telemetry = new Telemetry({
            distDir: path.join(opts.dir, config.distDir)
        });
        const { pagesDir , appDir  } = findPagesDir(opts.dir, !!config.experimental.appDir);
        const { setupDev  } = await require("./router-utils/setup-dev");
        devInstance = await setupDev({
            appDir,
            pagesDir,
            telemetry,
            fsChecker,
            dir: opts.dir,
            nextConfig: config,
            isCustomServer: opts.customServer,
            turbo: !!process.env.EXPERIMENTAL_TURBOPACK
        });
    }
    const renderWorkerOpts = {
        port: opts.port,
        dir: opts.dir,
        workerType: "render",
        hostname: opts.hostname,
        minimalMode: opts.minimalMode,
        dev: !!opts.dev,
        isNodeDebugging: !!opts.isNodeDebugging,
        serverFields: (devInstance == null ? void 0 : devInstance.serverFields) || {},
        experimentalTestProxy: !!opts.experimentalTestProxy
    };
    const renderWorkers = {};
    const { ipcPort , ipcValidationKey  } = await createIpcServer({
        async ensurePage (match) {
            // TODO: remove after ensure is pulled out of server
            return await (devInstance == null ? void 0 : devInstance.hotReloader.ensurePage(match));
        },
        async logErrorWithOriginalStack (...args) {
            // @ts-ignore
            return await (devInstance == null ? void 0 : devInstance.logErrorWithOriginalStack(...args));
        },
        async getFallbackErrorComponents () {
            var _devInstance_hotReloader;
            await (devInstance == null ? void 0 : (_devInstance_hotReloader = devInstance.hotReloader) == null ? void 0 : _devInstance_hotReloader.buildFallbackError());
            // Build the error page to ensure the fallback is built too.
            // TODO: See if this can be moved into hotReloader or removed.
            await (devInstance == null ? void 0 : devInstance.hotReloader.ensurePage({
                page: "/_error",
                clientOnly: false
            }));
        },
        async getCompilationError (page) {
            var _devInstance_hotReloader;
            const errors = await (devInstance == null ? void 0 : (_devInstance_hotReloader = devInstance.hotReloader) == null ? void 0 : _devInstance_hotReloader.getCompilationErrors(page));
            if (!errors) return;
            // Return the very first error we found.
            return errors[0];
        },
        async revalidate ({ urlPath , revalidateHeaders , opts: revalidateOpts  }) {
            const mocked = createRequestResponseMocks({
                url: urlPath,
                headers: revalidateHeaders
            });
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await requestHandler(mocked.req, mocked.res);
            await mocked.res.hasStreamed;
            if (mocked.res.getHeader("x-nextjs-cache") !== "REVALIDATED" && !(mocked.res.statusCode === 404 && revalidateOpts.unstable_onlyGenerated)) {
                throw new Error(`Invalid response ${mocked.res.statusCode}`);
            }
            return {};
        }
    });
    const { initialEnv  } = require("@next/env");
    if (!!config.experimental.appDir) {
        renderWorkers.app = await createWorker(ipcPort, ipcValidationKey, opts.isNodeDebugging, "app", config, initialEnv);
    }
    renderWorkers.pages = await createWorker(ipcPort, ipcValidationKey, opts.isNodeDebugging, "pages", config, initialEnv);
    // pre-initialize workers
    const initialized = {
        app: await ((_renderWorkers_app = renderWorkers.app) == null ? void 0 : _renderWorkers_app.initialize(renderWorkerOpts)),
        pages: await ((_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : _renderWorkers_pages.initialize(renderWorkerOpts))
    };
    if (devInstance) {
        Object.assign(devInstance.renderWorkers, renderWorkers);
        nextDeleteCacheCallbacks.push((filePaths)=>{
            var _renderWorkers_pages, _renderWorkers_app;
            return Promise.all([
                (_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : _renderWorkers_pages.deleteCache(filePaths),
                (_renderWorkers_app = renderWorkers.app) == null ? void 0 : _renderWorkers_app.deleteCache(filePaths)
            ]);
        });
        nextDeleteAppClientCacheCallbacks.push(()=>{
            var _renderWorkers_pages, _renderWorkers_app;
            return Promise.all([
                (_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : _renderWorkers_pages.deleteAppClientCache(),
                (_renderWorkers_app = renderWorkers.app) == null ? void 0 : _renderWorkers_app.deleteAppClientCache()
            ]);
        });
        nextClearModuleContextCallbacks.push((targetPath)=>{
            var _renderWorkers_pages, _renderWorkers_app;
            return Promise.all([
                (_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : _renderWorkers_pages.clearModuleContext(targetPath),
                (_renderWorkers_app = renderWorkers.app) == null ? void 0 : _renderWorkers_app.clearModuleContext(targetPath)
            ]);
        });
        global._nextDeleteCache = async (filePaths)=>{
            for (const cb of nextDeleteCacheCallbacks){
                try {
                    await cb(filePaths);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        global._nextDeleteAppClientCache = async ()=>{
            for (const cb of nextDeleteAppClientCacheCallbacks){
                try {
                    await cb();
                } catch (err) {
                    console.error(err);
                }
            }
        };
        global._nextClearModuleContext = async (targetPath)=>{
            for (const cb of nextClearModuleContextCallbacks){
                try {
                    await cb(targetPath);
                } catch (err) {
                    console.error(err);
                }
            }
        };
    }
    const cleanup = ()=>{
        var _renderWorkers_app, _renderWorkers_app__workerPool, _renderWorkers_pages, _renderWorkers_pages__workerPool;
        debug("router-server process cleanup");
        for (const curWorker of [
            ...((_renderWorkers_app = renderWorkers.app) == null ? void 0 : (_renderWorkers_app__workerPool = _renderWorkers_app._workerPool) == null ? void 0 : _renderWorkers_app__workerPool._workers) || [],
            ...((_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : (_renderWorkers_pages__workerPool = _renderWorkers_pages._workerPool) == null ? void 0 : _renderWorkers_pages__workerPool._workers) || []
        ]){
            var _curWorker__child;
            (_curWorker__child = curWorker._child) == null ? void 0 : _curWorker__child.kill("SIGINT");
        }
        if (!process.env.__NEXT_PRIVATE_CPU_PROFILE) {
            process.exit(0);
        }
    };
    process.on("exit", cleanup);
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("uncaughtException", cleanup);
    process.on("unhandledRejection", cleanup);
    const resolveRoutes = getResolveRoutes(fsChecker, config, opts, renderWorkers, renderWorkerOpts, devInstance == null ? void 0 : devInstance.ensureMiddleware);
    const requestHandler = async (req, res)=>{
        if (compress) {
            // @ts-expect-error not express req/res
            compress(req, res, ()=>{});
        }
        req.on("error", (_err)=>{
        // TODO: log socket errors?
        });
        res.on("error", (_err)=>{
        // TODO: log socket errors?
        });
        const matchedDynamicRoutes = new Set();
        async function invokeRender(parsedUrl, type, handleIndex, invokePath, additionalInvokeHeaders = {}) {
            var _fsChecker_getMiddlewareMatchers;
            // invokeRender expects /api routes to not be locale prefixed
            // so normalize here before continuing
            if (config.i18n && removePathPrefix(invokePath, config.basePath).startsWith(`/${parsedUrl.query.__nextLocale}/api`)) {
                invokePath = fsChecker.handleLocale(removePathPrefix(invokePath, config.basePath)).pathname;
            }
            if (req.headers["x-nextjs-data"] && ((_fsChecker_getMiddlewareMatchers = fsChecker.getMiddlewareMatchers()) == null ? void 0 : _fsChecker_getMiddlewareMatchers.length) && removePathPrefix(invokePath, config.basePath) === "/404") {
                res.setHeader("x-nextjs-matched-path", parsedUrl.pathname || "");
                res.statusCode = 200;
                res.setHeader("content-type", "application/json");
                res.end("{}");
                return null;
            }
            const workerResult = initialized[type];
            if (!workerResult) {
                throw new Error(`Failed to initialize render worker ${type}`);
            }
            const renderUrl = `http://${workerResult.hostname}:${workerResult.port}${req.url}`;
            const invokeHeaders = {
                ...req.headers,
                "x-middleware-invoke": "",
                "x-invoke-path": invokePath,
                "x-invoke-query": encodeURIComponent(JSON.stringify(parsedUrl.query)),
                ...additionalInvokeHeaders || {}
            };
            debug("invokeRender", renderUrl, invokeHeaders);
            let invokeRes;
            try {
                var _getRequestMeta;
                invokeRes = await invokeRequest(renderUrl, {
                    headers: invokeHeaders,
                    method: req.method,
                    signal: signalFromNodeResponse(res)
                }, (_getRequestMeta = getRequestMeta(req, "__NEXT_CLONABLE_BODY")) == null ? void 0 : _getRequestMeta.cloneBodyStream());
            } catch (e) {
                // If the client aborts before we can receive a response object (when
                // the headers are flushed), then we can early exit without further
                // processing.
                if (isAbortError(e)) {
                    return;
                }
                throw e;
            }
            debug("invokeRender res", invokeRes.status, invokeRes.headers);
            // when we receive x-no-fallback we restart
            if (invokeRes.headers.get("x-no-fallback")) {
                // eslint-disable-next-line
                await handleRequest(handleIndex + 1);
                return;
            }
            for (const [key, value] of Object.entries(filterReqHeaders(toNodeOutgoingHttpHeaders(invokeRes.headers), ipcForbiddenHeaders))){
                if (value !== undefined) {
                    if (key === "set-cookie") {
                        const curValue = res.getHeader(key);
                        const newValue = [];
                        for (const cookie of Array.isArray(curValue) ? curValue : splitCookiesString(curValue || "")){
                            newValue.push(cookie);
                        }
                        for (const val of Array.isArray(value) ? value : value ? [
                            value
                        ] : []){
                            newValue.push(val);
                        }
                        res.setHeader(key, newValue);
                    } else {
                        res.setHeader(key, value);
                    }
                }
            }
            res.statusCode = invokeRes.status || 200;
            res.statusMessage = invokeRes.statusText || "";
            if (invokeRes.body) {
                await pipeReadable(invokeRes.body, res);
            } else {
                res.end();
            }
            return;
        }
        const handleRequest = async (handleIndex)=>{
            if (handleIndex > 5) {
                throw new Error(`Attempted to handle request too many times ${req.url}`);
            }
            // handle hot-reloader first
            if (devInstance) {
                const origUrl = req.url || "/";
                if (config.basePath && pathHasPrefix(origUrl, config.basePath)) {
                    req.url = removePathPrefix(origUrl, config.basePath);
                }
                const parsedUrl = url.parse(req.url || "/");
                const hotReloaderResult = await devInstance.hotReloader.run(req, res, parsedUrl);
                if (hotReloaderResult.finished) {
                    return hotReloaderResult;
                }
                req.url = origUrl;
            }
            const { finished , parsedUrl , statusCode , resHeaders , bodyStream , matchedOutput  } = await resolveRoutes(req, matchedDynamicRoutes, false, signalFromNodeResponse(res));
            if (devInstance && (matchedOutput == null ? void 0 : matchedOutput.type) === "devVirtualFsItem") {
                const origUrl = req.url || "/";
                if (config.basePath && pathHasPrefix(origUrl, config.basePath)) {
                    req.url = removePathPrefix(origUrl, config.basePath);
                }
                if (resHeaders) {
                    for (const key of Object.keys(resHeaders)){
                        res.setHeader(key, resHeaders[key]);
                    }
                }
                const result = await devInstance.requestHandler(req, res);
                if (result.finished) {
                    return;
                }
                // TODO: throw invariant if we resolved to this but it wasn't handled?
                req.url = origUrl;
            }
            debug("requestHandler!", req.url, {
                matchedOutput,
                statusCode,
                resHeaders,
                bodyStream: !!bodyStream,
                parsedUrl: {
                    pathname: parsedUrl.pathname,
                    query: parsedUrl.query
                },
                finished
            });
            // apply any response headers from routing
            for (const key of Object.keys(resHeaders || {})){
                res.setHeader(key, resHeaders[key]);
            }
            // handle redirect
            if (!bodyStream && statusCode && statusCode > 300 && statusCode < 400) {
                const destination = url.format(parsedUrl);
                res.statusCode = statusCode;
                res.setHeader("location", destination);
                if (statusCode === PERMANENT_REDIRECT_STATUS) {
                    res.setHeader("Refresh", `0;url=${destination}`);
                }
                return res.end(destination);
            }
            // handle middleware body response
            if (bodyStream) {
                res.statusCode = statusCode || 200;
                return await pipeReadable(bodyStream, res);
            }
            if (finished && parsedUrl.protocol) {
                var _getRequestMeta;
                return await proxyRequest(req, res, parsedUrl, undefined, (_getRequestMeta = getRequestMeta(req, "__NEXT_CLONABLE_BODY")) == null ? void 0 : _getRequestMeta.cloneBodyStream(), config.experimental.proxyTimeout);
            }
            if ((matchedOutput == null ? void 0 : matchedOutput.fsPath) && matchedOutput.itemPath) {
                if (opts.dev && (fsChecker.appFiles.has(matchedOutput.itemPath) || fsChecker.pageFiles.has(matchedOutput.itemPath))) {
                    await invokeRender(parsedUrl, "pages", handleIndex, "/_error", {
                        "x-invoke-status": "500",
                        "x-invoke-error": JSON.stringify({
                            message: `A conflicting public file and page file was found for path ${matchedOutput.itemPath} https://nextjs.org/docs/messages/conflicting-public-file-page`
                        })
                    });
                    return;
                }
                if (!res.getHeader("cache-control") && matchedOutput.type === "nextStaticFolder") {
                    if (opts.dev) {
                        res.setHeader("Cache-Control", "no-store, must-revalidate");
                    } else {
                        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
                    }
                }
                if (!(req.method === "GET" || req.method === "HEAD")) {
                    res.setHeader("Allow", [
                        "GET",
                        "HEAD"
                    ]);
                    return await invokeRender(url.parse("/405", true), "pages", handleIndex, "/405", {
                        "x-invoke-status": "405"
                    });
                }
                try {
                    return await serveStatic(req, res, matchedOutput.itemPath, {
                        root: matchedOutput.itemsRoot
                    });
                } catch (err) {
                    /**
           * Hardcoded every possible error status code that could be thrown by "serveStatic" method
           * This is done by searching "this.error" inside "send" module's source code:
           * https://github.com/pillarjs/send/blob/master/index.js
           * https://github.com/pillarjs/send/blob/develop/index.js
           */ const POSSIBLE_ERROR_CODE_FROM_SERVE_STATIC = new Set([
                        // send module will throw 500 when header is already sent or fs.stat error happens
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L392
                        // Note: we will use Next.js built-in 500 page to handle 500 errors
                        // 500,
                        // send module will throw 404 when file is missing
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L421
                        // Note: we will use Next.js built-in 404 page to handle 404 errors
                        // 404,
                        // send module will throw 403 when redirecting to a directory without enabling directory listing
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L484
                        // Note: Next.js throws a different error (without status code) for directory listing
                        // 403,
                        // send module will throw 400 when fails to normalize the path
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L520
                        400,
                        // send module will throw 412 with conditional GET request
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L632
                        412,
                        // send module will throw 416 when range is not satisfiable
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L669
                        416
                    ]);
                    let validErrorStatus = POSSIBLE_ERROR_CODE_FROM_SERVE_STATIC.has(err.statusCode);
                    // normalize non-allowed status codes
                    if (!validErrorStatus) {
                        err.statusCode = 400;
                    }
                    if (typeof err.statusCode === "number") {
                        const invokePath = `/${err.statusCode}`;
                        const invokeStatus = `${err.statusCode}`;
                        return await invokeRender(url.parse(invokePath, true), "pages", handleIndex, invokePath, {
                            "x-invoke-status": invokeStatus
                        });
                    }
                    throw err;
                }
            }
            if (matchedOutput) {
                return await invokeRender(parsedUrl, matchedOutput.type === "appFile" ? "app" : "pages", handleIndex, parsedUrl.pathname || "/", {
                    "x-invoke-output": matchedOutput.itemPath
                });
            }
            // 404 case
            res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            const appNotFound = opts.dev ? devInstance == null ? void 0 : devInstance.serverFields.hasAppNotFound : await fsChecker.getItem("/_not-found");
            if (appNotFound) {
                return await invokeRender(parsedUrl, "app", handleIndex, "/_not-found", {
                    "x-invoke-status": "404"
                });
            }
            await invokeRender(parsedUrl, "pages", handleIndex, "/404", {
                "x-invoke-status": "404"
            });
        };
        try {
            await handleRequest(0);
        } catch (err) {
            try {
                let invokePath = "/500";
                let invokeStatus = "500";
                if (err instanceof DecodeError) {
                    invokePath = "/400";
                    invokeStatus = "400";
                } else {
                    console.error(err);
                }
                return await invokeRender(url.parse(invokePath, true), "pages", 0, invokePath, {
                    "x-invoke-status": invokeStatus
                });
            } catch (err2) {
                console.error(err2);
            }
            res.statusCode = 500;
            res.end("Internal Server Error");
        }
    };
    const upgradeHandler = async (req, socket, head)=>{
        try {
            req.on("error", (_err)=>{
            // TODO: log socket errors?
            // console.error(_err);
            });
            socket.on("error", (_err)=>{
            // TODO: log socket errors?
            // console.error(_err);
            });
            if (opts.dev && devInstance) {
                var _req_url;
                if ((_req_url = req.url) == null ? void 0 : _req_url.includes(`/_next/webpack-hmr`)) {
                    return devInstance.hotReloader.onHMR(req, socket, head);
                }
            }
            const { matchedOutput , parsedUrl  } = await resolveRoutes(req, new Set(), true, signalFromNodeResponse(socket));
            // TODO: allow upgrade requests to pages/app paths?
            // this was not previously supported
            if (matchedOutput) {
                return socket.end();
            }
            if (parsedUrl.protocol) {
                return await proxyRequest(req, socket, parsedUrl, head);
            }
            // no match close socket
            socket.end();
        } catch (err) {
            console.error("Error handling upgrade request", err);
            socket.end();
        }
    };
    return [
        requestHandler,
        upgradeHandler
    ];
}

//# sourceMappingURL=router-server.js.map