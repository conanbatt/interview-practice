// eslint-disable-next-line import/no-extraneous-dependencies
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    defineConfig: null,
    test: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    defineConfig: function() {
        return defineConfig;
    },
    test: function() {
        return test;
    },
    default: function() {
        return _default;
    }
});
0 && __export(require("@playwright/test"));
const _test = /*#__PURE__*/ _interop_require_wildcard(_export_star(require("@playwright/test"), exports));
const _nextworkerfixture = require("./next-worker-fixture");
const _nextfixture = require("./next-fixture");
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
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
function defineConfig(config) {
    return _test.defineConfig(config);
}
const test = _test.test.extend({
    nextOptions: [
        {
            fetchLoopback: false
        },
        {
            option: true
        }
    ],
    _nextWorker: [
        // eslint-disable-next-line no-empty-pattern
        async ({}, use)=>{
            await (0, _nextworkerfixture.applyNextWorkerFixture)(use);
        },
        {
            scope: "worker",
            auto: true
        }
    ],
    next: [
        async ({ nextOptions , _nextWorker , page , extraHTTPHeaders  }, use, testInfo)=>{
            await (0, _nextfixture.applyNextFixture)(use, {
                testInfo,
                nextWorker: _nextWorker,
                page,
                extraHTTPHeaders,
                nextOptions
            });
        },
        {
            auto: true
        }
    ]
});
const _default = test;

//# sourceMappingURL=index.js.map