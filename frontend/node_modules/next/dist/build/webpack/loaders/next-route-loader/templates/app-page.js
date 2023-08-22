"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    tree: null,
    pages: null,
    GlobalError: null,
    originalPathname: null,
    __next_app__: null,
    routeModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    tree: function() {
        return tree;
    },
    pages: function() {
        return pages;
    },
    GlobalError: function() {
        return _VAR_MODULE_GLOBAL_ERROR.default;
    },
    originalPathname: function() {
        return originalPathname;
    },
    __next_app__: function() {
        return __next_app__;
    },
    routeModule: function() {
        return routeModule;
    }
});
0 && __export(require("../../../../../server/app-render/entry-base"));
const _module = /*#__PURE__*/ _interop_require_wildcard(require("next/dist/server/future/route-modules/app-page/module"));
const _routekind = require("../../../../../server/future/route-kind");
const _VAR_MODULE_GLOBAL_ERROR = /*#__PURE__*/ _interop_require_default(require("VAR_MODULE_GLOBAL_ERROR"));
_export_star(require("../../../../../server/app-render/entry-base"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
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
const AppPageRouteModule = _module.AppPageRouteModule;
const originalPathname = "VAR_ORIGINAL_PATHNAME";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
const routeModule = new AppPageRouteModule({
    definition: {
        kind: _routekind.RouteKind.APP_PAGE,
        page: "VAR_DEFINITION_PAGE",
        pathname: "VAR_DEFINITION_PATHNAME",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map