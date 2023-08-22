"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getResolveRoutes", {
    enumerable: true,
    get: function() {
        return getResolveRoutes;
    }
});
const _url = /*#__PURE__*/ _interop_require_default(require("url"));
const _debug = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/debug"));
const _bodystreams = require("../../body-streams");
const _utils = require("../server-ipc/utils");
const _serverrouteutils = require("../../server-route-utils");
const _formathostname = require("../format-hostname");
const _utils1 = require("../../web/utils");
const _invokerequest = require("../server-ipc/invoke-request");
const _pipereadable = require("../../pipe-readable");
const _apiutils = require("../../api-utils");
const _gethostname = require("../../../shared/lib/get-hostname");
const _redirectstatus = require("../../../lib/redirect-status");
const _utils2 = require("../../../shared/lib/utils");
const _relativizeurl = require("../../../shared/lib/router/utils/relativize-url");
const _addpathprefix = require("../../../shared/lib/router/utils/add-path-prefix");
const _pathhasprefix = require("../../../shared/lib/router/utils/path-has-prefix");
const _detectdomainlocale = require("../../../shared/lib/i18n/detect-domain-locale");
const _normalizelocalepath = require("../../../shared/lib/i18n/normalize-locale-path");
const _removepathprefix = require("../../../shared/lib/router/utils/remove-path-prefix");
const _requestmeta = require("../../request-meta");
const _preparedestination = require("../../../shared/lib/router/utils/prepare-destination");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug.default)("next:router-server:resolve-routes");
function getResolveRoutes(fsChecker, config, opts, renderWorkers, renderWorkerOpts, ensureMiddleware) {
    const routes = [
        // _next/data with middleware handling
        {
            match: ()=>({}),
            name: "middleware_next_data"
        },
        ...opts.minimalMode ? [] : fsChecker.headers,
        ...opts.minimalMode ? [] : fsChecker.redirects,
        // check middleware (using matchers)
        {
            match: ()=>({}),
            name: "middleware"
        },
        ...opts.minimalMode ? [] : fsChecker.rewrites.beforeFiles,
        // check middleware (using matchers)
        {
            match: ()=>({}),
            name: "before_files_end"
        },
        // we check exact matches on fs before continuing to
        // after files rewrites
        {
            match: ()=>({}),
            name: "check_fs"
        },
        ...opts.minimalMode ? [] : fsChecker.rewrites.afterFiles,
        // we always do the check: true handling before continuing to
        // fallback rewrites
        {
            check: true,
            match: ()=>({}),
            name: "after files check: true"
        },
        ...opts.minimalMode ? [] : fsChecker.rewrites.fallback
    ];
    async function resolveRoutes(req, matchedDynamicRoutes, isUpgradeReq, signal) {
        var _ref;
        let finished = false;
        let resHeaders = {};
        let matchedOutput = null;
        let parsedUrl = _url.default.parse(req.url || "", true);
        let didRewrite = false;
        const urlParts = (req.url || "").split("?");
        const urlNoQuery = urlParts[0];
        // this normalizes repeated slashes in the path e.g. hello//world ->
        // hello/world or backslashes to forward slashes, this does not
        // handle trailing slash as that is handled the same as a next.config.js
        // redirect
        if (urlNoQuery == null ? void 0 : urlNoQuery.match(/(\\|\/\/)/)) {
            parsedUrl = _url.default.parse((0, _utils2.normalizeRepeatedSlashes)(req.url), true);
            return {
                parsedUrl,
                resHeaders,
                finished: true,
                statusCode: 308
            };
        }
        // TODO: inherit this from higher up
        const protocol = ((_ref = req == null ? void 0 : req.socket) == null ? void 0 : _ref.encrypted) || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
        // When there are hostname and port we build an absolute URL
        const initUrl = config.experimental.trustHostHeader ? `https://${req.headers.host || "localhost"}${req.url}` : opts.port ? `${protocol}://${(0, _formathostname.formatHostname)(opts.hostname || "localhost")}:${opts.port}${req.url}` : req.url || "";
        (0, _requestmeta.addRequestMeta)(req, "__NEXT_INIT_URL", initUrl);
        (0, _requestmeta.addRequestMeta)(req, "__NEXT_INIT_QUERY", {
            ...parsedUrl.query
        });
        (0, _requestmeta.addRequestMeta)(req, "_protocol", protocol);
        (0, _apiutils.setLazyProp)({
            req
        }, "cookies", ()=>(0, _apiutils.getCookieParser)(req.headers)());
        if (!isUpgradeReq) {
            (0, _requestmeta.addRequestMeta)(req, "__NEXT_CLONABLE_BODY", (0, _bodystreams.getCloneableBody)(req));
        }
        const maybeAddTrailingSlash = (pathname)=>{
            if (config.trailingSlash && !config.skipMiddlewareUrlNormalize && !pathname.endsWith("/")) {
                return `${pathname}/`;
            }
            return pathname;
        };
        let domainLocale;
        let defaultLocale;
        let initialLocaleResult = undefined;
        if (config.i18n) {
            var _parsedUrl_pathname;
            const hadTrailingSlash = (_parsedUrl_pathname = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname.endsWith("/");
            const hadBasePath = (0, _pathhasprefix.pathHasPrefix)(parsedUrl.pathname || "", config.basePath);
            initialLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)((0, _removepathprefix.removePathPrefix)(parsedUrl.pathname || "/", config.basePath), config.i18n.locales);
            domainLocale = (0, _detectdomainlocale.detectDomainLocale)(config.i18n.domains, (0, _gethostname.getHostname)(parsedUrl, req.headers));
            defaultLocale = (domainLocale == null ? void 0 : domainLocale.defaultLocale) || config.i18n.defaultLocale;
            parsedUrl.query.__nextDefaultLocale = defaultLocale;
            parsedUrl.query.__nextLocale = initialLocaleResult.detectedLocale || defaultLocale;
            // ensure locale is present for resolving routes
            if (!initialLocaleResult.detectedLocale && !initialLocaleResult.pathname.startsWith("/_next/")) {
                parsedUrl.pathname = (0, _addpathprefix.addPathPrefix)(initialLocaleResult.pathname === "/" ? `/${defaultLocale}` : (0, _addpathprefix.addPathPrefix)(initialLocaleResult.pathname || "", `/${defaultLocale}`), hadBasePath ? config.basePath : "");
                if (hadTrailingSlash) {
                    parsedUrl.pathname = maybeAddTrailingSlash(parsedUrl.pathname);
                }
            }
        }
        const checkLocaleApi = (pathname)=>{
            if (config.i18n && pathname === urlNoQuery && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale) && (0, _pathhasprefix.pathHasPrefix)(initialLocaleResult.pathname, "/api")) {
                return true;
            }
        };
        async function checkTrue() {
            if (checkLocaleApi(parsedUrl.pathname || "")) {
                return;
            }
            const output = await fsChecker.getItem(parsedUrl.pathname || "");
            if (output) {
                if (config.useFileSystemPublicRoutes || didRewrite || output.type !== "appFile" && output.type !== "pageFile") {
                    return output;
                }
            }
            const dynamicRoutes = fsChecker.getDynamicRoutes();
            let curPathname = parsedUrl.pathname;
            if (config.basePath) {
                if (!(0, _pathhasprefix.pathHasPrefix)(curPathname || "", config.basePath)) {
                    return;
                }
                curPathname = (curPathname == null ? void 0 : curPathname.substring(config.basePath.length)) || "/";
            }
            const localeResult = fsChecker.handleLocale(curPathname || "");
            for (const route of dynamicRoutes){
                // when resolving fallback: false we attempt to
                // render worker may return a no-fallback response
                // which signals we need to continue resolving.
                // TODO: optimize this to collect static paths
                // to use at the routing layer
                if (matchedDynamicRoutes.has(route.page)) {
                    continue;
                }
                const params = route.match(localeResult.pathname);
                if (params) {
                    const pageOutput = await fsChecker.getItem((0, _addpathprefix.addPathPrefix)(route.page, config.basePath || ""));
                    // i18n locales aren't matched for app dir
                    if ((pageOutput == null ? void 0 : pageOutput.type) === "appFile" && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale)) {
                        continue;
                    }
                    if (pageOutput && (curPathname == null ? void 0 : curPathname.startsWith("/_next/data"))) {
                        parsedUrl.query.__nextDataReq = "1";
                    }
                    matchedDynamicRoutes.add(route.page);
                    if (config.useFileSystemPublicRoutes || didRewrite) {
                        return pageOutput;
                    }
                }
            }
        }
        async function handleRoute(route) {
            let curPathname = parsedUrl.pathname || "/";
            if (config.i18n && route.internal) {
                const hadTrailingSlash = curPathname.endsWith("/");
                if (config.basePath) {
                    curPathname = (0, _removepathprefix.removePathPrefix)(curPathname, config.basePath);
                }
                const hadBasePath = curPathname !== parsedUrl.pathname;
                const localeResult = (0, _normalizelocalepath.normalizeLocalePath)(curPathname, config.i18n.locales);
                const isDefaultLocale = localeResult.detectedLocale === defaultLocale;
                if (isDefaultLocale) {
                    curPathname = localeResult.pathname === "/" && hadBasePath ? config.basePath : (0, _addpathprefix.addPathPrefix)(localeResult.pathname, hadBasePath ? config.basePath : "");
                } else if (hadBasePath) {
                    curPathname = curPathname === "/" ? config.basePath : (0, _addpathprefix.addPathPrefix)(curPathname, config.basePath);
                }
                if ((isDefaultLocale || hadBasePath) && hadTrailingSlash) {
                    curPathname = maybeAddTrailingSlash(curPathname);
                }
            }
            let params = route.match(curPathname);
            if ((route.has || route.missing) && params) {
                const hasParams = (0, _preparedestination.matchHas)(req, parsedUrl.query, route.has, route.missing);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                if (fsChecker.interceptionRoutes && route.name === "before_files_end") {
                    for (const interceptionRoute of fsChecker.interceptionRoutes){
                        const result = await handleRoute(interceptionRoute);
                        if (result) {
                            return result;
                        }
                    }
                }
                if (route.name === "middleware_next_data") {
                    var _fsChecker_getMiddlewareMatchers;
                    if ((_fsChecker_getMiddlewareMatchers = fsChecker.getMiddlewareMatchers()) == null ? void 0 : _fsChecker_getMiddlewareMatchers.length) {
                        var _parsedUrl_pathname;
                        const nextDataPrefix = (0, _addpathprefix.addPathPrefix)(`/_next/data/${fsChecker.buildId}/`, config.basePath);
                        if (((_parsedUrl_pathname = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname.startsWith(nextDataPrefix)) && parsedUrl.pathname.endsWith(".json")) {
                            parsedUrl.query.__nextDataReq = "1";
                            parsedUrl.pathname = parsedUrl.pathname.substring(nextDataPrefix.length - 1);
                            parsedUrl.pathname = parsedUrl.pathname.substring(0, parsedUrl.pathname.length - ".json".length);
                            parsedUrl.pathname = (0, _addpathprefix.addPathPrefix)(parsedUrl.pathname || "", config.basePath);
                            parsedUrl.pathname = parsedUrl.pathname === "/index" ? "/" : parsedUrl.pathname;
                            parsedUrl.pathname = maybeAddTrailingSlash(parsedUrl.pathname);
                        }
                    }
                }
                if (route.name === "check_fs") {
                    if (checkLocaleApi(parsedUrl.pathname || "")) {
                        return;
                    }
                    const output = await fsChecker.getItem(parsedUrl.pathname || "");
                    if (output && !(config.i18n && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale) && (0, _pathhasprefix.pathHasPrefix)(parsedUrl.pathname || "", "/api"))) {
                        if (config.useFileSystemPublicRoutes || didRewrite || output.type !== "appFile" && output.type !== "pageFile") {
                            matchedOutput = output;
                            if (output.locale) {
                                parsedUrl.query.__nextLocale = output.locale;
                            }
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true,
                                matchedOutput
                            };
                        }
                    }
                }
                if (!opts.minimalMode && route.name === "middleware") {
                    const match = fsChecker.getMiddlewareMatchers();
                    if (// @ts-expect-error BaseNextRequest stuff
                    (match == null ? void 0 : match(parsedUrl.pathname, req, parsedUrl.query)) && (!ensureMiddleware || await (ensureMiddleware == null ? void 0 : ensureMiddleware().then(()=>true).catch(()=>false)))) {
                        var _ref;
                        const workerResult = await ((_ref = renderWorkers.app || renderWorkers.pages) == null ? void 0 : _ref.initialize(renderWorkerOpts));
                        if (!workerResult) {
                            throw new Error(`Failed to initialize render worker "middleware"`);
                        }
                        const stringifiedQuery = (0, _serverrouteutils.stringifyQuery)(req, (0, _requestmeta.getRequestMeta)(req, "__NEXT_INIT_QUERY") || {});
                        const parsedInitUrl = new URL((0, _requestmeta.getRequestMeta)(req, "__NEXT_INIT_URL") || "/", "http://n");
                        const curUrl = config.skipMiddlewareUrlNormalize ? `${parsedInitUrl.pathname}${parsedInitUrl.search}` : `${parsedUrl.pathname}${stringifiedQuery ? "?" : ""}${stringifiedQuery || ""}`;
                        const renderUrl = `http://${workerResult.hostname}:${workerResult.port}${curUrl}`;
                        const invokeHeaders = {
                            ...req.headers,
                            "x-invoke-path": "",
                            "x-invoke-query": "",
                            "x-invoke-output": "",
                            "x-middleware-invoke": "1"
                        };
                        debug("invoking middleware", renderUrl, invokeHeaders);
                        let middlewareRes;
                        try {
                            var _getRequestMeta;
                            middlewareRes = await (0, _invokerequest.invokeRequest)(renderUrl, {
                                headers: invokeHeaders,
                                method: req.method,
                                signal
                            }, (_getRequestMeta = (0, _requestmeta.getRequestMeta)(req, "__NEXT_CLONABLE_BODY")) == null ? void 0 : _getRequestMeta.cloneBodyStream());
                        } catch (e) {
                            // If the client aborts before we can receive a response object
                            // (when the headers are flushed), then we can early exit without
                            // further processing.
                            if ((0, _pipereadable.isAbortError)(e)) {
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true
                                };
                            }
                            throw e;
                        }
                        const middlewareHeaders = (0, _utils1.toNodeOutgoingHttpHeaders)(middlewareRes.headers);
                        debug("middleware res", middlewareRes.status, middlewareHeaders);
                        if (middlewareHeaders["x-middleware-override-headers"]) {
                            const overriddenHeaders = new Set();
                            let overrideHeaders = middlewareHeaders["x-middleware-override-headers"];
                            if (typeof overrideHeaders === "string") {
                                overrideHeaders = overrideHeaders.split(",");
                            }
                            for (const key of overrideHeaders){
                                overriddenHeaders.add(key.trim());
                            }
                            delete middlewareHeaders["x-middleware-override-headers"];
                            // Delete headers.
                            for (const key of Object.keys(req.headers)){
                                if (!overriddenHeaders.has(key)) {
                                    delete req.headers[key];
                                }
                            }
                            // Update or add headers.
                            for (const key of overriddenHeaders.keys()){
                                const valueKey = "x-middleware-request-" + key;
                                const newValue = middlewareHeaders[valueKey];
                                const oldValue = req.headers[key];
                                if (oldValue !== newValue) {
                                    req.headers[key] = newValue === null ? undefined : newValue;
                                }
                                delete middlewareHeaders[valueKey];
                            }
                        }
                        if (!middlewareHeaders["x-middleware-rewrite"] && !middlewareHeaders["x-middleware-next"] && !middlewareHeaders["location"]) {
                            middlewareHeaders["x-middleware-refresh"] = "1";
                        }
                        delete middlewareHeaders["x-middleware-next"];
                        for (const [key, value] of Object.entries({
                            ...(0, _utils.filterReqHeaders)(middlewareHeaders, _utils.ipcForbiddenHeaders)
                        })){
                            if ([
                                "content-length",
                                "x-middleware-rewrite",
                                "x-middleware-redirect",
                                "x-middleware-refresh",
                                "x-middleware-invoke",
                                "x-invoke-path",
                                "x-invoke-query"
                            ].includes(key)) {
                                continue;
                            }
                            if (value) {
                                resHeaders[key] = value;
                                req.headers[key] = value;
                            }
                        }
                        if (middlewareHeaders["x-middleware-rewrite"]) {
                            const value = middlewareHeaders["x-middleware-rewrite"];
                            const rel = (0, _relativizeurl.relativizeURL)(value, initUrl);
                            resHeaders["x-middleware-rewrite"] = rel;
                            const query = parsedUrl.query;
                            parsedUrl = _url.default.parse(rel, true);
                            if (parsedUrl.protocol) {
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true
                                };
                            }
                            // keep internal query state
                            for (const key of Object.keys(query)){
                                if (key.startsWith("_next") || key.startsWith("__next")) {
                                    parsedUrl.query[key] = query[key];
                                }
                            }
                            if (config.i18n) {
                                const curLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)(parsedUrl.pathname || "", config.i18n.locales);
                                if (curLocaleResult.detectedLocale) {
                                    parsedUrl.query.__nextLocale = curLocaleResult.detectedLocale;
                                }
                            }
                        }
                        if (middlewareHeaders["location"]) {
                            const value = middlewareHeaders["location"];
                            const rel = (0, _relativizeurl.relativizeURL)(value, initUrl);
                            resHeaders["location"] = rel;
                            parsedUrl = _url.default.parse(rel, true);
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true,
                                statusCode: middlewareRes.status
                            };
                        }
                        if (middlewareHeaders["x-middleware-refresh"]) {
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true,
                                bodyStream: middlewareRes.body,
                                statusCode: middlewareRes.status
                            };
                        }
                    }
                }
                // handle redirect
                if (("statusCode" in route || "permanent" in route) && route.destination) {
                    const { parsedDestination  } = (0, _preparedestination.prepareDestination)({
                        appendParamsToQuery: false,
                        destination: route.destination,
                        params: params,
                        query: parsedUrl.query
                    });
                    const { query  } = parsedDestination;
                    delete parsedDestination.query;
                    parsedDestination.search = (0, _serverrouteutils.stringifyQuery)(req, query);
                    parsedDestination.pathname = (0, _utils2.normalizeRepeatedSlashes)(parsedDestination.pathname);
                    return {
                        finished: true,
                        // @ts-expect-error custom ParsedUrl
                        parsedUrl: parsedDestination,
                        statusCode: (0, _redirectstatus.getRedirectStatus)(route)
                    };
                }
                // handle headers
                if (route.headers) {
                    const hasParams = Object.keys(params).length > 0;
                    for (const header of route.headers){
                        let { key , value  } = header;
                        if (hasParams) {
                            key = (0, _preparedestination.compileNonPath)(key, params);
                            value = (0, _preparedestination.compileNonPath)(value, params);
                        }
                        if (key.toLowerCase() === "set-cookie") {
                            if (!Array.isArray(resHeaders[key])) {
                                const val = resHeaders[key];
                                resHeaders[key] = typeof val === "string" ? [
                                    val
                                ] : [];
                            }
                            resHeaders[key].push(value);
                        } else {
                            resHeaders[key] = value;
                        }
                    }
                }
                // handle rewrite
                if (route.destination) {
                    const { parsedDestination  } = (0, _preparedestination.prepareDestination)({
                        appendParamsToQuery: true,
                        destination: route.destination,
                        params: params,
                        query: parsedUrl.query
                    });
                    if (parsedDestination.protocol) {
                        return {
                            // @ts-expect-error custom ParsedUrl
                            parsedUrl: parsedDestination,
                            finished: true
                        };
                    }
                    if (config.i18n) {
                        const curLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)((0, _removepathprefix.removePathPrefix)(parsedDestination.pathname, config.basePath), config.i18n.locales);
                        if (curLocaleResult.detectedLocale) {
                            parsedUrl.query.__nextLocale = curLocaleResult.detectedLocale;
                        }
                    }
                    didRewrite = true;
                    parsedUrl.pathname = parsedDestination.pathname;
                    Object.assign(parsedUrl.query, parsedDestination.query);
                }
                // handle check: true
                if (route.check) {
                    const output = await checkTrue();
                    if (output) {
                        return {
                            parsedUrl,
                            resHeaders,
                            finished: true,
                            matchedOutput: output
                        };
                    }
                }
            }
        }
        for (const route of routes){
            const result = await handleRoute(route);
            if (result) {
                return result;
            }
        }
        return {
            finished,
            parsedUrl,
            resHeaders,
            matchedOutput
        };
    }
    return resolveRoutes;
}

//# sourceMappingURL=resolve-routes.js.map