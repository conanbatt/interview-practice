// @ts-ignore this need to be imported from next/dist to be external
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getStaticProps: null,
    getStaticPaths: null,
    getServerSideProps: null,
    config: null,
    reportWebVitals: null,
    unstable_getStaticProps: null,
    unstable_getStaticPaths: null,
    unstable_getStaticParams: null,
    unstable_getServerProps: null,
    unstable_getServerSideProps: null,
    routeModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    // Re-export the component (should be the default export).
    default: function() {
        return _default;
    },
    getStaticProps: function() {
        return getStaticProps;
    },
    getStaticPaths: function() {
        return getStaticPaths;
    },
    getServerSideProps: function() {
        return getServerSideProps;
    },
    config: function() {
        return config;
    },
    reportWebVitals: function() {
        return reportWebVitals;
    },
    unstable_getStaticProps: function() {
        return unstable_getStaticProps;
    },
    unstable_getStaticPaths: function() {
        return unstable_getStaticPaths;
    },
    unstable_getStaticParams: function() {
        return unstable_getStaticParams;
    },
    unstable_getServerProps: function() {
        return unstable_getServerProps;
    },
    unstable_getServerSideProps: function() {
        return unstable_getServerSideProps;
    },
    routeModule: function() {
        return routeModule;
    }
});
const _module = /*#__PURE__*/ _interop_require_wildcard(require("next/dist/server/future/route-modules/pages/module"));
const _routekind = require("../../../../../server/future/route-kind");
const _helpers = require("../helpers");
const _VAR_MODULE_DOCUMENT = /*#__PURE__*/ _interop_require_default(require("VAR_MODULE_DOCUMENT"));
const _VAR_MODULE_APP = /*#__PURE__*/ _interop_require_default(require("VAR_MODULE_APP"));
const _VAR_USERLAND = /*#__PURE__*/ _interop_require_wildcard(require("VAR_USERLAND"));
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
const PagesRouteModule = _module.PagesRouteModule;
const _default = (0, _helpers.hoist)(_VAR_USERLAND, "default");
const getStaticProps = (0, _helpers.hoist)(_VAR_USERLAND, "getStaticProps");
const getStaticPaths = (0, _helpers.hoist)(_VAR_USERLAND, "getStaticPaths");
const getServerSideProps = (0, _helpers.hoist)(_VAR_USERLAND, "getServerSideProps");
const config = (0, _helpers.hoist)(_VAR_USERLAND, "config");
const reportWebVitals = (0, _helpers.hoist)(_VAR_USERLAND, "reportWebVitals");
const unstable_getStaticProps = (0, _helpers.hoist)(_VAR_USERLAND, "unstable_getStaticProps");
const unstable_getStaticPaths = (0, _helpers.hoist)(_VAR_USERLAND, "unstable_getStaticPaths");
const unstable_getStaticParams = (0, _helpers.hoist)(_VAR_USERLAND, "unstable_getStaticParams");
const unstable_getServerProps = (0, _helpers.hoist)(_VAR_USERLAND, "unstable_getServerProps");
const unstable_getServerSideProps = (0, _helpers.hoist)(_VAR_USERLAND, "unstable_getServerSideProps");
const routeModule = new PagesRouteModule({
    definition: {
        kind: _routekind.RouteKind.PAGES,
        page: "VAR_DEFINITION_PAGE",
        pathname: "VAR_DEFINITION_PATHNAME",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _VAR_MODULE_APP.default,
        Document: _VAR_MODULE_DOCUMENT.default
    },
    userland: _VAR_USERLAND
});

//# sourceMappingURL=pages.js.map