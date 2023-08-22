"use strict";
var _definerule = require("../utils/define-rule");
var _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
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
var NEXT_EXPORT_FUNCTIONS = [
    "getStaticProps",
    "getStaticPaths",
    "getServerSideProps"
];
// 0 is the exact match
var THRESHOLD = 1;
// the minimum number of operations required to convert string a to string b.
function minDistance(a, b) {
    var m = a.length;
    var n = b.length;
    if (m < n) {
        return minDistance(b, a);
    }
    if (n === 0) {
        return m;
    }
    var previousRow = Array.from({
        length: n + 1
    }, function(_, i) {
        return i;
    });
    for(var i = 0; i < m; i++){
        var s1 = a[i];
        var currentRow = [
            i + 1
        ];
        for(var j = 0; j < n; j++){
            var s2 = b[j];
            var insertions = previousRow[j + 1] + 1;
            var deletions = currentRow[j] + 1;
            var substitutions = previousRow[j] + Number(s1 !== s2);
            currentRow.push(Math.min(insertions, deletions, substitutions));
        }
        previousRow = currentRow;
    }
    return previousRow[previousRow.length - 1];
}
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: "Prevent common typos in Next.js data fetching functions.",
            recommended: true
        },
        type: "problem",
        schema: []
    },
    create: function create(context) {
        var checkTypos = function checkTypos(node, name) {
            if (NEXT_EXPORT_FUNCTIONS.includes(name)) {
                return;
            }
            var potentialTypos = NEXT_EXPORT_FUNCTIONS.map(function(o) {
                return {
                    option: o,
                    distance: minDistance(o, name)
                };
            }).filter(function(param) {
                var distance = param.distance;
                return distance <= THRESHOLD && distance > 0;
            }).sort(function(a, b) {
                return a.distance - b.distance;
            });
            if (potentialTypos.length) {
                context.report({
                    node: node,
                    message: "".concat(name, " may be a typo. Did you mean ").concat(potentialTypos[0].option, "?")
                });
            }
        };
        return {
            ExportNamedDeclaration: function ExportNamedDeclaration(node) {
                var page = context.getFilename().split("pages")[1];
                if (!page || _path.parse(page).dir.startsWith("/api")) {
                    return;
                }
                var decl = node.declaration;
                if (!decl) {
                    return;
                }
                switch(decl.type){
                    case "FunctionDeclaration":
                        {
                            checkTypos(node, decl.id.name);
                            break;
                        }
                    case "VariableDeclaration":
                        {
                            decl.declarations.forEach(function(d) {
                                if (d.id.type !== "Identifier") {
                                    return;
                                }
                                checkTypos(node, d.id.name);
                            });
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
                return;
            }
        };
    }
});
