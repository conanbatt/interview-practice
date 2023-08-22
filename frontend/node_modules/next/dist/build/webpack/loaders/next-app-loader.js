"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _querystring = require("querystring");
const _chalk = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/chalk"));
const _getmodulebuildinfo = require("./get-module-build-info");
const _verifyRootLayout = require("../../../lib/verifyRootLayout");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../output/log"));
const _constants = require("../../../lib/constants");
const _discover = require("./metadata/discover");
const _fs = require("fs");
const _isapprouteroute = require("../../../lib/is-app-route-route");
const _ismetadataroute = require("../../../lib/metadata/is-metadata-route");
const _apppathnamenormalizer = require("../../../server/future/normalizers/built/app/app-pathname-normalizer");
const _appbundlepathnormalizer = require("../../../server/future/normalizers/built/app/app-bundle-path-normalizer");
const _nextmetadatarouteloader = require("./next-metadata-route-loader");
const _loadentrypoint = require("./next-route-loader/load-entrypoint");
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
const FILE_TYPES = {
    layout: "layout",
    template: "template",
    error: "error",
    loading: "loading",
    "not-found": "not-found"
};
const GLOBAL_ERROR_FILE_TYPE = "global-error";
const PAGE_SEGMENT = "page$";
const PARALLEL_CHILDREN_SEGMENT = "children$";
const defaultNotFoundPath = "next/dist/client/components/not-found-error";
function isGroupSegment(segment) {
    return segment.startsWith("(") && segment.endsWith(")");
}
async function createAppRouteCode({ name , page , pagePath , resolveAppRoute , pageExtensions , nextConfigOutput  }) {
    // routePath is the path to the route handler file,
    // but could be aliased e.g. private-next-app-dir/favicon.ico
    const routePath = pagePath.replace(/[\\/]/, "/");
    // This, when used with the resolver will give us the pathname to the built
    // route handler file.
    let resolvedPagePath = await resolveAppRoute(routePath);
    if (!resolvedPagePath) {
        throw new Error(`Invariant: could not resolve page path for ${name} at ${routePath}`);
    }
    // If this is a metadata route, then we need to use the metadata loader for
    // the route to ensure that the route is generated.
    const filename = _path.default.parse(resolvedPagePath).name;
    if ((0, _ismetadataroute.isMetadataRoute)(name) && filename !== "route") {
        const { ext  } = (0, _nextmetadatarouteloader.getFilenameAndExtension)(resolvedPagePath);
        const isDynamic = pageExtensions.includes(ext);
        resolvedPagePath = `next-metadata-route-loader?${(0, _querystring.stringify)({
            page,
            isDynamic: isDynamic ? "1" : "0"
        })}!${resolvedPagePath}${`?${_constants.WEBPACK_RESOURCE_QUERIES.metadataRoute}`}`;
    }
    const pathname = new _apppathnamenormalizer.AppPathnameNormalizer().normalize(page);
    const bundlePath = new _appbundlepathnormalizer.AppBundlePathNormalizer().normalize(page);
    return await (0, _loadentrypoint.loadEntrypoint)("app-route", {
        VAR_USERLAND: resolvedPagePath,
        VAR_DEFINITION_PAGE: page,
        VAR_DEFINITION_PATHNAME: pathname,
        VAR_DEFINITION_FILENAME: filename,
        VAR_DEFINITION_BUNDLE_PATH: bundlePath,
        VAR_RESOLVED_PAGE_PATH: resolvedPagePath,
        VAR_ORIGINAL_PATHNAME: page
    }, {
        nextConfigOutput: JSON.stringify(nextConfigOutput)
    });
}
const normalizeParallelKey = (key)=>key.startsWith("@") ? key.slice(1) : key;
const isDirectory = async (pathname)=>{
    try {
        const stat = await _fs.promises.stat(pathname);
        return stat.isDirectory();
    } catch (err) {
        return false;
    }
};
async function createTreeCodeFromPath(pagePath, { page , resolveDir , resolver , resolveParallelSegments , metadataResolver , pageExtensions , basePath  }) {
    const splittedPath = pagePath.split(/[\\/]/);
    const appDirPrefix = splittedPath[0];
    const pages = [];
    const isNotFoundRoute = page === "/_not-found";
    let rootLayout;
    let globalError;
    async function resolveAdjacentParallelSegments(segmentPath) {
        const absoluteSegmentPath = await resolveDir(`${appDirPrefix}${segmentPath}`);
        if (!absoluteSegmentPath) {
            return [];
        }
        const segmentIsDirectory = await isDirectory(absoluteSegmentPath);
        if (!segmentIsDirectory) {
            return [];
        }
        // We need to resolve all parallel routes in this level.
        const files = await _fs.promises.opendir(absoluteSegmentPath);
        const parallelSegments = [
            "children"
        ];
        for await (const dirent of files){
            // Make sure name starts with "@" and is a directory.
            if (dirent.isDirectory() && dirent.name.charCodeAt(0) === 64) {
                parallelSegments.push(dirent.name);
            }
        }
        return parallelSegments;
    }
    async function createSubtreePropsFromSegmentPath(segments) {
        const segmentPath = segments.join("/");
        // Existing tree are the children of the current segment
        const props = {};
        // Root layer could be 1st layer of normal routes
        const isRootLayer = segments.length === 0;
        const isRootLayoutOrRootPage = segments.length <= 1;
        // We need to resolve all parallel routes in this level.
        const parallelSegments = [];
        if (isRootLayer) {
            parallelSegments.push([
                "children",
                ""
            ]);
        } else {
            parallelSegments.push(...resolveParallelSegments(segmentPath));
        }
        let metadata = null;
        const routerDirPath = `${appDirPrefix}${segmentPath}`;
        const resolvedRouteDir = await resolveDir(routerDirPath);
        if (resolvedRouteDir) {
            metadata = await (0, _discover.createStaticMetadataFromRoute)(resolvedRouteDir, {
                basePath,
                segment: segmentPath,
                metadataResolver,
                isRootLayoutOrRootPage,
                pageExtensions
            });
        }
        for (const [parallelKey, parallelSegment] of parallelSegments){
            if (parallelSegment === PAGE_SEGMENT) {
                const matchedPagePath = `${appDirPrefix}${segmentPath}${parallelKey === "children" ? "" : `/${parallelKey}`}/page`;
                const resolvedPagePath = await resolver(matchedPagePath);
                if (resolvedPagePath) pages.push(resolvedPagePath);
                // Use '' for segment as it's the page. There can't be a segment called '' so this is the safest way to add it.
                props[normalizeParallelKey(parallelKey)] = `['__PAGE__', {}, {
          page: [() => import(/* webpackMode: "eager" */ ${JSON.stringify(resolvedPagePath)}), ${JSON.stringify(resolvedPagePath)}],
          ${(0, _discover.createMetadataExportsCode)(metadata)}
        }]`;
                continue;
            }
            const subSegmentPath = [
                ...segments
            ];
            if (parallelKey !== "children") {
                subSegmentPath.push(parallelKey);
            }
            const normalizedParallelSegments = Array.isArray(parallelSegment) ? parallelSegment.slice(0, 1) : [
                parallelSegment
            ];
            subSegmentPath.push(...normalizedParallelSegments.filter((segment)=>segment !== PAGE_SEGMENT && segment !== PARALLEL_CHILDREN_SEGMENT));
            const { treeCode: pageSubtreeCode  } = await createSubtreePropsFromSegmentPath(subSegmentPath);
            const parallelSegmentPath = subSegmentPath.join("/");
            // `page` is not included here as it's added above.
            const filePaths = await Promise.all(Object.values(FILE_TYPES).map(async (file)=>{
                return [
                    file,
                    await resolver(`${appDirPrefix}${// TODO-APP: parallelSegmentPath sometimes ends in `/` but sometimes it doesn't. This should be consistent.
                    parallelSegmentPath.endsWith("/") ? parallelSegmentPath : parallelSegmentPath + "/"}${file}`)
                ];
            }));
            const definedFilePaths = filePaths.filter(([, filePath])=>filePath !== undefined);
            // Add default not found error as root not found if not present
            const hasRootNotFound = definedFilePaths.some(([type])=>type === "not-found");
            // If the first layer is a group route, we treat it as root layer
            const isFirstLayerGroupRoute = segments.length === 1 && subSegmentPath.filter((seg)=>isGroupSegment(seg)).length === 1;
            if ((isRootLayer || isFirstLayerGroupRoute) && !hasRootNotFound) {
                definedFilePaths.push([
                    "not-found",
                    defaultNotFoundPath
                ]);
            }
            if (!rootLayout) {
                var _definedFilePaths_find;
                const layoutPath = (_definedFilePaths_find = definedFilePaths.find(([type])=>type === "layout")) == null ? void 0 : _definedFilePaths_find[1];
                rootLayout = layoutPath;
                if (layoutPath) {
                    globalError = await resolver(`${_path.default.dirname(layoutPath)}/${GLOBAL_ERROR_FILE_TYPE}`);
                }
            }
            let parallelSegmentKey = Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment;
            parallelSegmentKey = parallelSegmentKey === PARALLEL_CHILDREN_SEGMENT ? "children" : parallelSegmentKey;
            const normalizedParallelKey = normalizeParallelKey(parallelKey);
            let subtreeCode = pageSubtreeCode;
            // If it's root not found page, set not-found boundary as children page
            if (isNotFoundRoute && normalizedParallelKey === "children") {
                var _definedFilePaths_find1;
                const notFoundPath = ((_definedFilePaths_find1 = definedFilePaths.find(([type])=>type === "not-found")) == null ? void 0 : _definedFilePaths_find1[1]) ?? defaultNotFoundPath;
                subtreeCode = `{
          children: ['__PAGE__', {}, {
            page: [
              () => import(/* webpackMode: "eager" */ ${JSON.stringify(notFoundPath)}),
              ${JSON.stringify(notFoundPath)}
            ]
          }]
        }`;
            }
            const componentsCode = `{
        ${definedFilePaths.map(([file, filePath])=>{
                return `'${file}': [() => import(/* webpackMode: "eager" */ ${JSON.stringify(filePath)}), ${JSON.stringify(filePath)}],`;
            }).join("\n")}
        ${(0, _discover.createMetadataExportsCode)(metadata)}
      }`;
            props[normalizedParallelKey] = `[
        '${parallelSegmentKey}',
        ${subtreeCode},
        ${componentsCode}
      ]`;
        }
        const adjacentParallelSegments = await resolveAdjacentParallelSegments(segmentPath);
        for (const adjacentParallelSegment of adjacentParallelSegments){
            if (!props[normalizeParallelKey(adjacentParallelSegment)]) {
                const actualSegment = adjacentParallelSegment === "children" ? "" : adjacentParallelSegment;
                const defaultPath = await resolver(`${appDirPrefix}${segmentPath}/${actualSegment}/default`) ?? "next/dist/client/components/parallel-route-default";
                props[normalizeParallelKey(adjacentParallelSegment)] = `[
          '__DEFAULT__',
          {},
          {
            defaultPage: [() => import(/* webpackMode: "eager" */ ${JSON.stringify(defaultPath)}), ${JSON.stringify(defaultPath)}],
          }
        ]`;
            }
        }
        return {
            treeCode: `{
        ${Object.entries(props).map(([key, value])=>`${key}: ${value}`).join(",\n")}
      }`
        };
    }
    const { treeCode  } = await createSubtreePropsFromSegmentPath([]);
    return {
        treeCode: `${treeCode}.children;`,
        pages: `${JSON.stringify(pages)};`,
        rootLayout,
        globalError
    };
}
function createAbsolutePath(appDir, pathToTurnAbsolute) {
    return pathToTurnAbsolute// Replace all POSIX path separators with the current OS path separator
    .replace(/\//g, _path.default.sep).replace(/^private-next-app-dir/, appDir);
}
const nextAppLoader = async function nextAppLoader() {
    const loaderOptions = this.getOptions();
    const { name , appDir , appPaths , pagePath , pageExtensions , rootDir , tsconfigPath , isDev , nextConfigOutput , preferredRegion , basePath , middlewareConfig: middlewareConfigBase64  } = loaderOptions;
    const buildInfo = (0, _getmodulebuildinfo.getModuleBuildInfo)(this._module);
    const page = name.replace(/^app/, "");
    const middlewareConfig = JSON.parse(Buffer.from(middlewareConfigBase64, "base64").toString());
    buildInfo.route = {
        page,
        absolutePagePath: createAbsolutePath(appDir, pagePath),
        preferredRegion,
        middlewareConfig
    };
    const extensions = pageExtensions.map((extension)=>`.${extension}`);
    const normalizedAppPaths = typeof appPaths === "string" ? [
        appPaths
    ] : appPaths || [];
    const resolveParallelSegments = (pathname)=>{
        const matched = {};
        let existingChildrenPath;
        for (const appPath of normalizedAppPaths){
            if (appPath.startsWith(pathname + "/")) {
                const rest = appPath.slice(pathname.length + 1).split("/");
                // It is the actual page, mark it specially.
                if (rest.length === 1 && rest[0] === "page") {
                    existingChildrenPath = appPath;
                    matched.children = PAGE_SEGMENT;
                    continue;
                }
                const isParallelRoute = rest[0].startsWith("@");
                if (isParallelRoute) {
                    if (rest.length === 2 && rest[1] === "page") {
                        // matched will be an empty object in case the parallel route is at a path with no existing page
                        // in which case, we need to mark it as a regular page segment
                        matched[rest[0]] = Object.keys(matched).length ? [
                            PAGE_SEGMENT
                        ] : PAGE_SEGMENT;
                        continue;
                    }
                    // we insert a special marker in order to also process layout/etc files at the slot level
                    matched[rest[0]] = [
                        PARALLEL_CHILDREN_SEGMENT,
                        ...rest.slice(1)
                    ];
                    continue;
                }
                // avoid clobbering existing page segments
                // if it's a valid parallel segment, the `children` property will be set appropriately
                if (existingChildrenPath && matched.children !== rest[0]) {
                    throw new Error(`You cannot have two parallel pages that resolve to the same path. Please check ${existingChildrenPath} and ${appPath}. Refer to the route group docs for more information: https://nextjs.org/docs/app/building-your-application/routing/route-groups`);
                }
                existingChildrenPath = appPath;
                matched.children = rest[0];
            }
        }
        return Object.entries(matched);
    };
    const resolveDir = (pathToResolve)=>{
        return createAbsolutePath(appDir, pathToResolve);
    };
    const resolveAppRoute = (pathToResolve)=>{
        return createAbsolutePath(appDir, pathToResolve);
    };
    // Cached checker to see if a file exists in a given directory.
    // This can be more efficient than checking them with `fs.stat` one by one
    // because all the thousands of files are likely in a few possible directories.
    // Note that it should only be cached for this compilation, not globally.
    const filesInDir = new Map();
    const fileExistsInDirectory = async (dirname, fileName)=>{
        const existingFiles = filesInDir.get(dirname);
        if (existingFiles) {
            return existingFiles.has(fileName);
        }
        try {
            const files = await _fs.promises.readdir(dirname, {
                withFileTypes: true
            });
            const fileNames = new Set();
            for (const file of files){
                if (file.isFile()) {
                    fileNames.add(file.name);
                }
            }
            filesInDir.set(dirname, fileNames);
            return fileNames.has(fileName);
        } catch (err) {
            return false;
        }
    };
    const resolver = async (pathname)=>{
        const absolutePath = createAbsolutePath(appDir, pathname);
        const filenameIndex = absolutePath.lastIndexOf(_path.default.sep);
        const dirname = absolutePath.slice(0, filenameIndex);
        const filename = absolutePath.slice(filenameIndex + 1);
        let result;
        for (const ext of extensions){
            const absolutePathWithExtension = `${absolutePath}${ext}`;
            if (!result && await fileExistsInDirectory(dirname, `${filename}${ext}`)) {
                result = absolutePathWithExtension;
            }
            // Call `addMissingDependency` for all files even if they didn't match,
            // because they might be added or removed during development.
            this.addMissingDependency(absolutePathWithExtension);
        }
        return result;
    };
    const metadataResolver = async (dirname, filename, exts)=>{
        const absoluteDir = createAbsolutePath(appDir, dirname);
        let result;
        for (const ext of exts){
            // Compared to `resolver` above the exts do not have the `.` included already, so it's added here.
            const filenameWithExt = `${filename}.${ext}`;
            const absolutePathWithExtension = `${absoluteDir}${_path.default.sep}${filenameWithExt}`;
            if (!result && await fileExistsInDirectory(dirname, filenameWithExt)) {
                result = absolutePathWithExtension;
            }
            // Call `addMissingDependency` for all files even if they didn't match,
            // because they might be added or removed during development.
            this.addMissingDependency(absolutePathWithExtension);
        }
        return result;
    };
    if ((0, _isapprouteroute.isAppRouteRoute)(name)) {
        return createAppRouteCode({
            // TODO: investigate if the local `page` is the same as the loaderOptions.page
            page: loaderOptions.page,
            name,
            pagePath,
            resolveAppRoute,
            pageExtensions,
            nextConfigOutput
        });
    }
    let treeCodeResult = await createTreeCodeFromPath(pagePath, {
        page,
        resolveDir,
        resolver,
        metadataResolver,
        resolveParallelSegments,
        loaderContext: this,
        pageExtensions,
        basePath
    });
    if (!treeCodeResult.rootLayout) {
        if (!isDev) {
            // If we're building and missing a root layout, exit the build
            _log.error(`${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. To fix this error, make sure every page has a root layout.`);
            process.exit(1);
        } else {
            // In dev we'll try to create a root layout
            const [createdRootLayout, rootLayoutPath] = await (0, _verifyRootLayout.verifyRootLayout)({
                appDir: appDir,
                dir: rootDir,
                tsconfigPath: tsconfigPath,
                pagePath,
                pageExtensions
            });
            if (!createdRootLayout) {
                let message = `${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. `;
                if (rootLayoutPath) {
                    var _this__compiler;
                    message += `We tried to create ${_chalk.default.bold(_path.default.relative(((_this__compiler = this._compiler) == null ? void 0 : _this__compiler.context) ?? "", rootLayoutPath))} for you but something went wrong.`;
                } else {
                    message += "To fix this error, make sure every page has a root layout.";
                }
                throw new Error(message);
            }
            // Clear fs cache, get the new result with the created root layout.
            filesInDir.clear();
            treeCodeResult = await createTreeCodeFromPath(pagePath, {
                page,
                resolveDir,
                resolver,
                metadataResolver,
                resolveParallelSegments,
                loaderContext: this,
                pageExtensions,
                basePath
            });
        }
    }
    const pathname = new _apppathnamenormalizer.AppPathnameNormalizer().normalize(page);
    // Prefer to modify next/src/server/app-render/entry-base.ts since this is shared with Turbopack.
    // Any changes to this code should be reflected in Turbopack's app_source.rs and/or app-renderer.tsx as well.
    return await (0, _loadentrypoint.loadEntrypoint)("app-page", {
        VAR_DEFINITION_PAGE: page,
        VAR_DEFINITION_PATHNAME: pathname,
        VAR_MODULE_GLOBAL_ERROR: treeCodeResult.globalError ? treeCodeResult.globalError : "next/dist/client/components/error-boundary",
        VAR_ORIGINAL_PATHNAME: page
    }, {
        tree: treeCodeResult.treeCode,
        pages: treeCodeResult.pages,
        __next_app_require__: "__webpack_require__",
        __next_app_load_chunk__: "() => Promise.resolve()"
    });
};
const _default = nextAppLoader;

//# sourceMappingURL=next-app-loader.js.map