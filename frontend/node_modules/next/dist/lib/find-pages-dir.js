"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    existsSync: null,
    findDir: null,
    findPagesDir: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    existsSync: function() {
        return existsSync;
    },
    findDir: function() {
        return findDir;
    },
    findPagesDir: function() {
        return findPagesDir;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const existsSync = (f)=>{
    try {
        _fs.default.accessSync(f, _fs.default.constants.F_OK);
        return true;
    } catch (_) {
        return false;
    }
};
function findDir(dir, name) {
    // prioritize ./${name} over ./src/${name}
    let curDir = _path.default.join(dir, name);
    if (existsSync(curDir)) return curDir;
    curDir = _path.default.join(dir, "src", name);
    if (existsSync(curDir)) return curDir;
    return null;
}
function findPagesDir(dir, isAppDirEnabled) {
    const pagesDir = findDir(dir, "pages") || undefined;
    const appDir = findDir(dir, "app") || undefined;
    if (isAppDirEnabled && appDir == null && pagesDir == null) {
        throw new Error("> Couldn't find any `pages` or `app` directory. Please create one under the project root");
    }
    if (!isAppDirEnabled) {
        if (pagesDir == null) {
            throw new Error("> Couldn't find a `pages` directory. Please create one under the project root");
        }
    }
    return {
        pagesDir,
        appDir: isAppDirEnabled ? appDir : undefined
    };
}

//# sourceMappingURL=find-pages-dir.js.map