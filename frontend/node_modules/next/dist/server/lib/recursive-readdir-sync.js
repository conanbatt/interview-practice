"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recursiveReadDirSync", {
    enumerable: true,
    get: function() {
        return recursiveReadDirSync;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = require("path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function recursiveReadDirSync(/** The directory to read */ dir, /** This doesn't have to be provided, it's used for the recursion */ arr = [], /** Used to remove the initial path suffix and leave only the relative, faster than path.relative. */ rootDirLength = dir.length) {
    // Use opendirSync for better memory usage
    const result = _fs.default.opendirSync(dir);
    let part;
    while(part = result.readSync()){
        const absolutePath = dir + _path.sep + part.name;
        if (part.isDirectory()) {
            recursiveReadDirSync(absolutePath, arr, rootDirLength);
        } else {
            arr.push(absolutePath.slice(rootDirLength));
        }
    }
    result.closeSync();
    return arr;
}

//# sourceMappingURL=recursive-readdir-sync.js.map