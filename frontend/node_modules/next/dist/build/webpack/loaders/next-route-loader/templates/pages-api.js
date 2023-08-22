// @ts-ignore this need to be imported from next/dist to be external
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    config: null,
    routeModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    // Re-export the handler (should be the default export).
    default: function() {
        return _default;
    },
    config: function() {
        return config;
    },
    routeModule: function() {
        return routeModule;
    }
});
const _module = /*#__PURE__*/ _interop_require_wildcard(require("next/dist/server/future/route-modules/pages-api/module"));
const _routekind = require("../../../../../server/future/route-kind");
const _helpers = require("../helpers");
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
const PagesAPIRouteModule = _module.PagesAPIRouteModule;
const _default = (0, _helpers.hoist)(_VAR_USERLAND, "default");
const config = (0, _helpers.hoist)(_VAR_USERLAND, "config");
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: _routekind.RouteKind.PAGES_API,
        page: "VAR_DEFINITION_PAGE",
        pathname: "VAR_DEFINITION_PATHNAME",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: _VAR_USERLAND
});

//# sourceMappingURL=pages-api.js.map