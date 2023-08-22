"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loadStaticPaths", {
    enumerable: true,
    get: function() {
        return loadStaticPaths;
    }
});
require("../require-hook");
require("../node-polyfill-fetch");
require("../node-environment");
const _utils = require("../../build/utils");
const _loadcomponents = require("../load-components");
const _setuphttpagentenv = require("../setup-http-agent-env");
const _hooksservercontext = /*#__PURE__*/ _interop_require_wildcard(require("../../client/components/hooks-server-context"));
const _staticgenerationasyncstorage = require("../../client/components/static-generation-async-storage");
const _module = require("../future/route-modules/app-route/module");
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
async function loadStaticPaths({ distDir , pathname , config , httpAgentOptions , locales , defaultLocale , isAppPath , originalAppPath , isrFlushToDisk , fetchCacheKeyPrefix , maxMemoryCacheSize , requestHeaders , incrementalCacheHandlerPath  }) {
    // update work memory runtime-config
    require("../../shared/lib/runtime-config").setConfig(config);
    (0, _setuphttpagentenv.setHttpClientAndAgentOptions)({
        httpAgentOptions
    });
    const components = await (0, _loadcomponents.loadComponents)({
        distDir,
        pathname: originalAppPath || pathname,
        isAppPath: !!isAppPath
    });
    if (!components.getStaticPaths && !isAppPath) {
        // we shouldn't get to this point since the worker should
        // only be called for SSG pages with getStaticPaths
        throw new Error(`Invariant: failed to load page with getStaticPaths for ${pathname}`);
    }
    if (isAppPath) {
        const { routeModule  } = components;
        const generateParams = routeModule && _module.AppRouteRouteModule.is(routeModule) ? [
            {
                config: {
                    revalidate: routeModule.userland.revalidate,
                    dynamic: routeModule.userland.dynamic,
                    dynamicParams: routeModule.userland.dynamicParams
                },
                generateStaticParams: routeModule.userland.generateStaticParams,
                segmentPath: pathname
            }
        ] : await (0, _utils.collectGenerateParams)(components.ComponentMod.tree);
        return await (0, _utils.buildAppStaticPaths)({
            page: pathname,
            generateParams,
            configFileName: config.configFileName,
            distDir,
            requestHeaders,
            incrementalCacheHandlerPath,
            serverHooks: _hooksservercontext,
            staticGenerationAsyncStorage: _staticgenerationasyncstorage.staticGenerationAsyncStorage,
            isrFlushToDisk,
            fetchCacheKeyPrefix,
            maxMemoryCacheSize
        });
    }
    return await (0, _utils.buildStaticPaths)({
        page: pathname,
        getStaticPaths: components.getStaticPaths,
        configFileName: config.configFileName,
        locales,
        defaultLocale
    });
}

//# sourceMappingURL=static-paths-worker.js.map