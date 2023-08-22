// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export { };

//# sourceMappingURL=webpack.js.map