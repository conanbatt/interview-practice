"use strict";
var _definerule = require("../utils/define-rule");
var url = "https://nextjs.org/docs/messages/no-async-client-component";
var description = "Prevent client components from being async functions.";
var message = "".concat(description, " See: ").concat(url);
function isCapitalized(str) {
    return /[A-Z]/.test(str === null || str === void 0 ? void 0 : str[0]);
}
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: description,
            recommended: true,
            url: url
        },
        type: "problem",
        schema: []
    },
    create: function create(context) {
        return {
            Program: function Program(node) {
                var isClientComponent = false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    var _loop = function() {
                        var block = _step.value;
                        if (block.type === "ExpressionStatement" && block.expression.type === "Literal" && block.expression.value === "use client") {
                            isClientComponent = true;
                        }
                        if (block.type === "ExportDefaultDeclaration" && isClientComponent) {
                            var _block_declaration;
                            // export default async function MyComponent() {...}
                            if (((_block_declaration = block.declaration) === null || _block_declaration === void 0 ? void 0 : _block_declaration.type) === "FunctionDeclaration" && block.declaration.async && isCapitalized(block.declaration.id.name)) {
                                context.report({
                                    node: block,
                                    message: message
                                });
                            }
                            // async function MyComponent() {...}; export default MyComponent;
                            if (block.declaration.type === "Identifier" && isCapitalized(block.declaration.name)) {
                                var targetName = block.declaration.name;
                                var functionDeclaration = node.body.find(function(localBlock) {
                                    if (localBlock.type === "FunctionDeclaration" && localBlock.id.name === targetName) return true;
                                    if (localBlock.type === "VariableDeclaration" && localBlock.declarations.find(function(declaration) {
                                        var _declaration_id;
                                        return ((_declaration_id = declaration.id) === null || _declaration_id === void 0 ? void 0 : _declaration_id.type) === "Identifier" && declaration.id.name === targetName;
                                    })) return true;
                                    return false;
                                });
                                if ((functionDeclaration === null || functionDeclaration === void 0 ? void 0 : functionDeclaration.type) === "FunctionDeclaration" && functionDeclaration.async) {
                                    context.report({
                                        node: functionDeclaration,
                                        message: message
                                    });
                                }
                                if ((functionDeclaration === null || functionDeclaration === void 0 ? void 0 : functionDeclaration.type) === "VariableDeclaration") {
                                    var _varDeclarator_init;
                                    var varDeclarator = functionDeclaration.declarations.find(function(declaration) {
                                        var _declaration_id;
                                        return ((_declaration_id = declaration.id) === null || _declaration_id === void 0 ? void 0 : _declaration_id.type) === "Identifier" && declaration.id.name === targetName;
                                    });
                                    if ((varDeclarator === null || varDeclarator === void 0 ? void 0 : (_varDeclarator_init = varDeclarator.init) === null || _varDeclarator_init === void 0 ? void 0 : _varDeclarator_init.type) === "ArrowFunctionExpression" && varDeclarator.init.async) {
                                        context.report({
                                            node: functionDeclaration,
                                            message: message
                                        });
                                    }
                                }
                            }
                        }
                    };
                    for(var _iterator = node.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        };
    }
});
