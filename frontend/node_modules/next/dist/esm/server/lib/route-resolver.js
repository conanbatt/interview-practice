import "../require-hook";
import "../node-polyfill-fetch";
import url from "url";
import path from "path";
import http from "http";
import { findPageFile } from "./find-page-file";
import { getRequestMeta } from "../request-meta";
import setupDebug from "next/dist/compiled/debug";
import { getCloneableBody } from "../body-streams";
import { findPagesDir } from "../../lib/find-pages-dir";
import { setupFsCheck } from "./router-utils/filesystem";
import { proxyRequest } from "./router-utils/proxy-request";
import { getResolveRoutes } from "./router-utils/resolve-routes";
import { PERMANENT_REDIRECT_STATUS } from "../../shared/lib/constants";
import { splitCookiesString, toNodeOutgoingHttpHeaders } from "../web/utils";
import { formatHostname } from "./format-hostname";
import { signalFromNodeResponse } from "../web/spec-extension/adapters/next-request";
import { getMiddlewareRouteMatcher } from "../../shared/lib/router/utils/middleware-route-matcher";
import { pipeReadable } from "../pipe-readable";
const debug = setupDebug("next:router-server");
export async function makeResolver(dir, nextConfig, middleware, { hostname ="localhost" , port =3000  }) {
    const fsChecker = await setupFsCheck({
        dir,
        dev: true,
        minimalMode: false,
        config: nextConfig
    });
    const { appDir , pagesDir  } = findPagesDir(dir, !!nextConfig.experimental.appDir);
    // we format the hostname so that it can be fetched
    const fetchHostname = formatHostname(hostname);
    fsChecker.ensureCallback(async (item)=>{
        let result = null;
        if (item.type === "appFile") {
            if (!appDir) {
                throw new Error("no app dir present");
            }
            result = await findPageFile(appDir, item.itemPath, nextConfig.pageExtensions, true);
        } else if (item.type === "pageFile") {
            if (!pagesDir) {
                throw new Error("no pages dir present");
            }
            result = await findPageFile(pagesDir, item.itemPath, nextConfig.pageExtensions, false);
        }
        if (!result) {
            throw new Error(`failed to find page file ${item.type} ${item.itemPath}`);
        }
    });
    const distDir = path.join(dir, nextConfig.distDir);
    const middlewareInfo = middleware ? {
        name: "middleware",
        paths: middleware.files.map((file)=>path.join(process.cwd(), file)),
        wasm: [],
        assets: []
    } : {};
    const middlewareServerAddr = await new Promise((resolve)=>{
        const srv = http.createServer(async (req, res)=>{
            const cloneableBody = getCloneableBody(req);
            try {
                const { run  } = require("../web/sandbox");
                const result = await run({
                    distDir,
                    name: middlewareInfo.name || "/",
                    paths: middlewareInfo.paths || [],
                    edgeFunctionEntry: middlewareInfo,
                    request: {
                        headers: req.headers,
                        method: req.method || "GET",
                        nextConfig: {
                            i18n: nextConfig.i18n,
                            basePath: nextConfig.basePath,
                            trailingSlash: nextConfig.trailingSlash
                        },
                        url: `http://${fetchHostname}:${port}${req.url}`,
                        body: cloneableBody,
                        signal: signalFromNodeResponse(res)
                    },
                    useCache: true,
                    onWarning: console.warn
                });
                for (let [key, value] of result.response.headers){
                    if (key.toLowerCase() !== "set-cookie") continue;
                    // Clear existing header.
                    result.response.headers.delete(key);
                    // Append each cookie individually.
                    const cookies = splitCookiesString(value);
                    for (const cookie of cookies){
                        result.response.headers.append(key, cookie);
                    }
                }
                for (const [key, value] of Object.entries(toNodeOutgoingHttpHeaders(result.response.headers))){
                    if (key !== "content-encoding" && value !== undefined) {
                        res.setHeader(key, value);
                    }
                }
                res.statusCode = result.response.status;
                if (result.response.body) {
                    await pipeReadable(result.response.body, res);
                } else {
                    res.end();
                }
            } catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("Internal Server Error");
            }
        });
        srv.on("listening", ()=>{
            const srvAddr = srv.address();
            if (!srvAddr || typeof srvAddr === "string") {
                throw new Error("Failed to determine middleware's host/port.");
            }
            resolve({
                hostname: srvAddr.address,
                port: srvAddr.port
            });
        });
        srv.listen(0);
    });
    if (middleware == null ? void 0 : middleware.files.length) {
        var _middleware_matcher;
        fsChecker.middlewareMatcher = getMiddlewareRouteMatcher(((_middleware_matcher = middleware.matcher) == null ? void 0 : _middleware_matcher.map((item)=>({
                regexp: item,
                originalSource: item
            }))) || [
            {
                regexp: ".*",
                originalSource: "/:path*"
            }
        ]);
    }
    const resolveRoutes = getResolveRoutes(fsChecker, nextConfig, {
        dir,
        port,
        hostname,
        isNodeDebugging: false,
        dev: true,
        workerType: "render"
    }, {
        pages: {
            async initialize () {
                return {
                    port: middlewareServerAddr.port,
                    hostname: formatHostname(middlewareServerAddr.hostname)
                };
            },
            async deleteCache () {},
            async clearModuleContext () {},
            async deleteAppClientCache () {},
            async propagateServerField () {}
        }
    }, {});
    return async function resolveRoute(req, res) {
        const routeResult = await resolveRoutes(req, new Set(), false, signalFromNodeResponse(res));
        const { matchedOutput , bodyStream , statusCode , parsedUrl , resHeaders , finished  } = routeResult;
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
        for (const key of Object.keys(resHeaders || {})){
            res.setHeader(key, resHeaders[key]);
        }
        if (!bodyStream && statusCode && statusCode > 300 && statusCode < 400) {
            const destination = url.format(parsedUrl);
            res.statusCode = statusCode;
            res.setHeader("location", destination);
            if (statusCode === PERMANENT_REDIRECT_STATUS) {
                res.setHeader("Refresh", `0;url=${destination}`);
            }
            res.end(destination);
            return;
        }
        // handle middleware body response
        if (bodyStream) {
            res.statusCode = statusCode || 200;
            return await pipeReadable(bodyStream, res);
        }
        if (finished && parsedUrl.protocol) {
            var _getRequestMeta;
            await proxyRequest(req, res, parsedUrl, undefined, (_getRequestMeta = getRequestMeta(req, "__NEXT_CLONABLE_BODY")) == null ? void 0 : _getRequestMeta.cloneBodyStream(), nextConfig.experimental.proxyTimeout);
            return;
        }
        res.setHeader("x-nextjs-route-result", "1");
        res.end();
        return {
            type: "rewrite",
            statusCode: 200,
            headers: resHeaders,
            url: url.format(parsedUrl)
        };
    };
}

//# sourceMappingURL=route-resolver.js.map