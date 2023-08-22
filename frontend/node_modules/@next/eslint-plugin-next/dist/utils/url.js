"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    normalizeURL: function() {
        return normalizeURL;
    },
    getUrlFromPagesDirectories: function() {
        return getUrlFromPagesDirectories;
    },
    execOnce: function() {
        return execOnce;
    }
});
var _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
var _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
// Cache for fs.readdirSync lookup.
// Prevent multiple blocking IO requests that have already been calculated.
var fsReadDirSyncCache = {};
/**
 * Recursively parse directory for page URLs.
 */ function parseUrlForPages(urlprefix, directory) {
    var _fsReadDirSyncCache, _directory;
    var _;
    (_ = (_fsReadDirSyncCache = fsReadDirSyncCache)[_directory = directory]) !== null && _ !== void 0 ? _ : _fsReadDirSyncCache[_directory] = _fs.readdirSync(directory, {
        withFileTypes: true
    });
    var res = [];
    fsReadDirSyncCache[directory].forEach(function(dirent) {
        // TODO: this should account for all page extensions
        // not just js(x) and ts(x)
        if (/(\.(j|t)sx?)$/.test(dirent.name)) {
            if (/^index(\.(j|t)sx?)$/.test(dirent.name)) {
                res.push("".concat(urlprefix).concat(dirent.name.replace(/^index(\.(j|t)sx?)$/, "")));
            }
            res.push("".concat(urlprefix).concat(dirent.name.replace(/(\.(j|t)sx?)$/, "")));
        } else {
            var dirPath = _path.join(directory, dirent.name);
            if (dirent.isDirectory() && !dirent.isSymbolicLink()) {
                var _res;
                (_res = res).push.apply(_res, _to_consumable_array(parseUrlForPages(urlprefix + dirent.name + "/", dirPath)));
            }
        }
    });
    return res;
}
function normalizeURL(url) {
    if (!url) {
        return;
    }
    url = url.split("?")[0];
    url = url.split("#")[0];
    url = url = url.replace(/(\/index\.html)$/, "/");
    // Empty URLs should not be trailed with `/`, e.g. `#heading`
    if (url === "") {
        return url;
    }
    url = url.endsWith("/") ? url : url + "/";
    return url;
}
function getUrlFromPagesDirectories(urlPrefix, directories) {
    return Array.from(// De-duplicate similar pages across multiple directories.
    new Set(directories.flatMap(function(directory) {
        return parseUrlForPages(urlPrefix, directory);
    }).map(// Since the URLs are normalized we add `^` and `$` to the RegExp to make sure they match exactly.
    function(url) {
        return "^".concat(normalizeURL(url), "$");
    }))).map(function(urlReg) {
        urlReg = urlReg.replace(/\[.*\]/g, "((?!.+?\\..+?).*?)");
        return new RegExp(urlReg);
    });
}
function execOnce(fn) {
    var used = false;
    var result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn.apply(void 0, _to_consumable_array(args));
        }
        return result;
    };
}
