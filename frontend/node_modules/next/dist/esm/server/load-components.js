import { BUILD_MANIFEST, REACT_LOADABLE_MANIFEST, CLIENT_REFERENCE_MANIFEST, SERVER_REFERENCE_MANIFEST } from "../shared/lib/constants";
import { join } from "path";
import { requirePage } from "./require";
import { interopDefault } from "../lib/interop-default";
import { getTracer } from "./lib/trace/tracer";
import { LoadComponentsSpan } from "./lib/trace/constants";
import { loadManifest } from "./load-manifest";
async function loadDefaultErrorComponentsImpl(distDir) {
    const Document = interopDefault(require("next/dist/pages/_document"));
    const AppMod = require("next/dist/pages/_app");
    const App = interopDefault(AppMod);
    // Load the compiled route module for this builtin error.
    // TODO: (wyattjoh) replace this with just exporting the route module when the transition is complete
    const ComponentMod = require("./future/route-modules/pages/builtin/_error");
    const Component = ComponentMod.routeModule.userland.default;
    return {
        App,
        Document,
        Component,
        pageConfig: {},
        buildManifest: require(join(distDir, `fallback-${BUILD_MANIFEST}`)),
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
            return loadManifest(manifestPath);
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
            Promise.resolve().then(()=>requirePage("/_document", distDir, false)),
            Promise.resolve().then(()=>requirePage("/_app", distDir, false))
        ]);
    }
    const ComponentMod = await Promise.resolve().then(()=>requirePage(pathname, distDir, isAppPath));
    // Make sure to avoid loading the manifest for Route Handlers
    const hasClientManifest = isAppPath && (pathname.endsWith("/page") || pathname === "/not-found" || pathname === "/_not-found");
    const [buildManifest, reactLoadableManifest, clientReferenceManifest, serverActionsManifest] = await Promise.all([
        loadManifestWithRetries(join(distDir, BUILD_MANIFEST)),
        loadManifestWithRetries(join(distDir, REACT_LOADABLE_MANIFEST)),
        hasClientManifest ? loadJSManifest(join(distDir, "server", "app", pathname.replace(/%5F/g, "_") + "_" + CLIENT_REFERENCE_MANIFEST + ".js"), "__RSC_MANIFEST", pathname.replace(/%5F/g, "_")) : undefined,
        isAppPath ? loadManifestWithRetries(join(distDir, "server", SERVER_REFERENCE_MANIFEST + ".json")).catch(()=>null) : null
    ]);
    const Component = interopDefault(ComponentMod);
    const Document = interopDefault(DocumentMod);
    const App = interopDefault(AppMod);
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
export const loadComponents = getTracer().wrap(LoadComponentsSpan.loadComponents, loadComponentsImpl);
export const loadDefaultErrorComponents = getTracer().wrap(LoadComponentsSpan.loadDefaultErrorComponents, loadDefaultErrorComponentsImpl);

//# sourceMappingURL=load-components.js.map