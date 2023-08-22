/*
Copyright (c) 2021 The swc Project Developers

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without
limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _vm = /*#__PURE__*/ _interop_require_default(require("vm"));
const _index = require("./index");
const _options = require("./options");
const _jestdocblock = /*#__PURE__*/ _interop_require_wildcard(require("next/dist/compiled/jest-docblock"));
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
// Jest use the `vm` [Module API](https://nodejs.org/api/vm.html#vm_class_vm_module) for ESM.
// see https://github.com/facebook/jest/issues/9430
const isSupportEsm = "Module" in _vm.default;
function getJestConfig(jestConfig) {
    return "config" in jestConfig ? jestConfig.config : jestConfig;
}
function isEsm(isEsmProject, filename, jestConfig) {
    var _jestConfig_extensionsToTreatAsEsm;
    return /\.jsx?$/.test(filename) && isEsmProject || ((_jestConfig_extensionsToTreatAsEsm = jestConfig.extensionsToTreatAsEsm) == null ? void 0 : _jestConfig_extensionsToTreatAsEsm.some((ext)=>filename.endsWith(ext)));
}
function getTestEnvironment(src, jestConfig) {
    const docblockPragmas = _jestdocblock.parse(_jestdocblock.extract(src));
    const pragma = docblockPragmas["jest-environment"];
    const environment = (Array.isArray(pragma) ? pragma[0] : pragma) ?? jestConfig.testEnvironment;
    return environment;
}
const createTransformer = (inputOptions)=>{
    return {
        process (src, filename, jestOptions) {
            const jestConfig = getJestConfig(jestOptions);
            const testEnvironment = getTestEnvironment(src, jestConfig);
            const swcTransformOpts = (0, _options.getJestSWCOptions)({
                // When target is node it's similar to the server option set in SWC.
                isServer: testEnvironment === "node" || testEnvironment.includes("jest-environment-node"),
                filename,
                jsConfig: inputOptions == null ? void 0 : inputOptions.jsConfig,
                resolvedBaseUrl: inputOptions == null ? void 0 : inputOptions.resolvedBaseUrl,
                pagesDir: inputOptions == null ? void 0 : inputOptions.pagesDir,
                hasServerComponents: inputOptions == null ? void 0 : inputOptions.hasServerComponents,
                modularizeImports: inputOptions == null ? void 0 : inputOptions.modularizeImports,
                swcPlugins: inputOptions == null ? void 0 : inputOptions.swcPlugins,
                compilerOptions: inputOptions == null ? void 0 : inputOptions.compilerOptions,
                esm: isSupportEsm && isEsm(Boolean(inputOptions == null ? void 0 : inputOptions.isEsmProject), filename, jestConfig)
            });
            return (0, _index.transformSync)(src, {
                ...swcTransformOpts,
                filename
            });
        }
    };
};
module.exports = {
    createTransformer
};

//# sourceMappingURL=jest-transformer.js.map