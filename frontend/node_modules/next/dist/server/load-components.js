"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    loadComponents: null,
    loadDefaultErrorComponents: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    loadComponents: function() {
        return loadComponents;
    },
    loadDefaultErrorComponents: function() {
        return loadDefaultErrorComponents;
    }
});
const _constants = require("../shared/lib/constants");
const _path = require("path");
const _require = require("./require");
const _interopdefault = require("../lib/interop-default");
const _tracer = require("./lib/trace/tracer");
const _constants1 = require("./lib/trace/constants");
const _loadmanifest = require("./load-manifest");
async function loadDefaultErrorComponentsImpl(distDir) {
    const Document = (0, _interopdefault.interopDefault)(require("next/dist/pages/_document"));
    const AppMod = require("next/dist/pages/_app");
    const App = (0, _interopdefault.interopDefault)(AppMod);
    // Load the compiled route module for this builtin error.
    // TODO: (wyattjoh) replace this with just exporting the route module when the transition is complete
    const ComponentMod = require("./future/route-modules/pages/builtin/_error");
    const Component = ComponentMod.routeModule.userland.default;
    return {
        App,
        Document,
        Component,
        pageConfig: {},
        buildManifest: require((0, _path.join)(distDir, `fallback-${_constants.BUILD_MANIFEST}`)),
        reactLoadableManifest: {},
        ComponentMod,
        pathname: "/_error",
        routeModule: ComponentMod.routeModule
    };
}
/**
 * Load manifest file with retries, defaults to 3 attempts.
 */ async function loadManifestWithRetries(manifestPath, attempts = 3) {
    while(true){
        try {
            return (0, _loadmanifest.loadManifest)(manifestPath);
        } catch (err) {
            attempts--;
            if (attempts <= 0) throw err;
            await new Promise((resolve)=>setTimeout(resolve, 100));
        }
    }
}
async function loadJSManifest(manifestPath, name, entryname) {
    process.env.NEXT_MINIMAL ? __non_webpack_require__(manifestPath) : require(manifestPath);
    try {
        return JSON.parse(globalThis[name][entryname]);
    } catch (err) {
        return undefined;
    }
}
async function loadComponentsImpl({ distDir , pathname , isAppPath  }) {
    let DocumentMod = {};
    let AppMod = {};
    if (!isAppPath) {
        [DocumentMod, AppMod] = await Promise.all([
            Promise.resolve().then(()=>(0, _require.requirePage)("/_document", distDir, false)),
            Promise.resolve().then(()=>(0, _require.requirePage)("/_app", distDir, false))
        ]);
    }
    const ComponentMod = await Promise.resolve().then(()=>(0, _require.requirePage)(pathname, distDir, isAppPath));
    // Make sure to avoid loading the manifest for Route Handlers
    const hasClientManifest = isAppPath && (pathname.endsWith("/page") || pathname === "/not-found" || pathname === "/_not-found");
    const [buildManifest, reactLoadableManifest, clientReferenceManifest, serverActionsManifest] = await Promise.all([
        loadManifestWithRetries((0, _path.join)(distDir, _constants.BUILD_MANIFEST)),
        loadManifestWithRetries((0, _path.join)(distDir, _constants.REACT_LOADABLE_MANIFEST)),
        hasClientManifest ? loadJSManifest((0, _path.join)(distDir, "server", "app", pathname.replace(/%5F/g, "_") + "_" + _constants.CLIENT_REFERENCE_MANIFEST + ".js"), "__RSC_MANIFEST", pathname.replace(/%5F/g, "_")) : undefined,
        isAppPath ? loadManifestWithRetries((0, _path.join)(distDir, "server", _constants.SERVER_REFERENCE_MANIFEST + ".json")).catch(()=>null) : null
    ]);
    const Component = (0, _interopdefault.interopDefault)(ComponentMod);
    const Document = (0, _interopdefault.interopDefault)(DocumentMod);
    const App = (0, _interopdefault.interopDefault)(AppMod);
    const { getServerSideProps , getStaticProps , getStaticPaths  } = ComponentMod;
    return {
        App,
        Document,
        Component,
        buildManifest,
        reactLoadableManifest,
        pageConfig: ComponentMod.config || {},
        ComponentMod,
        getServerSideProps,
        getStaticProps,
        getStaticPaths,
        clientReferenceManifest,
        serverActionsManifest,
        isAppPath,
        pathname,
        routeModule: ComponentMod.routeModule
    };
}
const loadComponents = (0, _tracer.getTracer)().wrap(_constants1.LoadComponentsSpan.loadComponents, loadComponentsImpl);
const loadDefaultErrorComponents = (0, _tracer.getTracer)().wrap(_constants1.LoadComponentsSpan.loadDefaultErrorComponents, loadDefaultErrorComponentsImpl);

//# sourceMappingURL=load-components.js.map