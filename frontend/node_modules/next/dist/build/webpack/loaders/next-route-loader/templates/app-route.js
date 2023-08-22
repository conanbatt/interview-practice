"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    routeModule: null,
    requestAsyncStorage: null,
    staticGenerationAsyncStorage: null,
    serverHooks: null,
    headerHooks: null,
    staticGenerationBailout: null,
    originalPathname: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    routeModule: function() {
        return routeModule;
    },
    requestAsyncStorage: function() {
        return requestAsyncStorage;
    },
    staticGenerationAsyncStorage: function() {
        return staticGenerationAsyncStorage;
    },
    serverHooks: function() {
        return serverHooks;
    },
    headerHooks: function() {
        return headerHooks;
    },
    staticGenerationBailout: function() {
        return staticGenerationBailout;
    },
    originalPathname: function() {
        return originalPathname;
    }
});
require("../../../../../server/node-polyfill-headers");
const _module = /*#__PURE__*/ _interop_require_wildcard(require("next/dist/server/future/route-modules/app-route/module"));
const _routekind = require("../../../../../server/future/route-kind");
const _VAR_USERLAND = /*#__PURE__*/ _interop_require_wildcard(require("VAR_USERLAND"));
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
const AppRouteRouteModule = _module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
// INJECT:nextConfigOutput
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: _routekind.RouteKind.APP_ROUTE,
        page: "VAR_DEFINITION_PAGE",
        pathname: "VAR_DEFINITION_PATHNAME",
        filename: "VAR_DEFINITION_FILENAME",
        bundlePath: "VAR_DEFINITION_BUNDLE_PATH"
    },
    resolvedPagePath: "VAR_RESOLVED_PAGE_PATH",
    nextConfigOutput,
    userland: _VAR_USERLAND
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "VAR_ORIGINAL_PATHNAME";

//# sourceMappingURL=app-route.js.map