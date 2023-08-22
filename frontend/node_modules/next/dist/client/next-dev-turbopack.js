// TODO: Remove use of `any` type.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ = require("./");
const _fouc = require("./dev/fouc");
require("./setup-hydration-warning");
window.next = {
    version: "" + _.version + "-turbo",
    // router is initialized later so it has to be live-binded
    get router () {
        return _.router;
    },
    emitter: _.emitter
};
self.__next_set_public_path__ = ()=>{};
(0, _.initialize)({
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
    return (0, _.hydrate)({
        beforeRender: _fouc.displayContent
    }).then(()=>{});
}).catch((err)=>{
    console.error("Error was not caught", err);
});

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=next-dev-turbopack.js.map