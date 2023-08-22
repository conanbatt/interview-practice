// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const addChunkSuffix = (getOriginalChunk)=>(chunkId)=>{
        return getOriginalChunk(chunkId) + ("" + (process.env.NEXT_DEPLOYMENT_ID ? "?dpl=" + process.env.NEXT_DEPLOYMENT_ID : ""));
    };
// ensure dynamic imports have deployment id added if enabled
const getChunkScriptFilename = __webpack_require__.u;
// eslint-disable-next-line no-undef
__webpack_require__.u = addChunkSuffix(getChunkScriptFilename);
// eslint-disable-next-line no-undef
const getChunkCssFilename = __webpack_require__.k;
// eslint-disable-next-line no-undef
__webpack_require__.k = addChunkSuffix(getChunkCssFilename);
// eslint-disable-next-line no-undef
const getMiniCssFilename = __webpack_require__.miniCssF;
// eslint-disable-next-line no-undef
__webpack_require__.miniCssF = addChunkSuffix(getMiniCssFilename);
self.__next_require__ = __webpack_require__;
self.__next_set_public_path__ = (path)=>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __webpack_public_path__ = path;
};

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=webpack.js.map