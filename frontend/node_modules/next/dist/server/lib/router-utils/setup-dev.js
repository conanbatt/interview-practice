"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setupDev", {
    enumerable: true,
    get: function() {
        return setupDev;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _url = /*#__PURE__*/ _interop_require_default(require("url"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _querystring = /*#__PURE__*/ _interop_require_default(require("querystring"));
const _watchpack = /*#__PURE__*/ _interop_require_default(require("watchpack"));
const _env = require("@next/env");
const _iserror = /*#__PURE__*/ _interop_require_default(require("../../../lib/is-error"));
const _findup = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/find-up"));
const _filesystem = require("./filesystem");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../../build/output/log"));
const _hotreloader = /*#__PURE__*/ _interop_require_wildcard(require("../../dev/hot-reloader"));
const _shared = require("../../../trace/shared");
const _loadjsconfig = /*#__PURE__*/ _interop_require_default(require("../../../build/load-jsconfig"));
const _findpagefile = require("../find-page-file");
const _events = require("../../../telemetry/events");
const _webpackconfig = require("../../../build/webpack-config");
const _logappdirerror = require("../../dev/log-app-dir-error");
const _utils = require("../../../shared/lib/router/utils");
const _entries = require("../../../build/entries");
const _verifyTypeScriptSetup = require("../../../lib/verifyTypeScriptSetup");
const _verifypartytownsetup = require("../../../lib/verify-partytown-setup");
const _routeregex = require("../../../shared/lib/router/utils/route-regex");
const _apppaths = require("../../../shared/lib/router/utils/app-paths");
const _builddataroute = require("./build-data-route");
const _routematcher = require("../../../shared/lib/router/utils/route-matcher");
const _normalizepathsep = require("../../../shared/lib/page-path/normalize-path-sep");
const _createclientrouterfilter = require("../../../lib/create-client-router-filter");
const _absolutepathtopage = require("../../../shared/lib/page-path/absolute-path-to-page");
const _generateinterceptionroutesrewrites = require("../../../lib/generate-interception-routes-rewrites");
const _constants = require("../../../shared/lib/constants");
const _middlewareroutematcher = require("../../../shared/lib/router/utils/middleware-route-matcher");
const _buildcontext = require("../../../build/build-context");
const _worker = require("../../../build/worker");
const _middleware = require("next/dist/compiled/@next/react-dev-overlay/dist/middleware");
const _promises = require("fs/promises");
const _utils1 = require("../../../shared/lib/utils");
const _buildmanifestplugin = require("../../../build/webpack/plugins/build-manifest-plugin");
const _shared1 = require("../../../build/webpack/plugins/next-types-plugin/shared");
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
async function verifyTypeScript(opts) {
    let usingTypeScript = false;
    const verifyResult = await (0, _verifyTypeScriptSetup.verifyTypeScriptSetup)({
        dir: opts.dir,
        distDir: opts.nextConfig.distDir,
        intentDirs: [
            opts.pagesDir,
            opts.appDir
        ].filter(Boolean),
        typeCheckPreflight: false,
        tsconfigPath: opts.nextConfig.typescript.tsconfigPath,
        disableStaticImages: opts.nextConfig.images.disableStaticImages,
        hasAppDir: !!opts.appDir,
        hasPagesDir: !!opts.pagesDir
    });
    if (verifyResult.version) {
        usingTypeScript = true;
    }
    return usingTypeScript;
}
async function startWatcher(opts) {
    const { nextConfig , appDir , pagesDir , dir  } = opts;
    const { useFileSystemPublicRoutes  } = nextConfig;
    const usingTypeScript = await verifyTypeScript(opts);
    const distDir = _path.default.join(opts.dir, opts.nextConfig.distDir);
    (0, _shared.setGlobal)("distDir", distDir);
    (0, _shared.setGlobal)("phase", _constants.PHASE_DEVELOPMENT_SERVER);
    const validFileMatcher = (0, _findpagefile.createValidFileMatcher)(nextConfig.pageExtensions, appDir);
    const renderWorkers = {};
    async function propagateToWorkers(field, args) {
        var _renderWorkers_app, _renderWorkers_pages;
        await ((_renderWorkers_app = renderWorkers.app) == null ? void 0 : _renderWorkers_app.propagateServerField(field, args));
        await ((_renderWorkers_pages = renderWorkers.pages) == null ? void 0 : _renderWorkers_pages.propagateServerField(field, args));
    }
    let hotReloader;
    if (opts.turbo) {
        const { loadBindings  } = require("../../../build/swc");
        let bindings = await loadBindings();
        const { jsConfig  } = await (0, _loadjsconfig.default)(dir, opts.nextConfig);
        const project = await bindings.turbo.createProject({
            projectPath: dir,
            rootPath: opts.nextConfig.experimental.outputFileTracingRoot || dir,
            nextConfig: opts.nextConfig,
            jsConfig,
            watch: true,
            env: process.env
        });
        const iter = project.entrypointsSubscribe();
        const curEntries = new Map();
        const globalEntries = {
            app: undefined,
            document: undefined,
            error: undefined
        };
        try {
            async function handleEntries() {
                for await (const entrypoints of iter){
                    globalEntries.app = entrypoints.pagesAppEndpoint;
                    globalEntries.document = entrypoints.pagesDocumentEndpoint;
                    globalEntries.error = entrypoints.pagesErrorEndpoint;
                    curEntries.clear();
                    for (const [pathname, route] of entrypoints.routes){
                        switch(route.type){
                            case "page":
                            case "page-api":
                            case "app-page":
                            case "app-route":
                                {
                                    curEntries.set(pathname, route);
                                    break;
                                }
                            default:
                                _log.info(`skipping ${pathname} (${route.type})`);
                                break;
                        }
                    }
                }
            }
            handleEntries().catch((err)=>{
                console.error(err);
                process.exit(1);
            });
        } catch (e) {
            console.error(e);
        }
        const buildManifests = new Map();
        const appBuildManifests = new Map();
        const pagesManifests = new Map();
        const appPathsManifests = new Map();
        const middlewareManifests = new Map();
        function mergeBuildManifests(manifests) {
            const manifest = {
                pages: {
                    "/_app": []
                },
                // Something in next.js depends on these to exist even for app dir rendering
                devFiles: [],
                ampDevFiles: [],
                polyfillFiles: [],
                lowPriorityFiles: [
                    "static/development/_ssgManifest.js",
                    "static/development/_buildManifest.js"
                ],
                rootMainFiles: [],
                ampFirstPages: []
            };
            for (const m of manifests){
                Object.assign(manifest.pages, m.pages);
                if (m.rootMainFiles.length) manifest.rootMainFiles = m.rootMainFiles;
            }
            return manifest;
        }
        function mergeAppBuildManifests(manifests) {
            const manifest = {
                pages: {}
            };
            for (const m of manifests){
                Object.assign(manifest.pages, m.pages);
            }
            return manifest;
        }
        function mergePagesManifests(manifests) {
            const manifest = {};
            for (const m of manifests){
                Object.assign(manifest, m);
            }
            return manifest;
        }
        function mergeMiddlewareManifests(manifests) {
            const manifest = {
                version: 2,
                middleware: {},
                sortedMiddleware: [],
                functions: {}
            };
            for (const m of manifests){
                Object.assign(manifest.functions, m.functions);
            }
            return manifest;
        }
        async function processResult(result) {
            if (result) {
                await (global._nextDeleteCache == null ? void 0 : global._nextDeleteCache(result.serverPaths.map((p)=>_path.default.join(distDir, p)).concat([
                    // We need to clear the chunk cache in react
                    require.resolve("next/dist/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-client.edge.development.js"),
                    // And this redirecting module as well
                    require.resolve("next/dist/compiled/react-server-dom-webpack/client.edge.js")
                ])));
                for (const issue of result.issues){
                    // TODO better formatting
                    if (issue.severity !== "error" && issue.severity !== "fatal") continue;
                    console.error(`⚠ ${issue.severity} - ${issue.filePath}\n${issue.title}\n${issue.description}\n\n`);
                }
            }
            return result;
        }
        const clearCache = (filePath)=>{
            return global._nextDeleteCache == null ? void 0 : global._nextDeleteCache([
                filePath
            ]);
        };
        async function writeBuildManifest() {
            const buildManifest = mergeBuildManifests(buildManifests.values());
            const buildManifestPath = _path.default.join(distDir, "build-manifest.json");
            await clearCache(buildManifestPath);
            await (0, _promises.writeFile)(buildManifestPath, JSON.stringify(buildManifest, null, 2), "utf-8");
            const content = {
                __rewrites: {
                    afterFiles: [],
                    beforeFiles: [],
                    fallback: []
                },
                ...Object.fromEntries([
                    ...curEntries.keys()
                ].map((pathname)=>[
                        pathname,
                        `static/chunks/pages${pathname === "/" ? "/index" : pathname}.js`
                    ])),
                sortedPages: [
                    ...curEntries.keys()
                ]
            };
            const buildManifestJs = `self.__BUILD_MANIFEST = ${JSON.stringify(content)};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()`;
            await (0, _promises.writeFile)(_path.default.join(distDir, "static", "development", "_buildManifest.js"), buildManifestJs, "utf-8");
            await (0, _promises.writeFile)(_path.default.join(distDir, "static", "development", "_ssgManifest.js"), _buildmanifestplugin.srcEmptySsgManifest, "utf-8");
        }
        async function writeAppBuildManifest() {
            const appBuildManifest = mergeAppBuildManifests(appBuildManifests.values());
            const appBuildManifestPath = _path.default.join(distDir, _constants.APP_BUILD_MANIFEST);
            await clearCache(appBuildManifestPath);
            await (0, _promises.writeFile)(appBuildManifestPath, JSON.stringify(appBuildManifest, null, 2), "utf-8");
        }
        async function writePagesManifest() {
            const pagesManifest = mergePagesManifests(pagesManifests.values());
            const pagesManifestPath = _path.default.join(distDir, "server", _constants.PAGES_MANIFEST);
            await clearCache(pagesManifestPath);
            await (0, _promises.writeFile)(pagesManifestPath, JSON.stringify(pagesManifest, null, 2), "utf-8");
        }
        async function writeAppPathsManifest() {
            const appPathsManifest = mergePagesManifests(appPathsManifests.values());
            const appPathsManifestPath = _path.default.join(distDir, "server", _constants.APP_PATHS_MANIFEST);
            await clearCache(appPathsManifestPath);
            await (0, _promises.writeFile)(appPathsManifestPath, JSON.stringify(appPathsManifest, null, 2), "utf-8");
        }
        async function writeMiddlewareManifest() {
            const middlewareManifest = mergeMiddlewareManifests(middlewareManifests.values());
            const middlewareManifestPath = _path.default.join(distDir, "server/middleware-manifest.json");
            await clearCache(middlewareManifestPath);
            await (0, _promises.writeFile)(middlewareManifestPath, JSON.stringify(middlewareManifest, null, 2), "utf-8");
        }
        async function writeOtherManifests() {
            const loadableManifestPath = _path.default.join(distDir, "react-loadable-manifest.json");
            await clearCache(loadableManifestPath);
            await (0, _promises.writeFile)(loadableManifestPath, JSON.stringify({}, null, 2), "utf-8");
            // TODO: turbopack should write the correct
            // version of this
            const fontManifestPath = _path.default.join(distDir, "server", _constants.NEXT_FONT_MANIFEST + ".json");
            await clearCache(fontManifestPath);
            await (0, _promises.writeFile)(fontManifestPath, JSON.stringify({
                pages: {},
                app: {},
                appUsingSizeAdjust: false,
                pagesUsingSizeAdjust: false
            }, null, 2));
        }
        // Write empty manifests
        await (0, _promises.mkdir)(_path.default.join(distDir, "server"), {
            recursive: true
        });
        await (0, _promises.mkdir)(_path.default.join(distDir, "static/development"), {
            recursive: true
        });
        await (0, _promises.writeFile)(_path.default.join(distDir, "package.json"), JSON.stringify({
            type: "commonjs"
        }, null, 2));
        await writeBuildManifest();
        await writeAppBuildManifest();
        await writePagesManifest();
        await writeAppPathsManifest();
        await writeMiddlewareManifest();
        await writeOtherManifests();
        hotReloader = new Proxy({}, {
            get (_target, prop, _receiver) {
                if (prop === "ensurePage") {
                    return async (ensureOpts)=>{
                        var _ensureOpts_match, _ensureOpts_match_definition;
                        let page = ((_ensureOpts_match = ensureOpts.match) == null ? void 0 : (_ensureOpts_match_definition = _ensureOpts_match.definition) == null ? void 0 : _ensureOpts_match_definition.pathname) ?? ensureOpts.page;
                        async function loadPartialManifest(name, pageName, isApp = false, isRoute = false) {
                            const manifestPath = _path.default.posix.join(distDir, `server`, isApp ? "app" : "pages", pageName === "/" && !isApp ? "index" : pageName, isApp && pageName !== "/_not-found" && pageName !== "/not-found" ? isRoute ? "route" : "page" : "", name);
                            return JSON.parse(await (0, _promises.readFile)(_path.default.posix.join(manifestPath), "utf-8"));
                        }
                        async function loadBuildManifest(pageName, isApp = false) {
                            buildManifests.set(pageName, await loadPartialManifest(_constants.BUILD_MANIFEST, pageName, isApp));
                        }
                        async function loadAppBuildManifest(pageName) {
                            appBuildManifests.set(pageName, await loadPartialManifest(_constants.APP_BUILD_MANIFEST, pageName, true));
                        }
                        async function loadPagesManifest(pageName) {
                            pagesManifests.set(pageName, await loadPartialManifest(_constants.PAGES_MANIFEST, pageName));
                        }
                        async function loadAppPathManifest(pageName, routeHandler) {
                            appPathsManifests.set(pageName, await loadPartialManifest(_constants.APP_PATHS_MANIFEST, pageName, true, routeHandler));
                        }
                        async function loadMiddlewareManifest(pageName, isApp = false, isRoute = false) {
                            middlewareManifests.set(pageName, await loadPartialManifest(_constants.MIDDLEWARE_MANIFEST, pageName, isApp, isRoute));
                        }
                        if (page === "/_error") {
                            var _globalEntries_app, _globalEntries_document, _globalEntries_error;
                            await processResult(await ((_globalEntries_app = globalEntries.app) == null ? void 0 : _globalEntries_app.writeToDisk()));
                            await loadBuildManifest("_app");
                            await loadPagesManifest("_app");
                            await processResult(await ((_globalEntries_document = globalEntries.document) == null ? void 0 : _globalEntries_document.writeToDisk()));
                            await loadPagesManifest("_document");
                            await processResult(await ((_globalEntries_error = globalEntries.error) == null ? void 0 : _globalEntries_error.writeToDisk()));
                            await loadBuildManifest("_error");
                            await loadPagesManifest("_error");
                            await writeBuildManifest();
                            await writePagesManifest();
                            await writeMiddlewareManifest();
                            await writeOtherManifests();
                            return;
                        }
                        const route = curEntries.get(page);
                        if (!route) {
                            // TODO: why is this entry missing in turbopack?
                            if (page === "/_app") return;
                            if (page === "/_document") return;
                            throw new _utils1.PageNotFoundError(`route not found ${page}`);
                        }
                        switch(route.type){
                            case "page":
                            case "page-api":
                                {
                                    var _globalEntries_app1, _globalEntries_document1;
                                    if (ensureOpts.isApp) {
                                        throw new Error(`mis-matched route type: isApp && page for ${page}`);
                                    }
                                    await processResult(await ((_globalEntries_app1 = globalEntries.app) == null ? void 0 : _globalEntries_app1.writeToDisk()));
                                    await loadBuildManifest("_app");
                                    await loadPagesManifest("_app");
                                    await processResult(await ((_globalEntries_document1 = globalEntries.document) == null ? void 0 : _globalEntries_document1.writeToDisk()));
                                    await loadPagesManifest("_document");
                                    const writtenEndpoint = route.type === "page-api" ? await processResult(await route.endpoint.writeToDisk()) : await processResult(await route.htmlEndpoint.writeToDisk());
                                    if (route.type === "page") {
                                        await loadBuildManifest(page);
                                    }
                                    await loadPagesManifest(page);
                                    switch(writtenEndpoint.type){
                                        case "nodejs":
                                            {
                                                break;
                                            }
                                        case "edge":
                                            {
                                                throw new Error("edge is not implemented yet");
                                            }
                                        default:
                                            {
                                                throw new Error(`unknown endpoint type ${writtenEndpoint.type}`);
                                            }
                                    }
                                    await writeBuildManifest();
                                    await writePagesManifest();
                                    await writeMiddlewareManifest();
                                    await writeOtherManifests();
                                    break;
                                }
                            case "app-page":
                                {
                                    await processResult(await route.htmlEndpoint.writeToDisk());
                                    await loadAppBuildManifest(page);
                                    await loadBuildManifest(page, true);
                                    await loadAppPathManifest(page, false);
                                    await writeAppBuildManifest();
                                    await writeBuildManifest();
                                    await writeAppPathsManifest();
                                    await writeMiddlewareManifest();
                                    await writeOtherManifests();
                                    break;
                                }
                            case "app-route":
                                {
                                    var _ref;
                                    const type = (_ref = await processResult(await route.endpoint.writeToDisk())) == null ? void 0 : _ref.type;
                                    await loadAppPathManifest(page, true);
                                    if (type === "edge") await loadMiddlewareManifest(page, true, true);
                                    await writeAppBuildManifest();
                                    await writeAppPathsManifest();
                                    await writeMiddlewareManifest();
                                    if (type === "edge") await writeMiddlewareManifest();
                                    await writeOtherManifests();
                                    break;
                                }
                            default:
                                {
                                    throw new Error(`unknown route type ${route.type} for ${page}`);
                                }
                        }
                    };
                }
                if (prop === "run") {
                    return async (req, _res)=>{
                        var _req_url;
                        // intercept page chunks request and ensure them with turbopack
                        if ((_req_url = req.url) == null ? void 0 : _req_url.startsWith("/_next/static/chunks/pages/")) {
                            const params = (0, _hotreloader.matchNextPageBundleRequest)(req.url);
                            if (params) {
                                const decodedPagePath = `/${params.path.map((param)=>decodeURIComponent(param)).join("/")}`;
                                await hotReloader.ensurePage({
                                    page: decodedPagePath,
                                    clientOnly: false
                                }).catch(console.error);
                            }
                        }
                        return {
                            finished: false
                        };
                    };
                }
                if (prop === "activeConfigs") {
                    return [];
                }
                return ()=>{};
            },
            set () {
                return true;
            }
        });
    } else {
        hotReloader = new _hotreloader.default(opts.dir, {
            appDir,
            pagesDir,
            distDir: distDir,
            config: opts.nextConfig,
            buildId: "development",
            telemetry: opts.telemetry,
            rewrites: opts.fsChecker.rewrites,
            previewProps: opts.fsChecker.prerenderManifest.preview
        });
    }
    await hotReloader.start();
    if (opts.nextConfig.experimental.nextScriptWorkers) {
        await (0, _verifypartytownsetup.verifyPartytownSetup)(opts.dir, _path.default.join(distDir, _constants.CLIENT_STATIC_FILES_PATH));
    }
    opts.fsChecker.ensureCallback(async function ensure(item) {
        if (item.type === "appFile" || item.type === "pageFile") {
            await hotReloader.ensurePage({
                clientOnly: false,
                page: item.itemPath,
                isApp: item.type === "appFile"
            });
        }
    });
    let resolved = false;
    let prevSortedRoutes = [];
    const serverFields = {};
    await new Promise(async (resolve, reject)=>{
        if (pagesDir) {
            // Watchpack doesn't emit an event for an empty directory
            _fs.default.readdir(pagesDir, (_, files)=>{
                if (files == null ? void 0 : files.length) {
                    return;
                }
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            });
        }
        const pages = pagesDir ? [
            pagesDir
        ] : [];
        const app = appDir ? [
            appDir
        ] : [];
        const directories = [
            ...pages,
            ...app
        ];
        const rootDir = pagesDir || appDir;
        const files = [
            ...(0, _worker.getPossibleMiddlewareFilenames)(_path.default.join(rootDir, ".."), nextConfig.pageExtensions),
            ...(0, _worker.getPossibleInstrumentationHookFilenames)(_path.default.join(rootDir, ".."), nextConfig.pageExtensions)
        ];
        let nestedMiddleware = [];
        const envFiles = [
            ".env.development.local",
            ".env.local",
            ".env.development",
            ".env"
        ].map((file)=>_path.default.join(dir, file));
        files.push(...envFiles);
        // tsconfig/jsconfig paths hot-reloading
        const tsconfigPaths = [
            _path.default.join(dir, "tsconfig.json"),
            _path.default.join(dir, "jsconfig.json")
        ];
        files.push(...tsconfigPaths);
        const wp = new _watchpack.default({
            ignored: (pathname)=>{
                return !files.some((file)=>file.startsWith(pathname)) && !directories.some((d)=>pathname.startsWith(d) || d.startsWith(pathname));
            }
        });
        const fileWatchTimes = new Map();
        let enabledTypeScript = usingTypeScript;
        let previousClientRouterFilters;
        let previousConflictingPagePaths = new Set();
        wp.on("aggregated", async ()=>{
            var _serverFields_middleware, _serverFields_middleware1, _generateInterceptionRoutesRewrites;
            let middlewareMatchers;
            const routedPages = [];
            const knownFiles = wp.getTimeInfoEntries();
            const appPaths = {};
            const pageNameSet = new Set();
            const conflictingAppPagePaths = new Set();
            const appPageFilePaths = new Map();
            const pagesPageFilePaths = new Map();
            let envChange = false;
            let tsconfigChange = false;
            let conflictingPageChange = 0;
            let hasRootAppNotFound = false;
            const { appFiles , pageFiles  } = opts.fsChecker;
            appFiles.clear();
            pageFiles.clear();
            _shared1.devPageFiles.clear();
            const sortedKnownFiles = [
                ...knownFiles.keys()
            ].sort((0, _entries.sortByPageExts)(nextConfig.pageExtensions));
            for (const fileName of sortedKnownFiles){
                if (!files.includes(fileName) && !directories.some((d)=>fileName.startsWith(d))) {
                    continue;
                }
                const meta = knownFiles.get(fileName);
                const watchTime = fileWatchTimes.get(fileName);
                const watchTimeChange = watchTime && watchTime !== (meta == null ? void 0 : meta.timestamp);
                fileWatchTimes.set(fileName, meta.timestamp);
                if (envFiles.includes(fileName)) {
                    if (watchTimeChange) {
                        envChange = true;
                    }
                    continue;
                }
                if (tsconfigPaths.includes(fileName)) {
                    if (fileName.endsWith("tsconfig.json")) {
                        enabledTypeScript = true;
                    }
                    if (watchTimeChange) {
                        tsconfigChange = true;
                    }
                    continue;
                }
                if ((meta == null ? void 0 : meta.accuracy) === undefined || !validFileMatcher.isPageFile(fileName)) {
                    continue;
                }
                const isAppPath = Boolean(appDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(appDir) + "/"));
                const isPagePath = Boolean(pagesDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(pagesDir) + "/"));
                const rootFile = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: dir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: false,
                    pagesType: "root"
                });
                if ((0, _worker.isMiddlewareFile)(rootFile)) {
                    var _staticInfo_middleware;
                    const staticInfo = await (0, _entries.getStaticInfoIncludingLayouts)({
                        pageFilePath: fileName,
                        config: nextConfig,
                        appDir: appDir,
                        page: rootFile,
                        isDev: true,
                        isInsideAppDir: isAppPath,
                        pageExtensions: nextConfig.pageExtensions
                    });
                    if (nextConfig.output === "export") {
                        _log.error('Middleware cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                        continue;
                    }
                    serverFields.actualMiddlewareFile = rootFile;
                    await propagateToWorkers("actualMiddlewareFile", serverFields.actualMiddlewareFile);
                    middlewareMatchers = ((_staticInfo_middleware = staticInfo.middleware) == null ? void 0 : _staticInfo_middleware.matchers) || [
                        {
                            regexp: ".*",
                            originalSource: "/:path*"
                        }
                    ];
                    continue;
                }
                if ((0, _worker.isInstrumentationHookFile)(rootFile) && nextConfig.experimental.instrumentationHook) {
                    _buildcontext.NextBuildContext.hasInstrumentationHook = true;
                    serverFields.actualInstrumentationHookFile = rootFile;
                    await propagateToWorkers("actualInstrumentationHookFile", serverFields.actualInstrumentationHookFile);
                    continue;
                }
                if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
                    enabledTypeScript = true;
                }
                if (!(isAppPath || isPagePath)) {
                    continue;
                }
                // Collect all current filenames for the TS plugin to use
                _shared1.devPageFiles.add(fileName);
                let pageName = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: isAppPath ? appDir : pagesDir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: isAppPath,
                    pagesType: isAppPath ? "app" : "pages"
                });
                if (!isAppPath && pageName.startsWith("/api/") && nextConfig.output === "export") {
                    _log.error('API Routes cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                    continue;
                }
                if (isAppPath) {
                    const isRootNotFound = validFileMatcher.isRootNotFound(fileName);
                    if (isRootNotFound) {
                        hasRootAppNotFound = true;
                        continue;
                    }
                    if (!isRootNotFound && !validFileMatcher.isAppRouterPage(fileName)) {
                        continue;
                    }
                    // Ignore files/directories starting with `_` in the app directory
                    if ((0, _normalizepathsep.normalizePathSep)(pageName).includes("/_")) {
                        continue;
                    }
                    const originalPageName = pageName;
                    pageName = (0, _apppaths.normalizeAppPath)(pageName).replace(/%5F/g, "_");
                    if (!appPaths[pageName]) {
                        appPaths[pageName] = [];
                    }
                    appPaths[pageName].push(originalPageName);
                    if (useFileSystemPublicRoutes) {
                        appFiles.add(pageName);
                    }
                    if (routedPages.includes(pageName)) {
                        continue;
                    }
                } else {
                    if (useFileSystemPublicRoutes) {
                        pageFiles.add(pageName);
                        // always add to nextDataRoutes for now but in future only add
                        // entries that actually use getStaticProps/getServerSideProps
                        opts.fsChecker.nextDataRoutes.add(pageName);
                    }
                }
                (isAppPath ? appPageFilePaths : pagesPageFilePaths).set(pageName, fileName);
                if (appDir && pageNameSet.has(pageName)) {
                    conflictingAppPagePaths.add(pageName);
                } else {
                    pageNameSet.add(pageName);
                }
                /**
         * If there is a middleware that is not declared in the root we will
         * warn without adding it so it doesn't make its way into the system.
         */ if (/[\\\\/]_middleware$/.test(pageName)) {
                    nestedMiddleware.push(pageName);
                    continue;
                }
                routedPages.push(pageName);
            }
            const numConflicting = conflictingAppPagePaths.size;
            conflictingPageChange = numConflicting - previousConflictingPagePaths.size;
            if (conflictingPageChange !== 0) {
                if (numConflicting > 0) {
                    let errorMessage = `Conflicting app and page file${numConflicting === 1 ? " was" : "s were"} found, please remove the conflicting files to continue:\n`;
                    for (const p of conflictingAppPagePaths){
                        const appPath = _path.default.relative(dir, appPageFilePaths.get(p));
                        const pagesPath = _path.default.relative(dir, pagesPageFilePaths.get(p));
                        errorMessage += `  "${pagesPath}" - "${appPath}"\n`;
                    }
                    hotReloader.setHmrServerError(new Error(errorMessage));
                } else if (numConflicting === 0) {
                    hotReloader.clearHmrServerError();
                    await propagateToWorkers("reloadMatchers", undefined);
                }
            }
            previousConflictingPagePaths = conflictingAppPagePaths;
            let clientRouterFilters;
            if (nextConfig.experimental.clientRouterFilter) {
                clientRouterFilters = (0, _createclientrouterfilter.createClientRouterFilter)(Object.keys(appPaths), nextConfig.experimental.clientRouterFilterRedirects ? (nextConfig._originalRedirects || []).filter((r)=>!r.internal) : [], nextConfig.experimental.clientRouterFilterAllowedRate);
                if (!previousClientRouterFilters || JSON.stringify(previousClientRouterFilters) !== JSON.stringify(clientRouterFilters)) {
                    envChange = true;
                    previousClientRouterFilters = clientRouterFilters;
                }
            }
            if (!usingTypeScript && enabledTypeScript) {
                // we tolerate the error here as this is best effort
                // and the manual install command will be shown
                await verifyTypeScript(opts).then(()=>{
                    tsconfigChange = true;
                }).catch(()=>{});
            }
            if (envChange || tsconfigChange) {
                var _hotReloader_activeConfigs;
                if (envChange) {
                    (0, _env.loadEnvConfig)(dir, true, _log, true);
                    await propagateToWorkers("loadEnvConfig", [
                        {
                            dev: true,
                            forceReload: true,
                            silent: true
                        }
                    ]);
                }
                let tsconfigResult;
                if (tsconfigChange) {
                    try {
                        tsconfigResult = await (0, _loadjsconfig.default)(dir, nextConfig);
                    } catch (_) {
                    /* do we want to log if there are syntax errors in tsconfig  while editing? */ }
                }
                (_hotReloader_activeConfigs = hotReloader.activeConfigs) == null ? void 0 : _hotReloader_activeConfigs.forEach((config, idx)=>{
                    const isClient = idx === 0;
                    const isNodeServer = idx === 1;
                    const isEdgeServer = idx === 2;
                    const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
                    if (tsconfigChange) {
                        var _config_resolve, _config_resolve_plugins;
                        (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_plugins = _config_resolve.plugins) == null ? void 0 : _config_resolve_plugins.forEach((plugin)=>{
                            // look for the JsConfigPathsPlugin and update with
                            // the latest paths/baseUrl config
                            if (plugin && plugin.jsConfigPlugin && tsconfigResult) {
                                var _config_resolve, _config_resolve_modules, _jsConfig_compilerOptions;
                                const { resolvedBaseUrl , jsConfig  } = tsconfigResult;
                                const currentResolvedBaseUrl = plugin.resolvedBaseUrl;
                                const resolvedUrlIndex = (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_modules = _config_resolve.modules) == null ? void 0 : _config_resolve_modules.findIndex((item)=>item === currentResolvedBaseUrl);
                                if (resolvedBaseUrl && resolvedBaseUrl !== currentResolvedBaseUrl) {
                                    var _config_resolve1, _config_resolve_modules1;
                                    // remove old baseUrl and add new one
                                    if (resolvedUrlIndex && resolvedUrlIndex > -1) {
                                        var _config_resolve2, _config_resolve_modules2;
                                        (_config_resolve2 = config.resolve) == null ? void 0 : (_config_resolve_modules2 = _config_resolve2.modules) == null ? void 0 : _config_resolve_modules2.splice(resolvedUrlIndex, 1);
                                    }
                                    (_config_resolve1 = config.resolve) == null ? void 0 : (_config_resolve_modules1 = _config_resolve1.modules) == null ? void 0 : _config_resolve_modules1.push(resolvedBaseUrl);
                                }
                                if ((jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.paths) && resolvedBaseUrl) {
                                    Object.keys(plugin.paths).forEach((key)=>{
                                        delete plugin.paths[key];
                                    });
                                    Object.assign(plugin.paths, jsConfig.compilerOptions.paths);
                                    plugin.resolvedBaseUrl = resolvedBaseUrl;
                                }
                            }
                        });
                    }
                    if (envChange) {
                        var _config_plugins;
                        (_config_plugins = config.plugins) == null ? void 0 : _config_plugins.forEach((plugin)=>{
                            // we look for the DefinePlugin definitions so we can
                            // update them on the active compilers
                            if (plugin && typeof plugin.definitions === "object" && plugin.definitions.__NEXT_DEFINE_ENV) {
                                const newDefine = (0, _webpackconfig.getDefineEnv)({
                                    dev: true,
                                    config: nextConfig,
                                    distDir,
                                    isClient,
                                    hasRewrites,
                                    isNodeServer,
                                    isEdgeServer,
                                    clientRouterFilters
                                });
                                Object.keys(plugin.definitions).forEach((key)=>{
                                    if (!(key in newDefine)) {
                                        delete plugin.definitions[key];
                                    }
                                });
                                Object.assign(plugin.definitions, newDefine);
                            }
                        });
                    }
                });
                hotReloader.invalidate({
                    reloadAfterInvalidation: envChange
                });
            }
            if (nestedMiddleware.length > 0) {
                _log.error(new _worker.NestedMiddlewareError(nestedMiddleware, dir, pagesDir || appDir).message);
                nestedMiddleware = [];
            }
            // Make sure to sort parallel routes to make the result deterministic.
            serverFields.appPathRoutes = Object.fromEntries(Object.entries(appPaths).map(([k, v])=>[
                    k,
                    v.sort()
                ]));
            await propagateToWorkers("appPathRoutes", serverFields.appPathRoutes);
            // TODO: pass this to fsChecker/next-dev-server?
            serverFields.middleware = middlewareMatchers ? {
                match: null,
                page: "/",
                matchers: middlewareMatchers
            } : undefined;
            await propagateToWorkers("middleware", serverFields.middleware);
            serverFields.hasAppNotFound = hasRootAppNotFound;
            opts.fsChecker.middlewareMatcher = ((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) ? (0, _middlewareroutematcher.getMiddlewareRouteMatcher)((_serverFields_middleware1 = serverFields.middleware) == null ? void 0 : _serverFields_middleware1.matchers) : undefined;
            opts.fsChecker.interceptionRoutes = ((_generateInterceptionRoutesRewrites = (0, _generateinterceptionroutesrewrites.generateInterceptionRoutesRewrites)(Object.keys(appPaths))) == null ? void 0 : _generateInterceptionRoutesRewrites.map((item)=>(0, _filesystem.buildCustomRoute)("before_files_rewrite", item, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes))) || [];
            const exportPathMap = typeof nextConfig.exportPathMap === "function" && await (nextConfig.exportPathMap == null ? void 0 : nextConfig.exportPathMap({}, {
                dev: true,
                dir: opts.dir,
                outDir: null,
                distDir: distDir,
                buildId: "development"
            })) || {};
            for (const [key, value] of Object.entries(exportPathMap || {})){
                opts.fsChecker.interceptionRoutes.push((0, _filesystem.buildCustomRoute)("before_files_rewrite", {
                    source: key,
                    destination: `${value.page}${value.query ? "?" : ""}${_querystring.default.stringify(value.query)}`
                }, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes));
            }
            try {
                // we serve a separate manifest with all pages for the client in
                // dev mode so that we can match a page after a rewrite on the client
                // before it has been built and is populated in the _buildManifest
                const sortedRoutes = (0, _utils.getSortedRoutes)(routedPages);
                opts.fsChecker.dynamicRoutes = sortedRoutes.map((page)=>{
                    const regex = (0, _routeregex.getRouteRegex)(page);
                    return {
                        match: (0, _routematcher.getRouteMatcher)(regex),
                        page,
                        re: regex.re,
                        groups: regex.groups
                    };
                }).filter(Boolean);
                for (const page of sortedRoutes){
                    const route = (0, _builddataroute.buildDataRoute)(page, "development");
                    const routeRegex = (0, _routeregex.getRouteRegex)(route.page);
                    opts.fsChecker.dynamicRoutes.push({
                        ...route,
                        regex: routeRegex.re.toString(),
                        match: (0, _routematcher.getRouteMatcher)({
                            // TODO: fix this in the manifest itself, must also be fixed in
                            // upstream builder that relies on this
                            re: opts.nextConfig.i18n ? new RegExp(route.dataRouteRegex.replace(`/development/`, `/development/(?<nextLocale>.+?)/`)) : new RegExp(route.dataRouteRegex),
                            groups: routeRegex.groups
                        })
                    });
                }
                if (!(prevSortedRoutes == null ? void 0 : prevSortedRoutes.every((val, idx)=>val === sortedRoutes[idx]))) {
                    // emit the change so clients fetch the update
                    hotReloader.send("devPagesManifestUpdate", {
                        devPagesManifest: true
                    });
                }
                prevSortedRoutes = sortedRoutes;
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            } catch (e) {
                if (!resolved) {
                    reject(e);
                    resolved = true;
                } else {
                    _log.warn("Failed to reload dynamic routes:", e);
                }
            } finally{
                // Reload the matchers. The filesystem would have been written to,
                // and the matchers need to re-scan it to update the router.
                await propagateToWorkers("reloadMatchers", undefined);
            }
        });
        wp.watch({
            directories: [
                dir
            ],
            startTime: 0
        });
    });
    const clientPagesManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_CLIENT_PAGES_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(clientPagesManifestPath);
    const devMiddlewareManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_MIDDLEWARE_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(devMiddlewareManifestPath);
    async function requestHandler(req, res) {
        const parsedUrl = _url.default.parse(req.url || "/");
        if (parsedUrl.pathname === clientPagesManifestPath) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({
                pages: prevSortedRoutes.filter((route)=>!opts.fsChecker.appFiles.has(route))
            }));
            return {
                finished: true
            };
        }
        if (parsedUrl.pathname === devMiddlewareManifestPath) {
            var _serverFields_middleware;
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) || []));
            return {
                finished: true
            };
        }
        return {
            finished: false
        };
    }
    async function logErrorWithOriginalStack(err, type) {
        let usedOriginalStack = false;
        if ((0, _iserror.default)(err) && err.stack) {
            try {
                const frames = (0, _middleware.parseStack)(err.stack);
                // Filter out internal edge related runtime stack
                const frame = frames.find(({ file  })=>{
                    return !(file == null ? void 0 : file.startsWith("eval")) && !(file == null ? void 0 : file.includes("web/adapter")) && !(file == null ? void 0 : file.includes("web/globals")) && !(file == null ? void 0 : file.includes("sandbox/context")) && !(file == null ? void 0 : file.includes("<anonymous>"));
                });
                if ((frame == null ? void 0 : frame.lineNumber) && (frame == null ? void 0 : frame.file)) {
                    var _hotReloader_edgeServerStats, _hotReloader_serverStats, _frame_file, _frame_file1, _hotReloader_serverStats1, _hotReloader_edgeServerStats1;
                    const moduleId = frame.file.replace(/^(webpack-internal:\/\/\/|file:\/\/)/, "");
                    const modulePath = frame.file.replace(/^(webpack-internal:\/\/\/|file:\/\/)(\(.*\)\/)?/, "");
                    const src = (0, _middleware.getErrorSource)(err);
                    const isEdgeCompiler = src === _constants.COMPILER_NAMES.edgeServer;
                    const compilation = isEdgeCompiler ? (_hotReloader_edgeServerStats = hotReloader.edgeServerStats) == null ? void 0 : _hotReloader_edgeServerStats.compilation : (_hotReloader_serverStats = hotReloader.serverStats) == null ? void 0 : _hotReloader_serverStats.compilation;
                    const source = await (0, _middleware.getSourceById)(!!((_frame_file = frame.file) == null ? void 0 : _frame_file.startsWith(_path.default.sep)) || !!((_frame_file1 = frame.file) == null ? void 0 : _frame_file1.startsWith("file:")), moduleId, compilation);
                    const originalFrame = await (0, _middleware.createOriginalStackFrame)({
                        line: frame.lineNumber,
                        column: frame.column,
                        source,
                        frame,
                        moduleId,
                        modulePath,
                        rootDirectory: opts.dir,
                        errorMessage: err.message,
                        serverCompilation: isEdgeCompiler ? undefined : (_hotReloader_serverStats1 = hotReloader.serverStats) == null ? void 0 : _hotReloader_serverStats1.compilation,
                        edgeCompilation: isEdgeCompiler ? (_hotReloader_edgeServerStats1 = hotReloader.edgeServerStats) == null ? void 0 : _hotReloader_edgeServerStats1.compilation : undefined
                    }).catch(()=>{});
                    if (originalFrame) {
                        const { originalCodeFrame , originalStackFrame  } = originalFrame;
                        const { file , lineNumber , column , methodName  } = originalStackFrame;
                        _log[type === "warning" ? "warn" : "error"](`${file} (${lineNumber}:${column}) @ ${methodName}`);
                        if (isEdgeCompiler) {
                            err = err.message;
                        }
                        if (type === "warning") {
                            _log.warn(err);
                        } else if (type === "app-dir") {
                            (0, _logappdirerror.logAppDirError)(err);
                        } else if (type) {
                            _log.error(`${type}:`, err);
                        } else {
                            _log.error(err);
                        }
                        console[type === "warning" ? "warn" : "error"](originalCodeFrame);
                        usedOriginalStack = true;
                    }
                }
            } catch (_) {
            // failed to load original stack using source maps
            // this un-actionable by users so we don't show the
            // internal error and only show the provided stack
            }
        }
        if (!usedOriginalStack) {
            if (type === "warning") {
                _log.warn(err);
            } else if (type === "app-dir") {
                (0, _logappdirerror.logAppDirError)(err);
            } else if (type) {
                _log.error(`${type}:`, err);
            } else {
                _log.error(err);
            }
        }
    }
    return {
        serverFields,
        hotReloader,
        renderWorkers,
        requestHandler,
        logErrorWithOriginalStack,
        async ensureMiddleware () {
            if (!serverFields.actualMiddlewareFile) return;
            return hotReloader.ensurePage({
                page: serverFields.actualMiddlewareFile,
                clientOnly: false
            });
        }
    };
}
async function setupDev(opts) {
    const isSrcDir = _path.default.relative(opts.dir, opts.pagesDir || opts.appDir || "").startsWith("src");
    const result = await startWatcher(opts);
    opts.telemetry.record((0, _events.eventCliSession)(_path.default.join(opts.dir, opts.nextConfig.distDir), opts.nextConfig, {
        webpackVersion: 5,
        isSrcDir,
        turboFlag: false,
        cliCommand: "dev",
        appDir: !!opts.appDir,
        pagesDir: !!opts.pagesDir,
        isCustomServer: !!opts.isCustomServer,
        hasNowJson: !!await (0, _findup.default)("now.json", {
            cwd: opts.dir
        })
    }));
    return result;
}

//# sourceMappingURL=setup-dev.js.map