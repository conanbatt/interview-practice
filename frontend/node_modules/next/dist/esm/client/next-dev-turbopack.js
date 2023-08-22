// TODO: Remove use of `any` type.
import { initialize, hydrate, version, router, emitter } from "./";
import { displayContent } from "./dev/fouc";
import "./setup-hydration-warning";
window.next = {
    version: "" + version + "-turbo",
    // router is initialized later so it has to be live-binded
    get router () {
        return router;
    },
    emitter
};
self.__next_set_public_path__ = ()=>{};
initialize({
    // TODO the prop name is confusing as related to webpack
    webpackHMR: {
        onUnrecoverableError () {}
    }
}).then((param)=>{
    let { assetPrefix  } = param;
    // for the page loader
    async function loadPageChunk(chunkData) {
        if (typeof chunkData === "string") {
            const fullPath = assetPrefix + chunkData;
            await __turbopack_load__(fullPath);
        } else {
            let fullChunkData = {
                ...chunkData,
                path: assetPrefix + chunkData.path
            };
            await __turbopack_load__(fullChunkData);
        }
    }
    self.__turbopack_load_page_chunks__ = (page, chunksData)=>{
        const chunkPromises = chunksData.map(loadPageChunk);
        Promise.all(chunkPromises).catch((err)=>console.error("failed to load chunks for page " + page, err));
    };
    return hydrate({
        beforeRender: displayContent
    }).then(()=>{});
}).catch((err)=>{
    console.error("Error was not caught", err);
});

//# sourceMappingURL=next-dev-turbopack.js.map