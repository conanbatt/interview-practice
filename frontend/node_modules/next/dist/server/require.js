"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getMaybePagePath: null,
    getPagePath: null,
    requirePage: null,
    requireFontManifest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getMaybePagePath: function() {
        return getMaybePagePath;
    },
    getPagePath: function() {
        return getPagePath;
    },
    requirePage: function() {
        return requirePage;
    },
    requireFontManifest: function() {
        return requireFontManifest;
    }
});
const _path = require("path");
const _constants = require("../shared/lib/constants");
const _normalizelocalepath = require("../shared/lib/i18n/normalize-locale-path");
const _normalizepagepath = require("../shared/lib/page-path/normalize-page-path");
const _denormalizepagepath = require("../shared/lib/page-path/denormalize-page-path");
const _utils = require("../shared/lib/utils");
const _lrucache = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/lru-cache"));
const _loadmanifest = require("./load-manifest");
const _fs = require("fs");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const isDev = process.env.NODE_ENV === "development";
const pagePathCache = isDev ? {
    get: (_key)=>{
        return null;
    },
    set: ()=>{},
    has: ()=>false
} : new _lrucache.default({
    max: 1000
});
function getMaybePagePath(page, distDir, locales, isAppPath) {
    const cacheKey = `${page}:${distDir}:${locales}:${isAppPath}`;
    if (pagePathCache.has(cacheKey)) {
        return pagePathCache.get(cacheKey);
    }
    const serverBuildPath = (0, _path.join)(distDir, _constants.SERVER_DIRECTORY);
    let appPathsManifest;
    if (isAppPath) {
        appPathsManifest = (0, _loadmanifest.loadManifest)((0, _path.join)(serverBuildPath, _constants.APP_PATHS_MANIFEST), !isDev);
    }
    const pagesManifest = (0, _loadmanifest.loadManifest)((0, _path.join)(serverBuildPath, _constants.PAGES_MANIFEST), !isDev);
    try {
        page = (0, _denormalizepagepath.denormalizePagePath)((0, _normalizepagepath.normalizePagePath)(page));
    } catch (err) {
        console.error(err);
        throw new _utils.PageNotFoundError(page);
    }
    const checkManifest = (manifest)=>{
        let curPath = manifest[page];
        if (!manifest[curPath] && locales) {
            const manifestNoLocales = {};
            for (const key of Object.keys(manifest)){
                manifestNoLocales[(0, _normalizelocalepath.normalizeLocalePath)(key, locales).pathname] = pagesManifest[key];
            }
            curPath = manifestNoLocales[page];
        }
        return curPath;
    };
    let pagePath;
    if (appPathsManifest) {
        pagePath = checkManifest(appPathsManifest);
    }
    if (!pagePath) {
        pagePath = checkManifest(pagesManifest);
    }
    if (!pagePath) {
        pagePathCache.set(cacheKey, null);
        return null;
    }
    const path = (0, _path.join)(serverBuildPath, pagePath);
    pagePathCache.set(cacheKey, path);
    return path;
}
function getPagePath(page, distDir, locales, isAppPath) {
    const pagePath = getMaybePagePath(page, distDir, locales, isAppPath);
    if (!pagePath) {
        throw new _utils.PageNotFoundError(page);
    }
    return pagePath;
}
function requirePage(page, distDir, isAppPath) {
    const pagePath = getPagePath(page, distDir, undefined, isAppPath);
    if (pagePath.endsWith(".html")) {
        return _fs.promises.readFile(pagePath, "utf8").catch((err)=>{
            throw new _utils.MissingStaticPage(page, err.message);
        });
    }
    return process.env.NEXT_MINIMAL ? __non_webpack_require__(pagePath) : require(pagePath);
}
function requireFontManifest(distDir) {
    const serverBuildPath = (0, _path.join)(distDir, _constants.SERVER_DIRECTORY);
    const fontManifest = (0, _loadmanifest.loadManifest)((0, _path.join)(serverBuildPath, _constants.FONT_MANIFEST));
    return fontManifest;
}

//# sourceMappingURL=require.js.map