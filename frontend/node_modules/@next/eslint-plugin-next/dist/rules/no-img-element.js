"use strict";
var _definerule = require("../utils/define-rule");
var url = "https://nextjs.org/docs/messages/no-img-element";
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: "Prevent usage of `<img>` element due to slower LCP and higher bandwidth.",
            category: "HTML",
            recommended: true,
            url: url
        },
        type: "problem",
        schema: []
    },
    create: function create(context) {
        return {
            JSXOpeningElement: function JSXOpeningElement(node) {
                var _node_parent, _node_parent_parent, _node_parent_parent_openingElement, _node_parent_parent_openingElement_name;
                if (node.name.name !== "img") {
                    return;
                }
                if (node.attributes.length === 0) {
                    return;
                }
                if (((_node_parent = node.parent) === null || _node_parent === void 0 ? void 0 : (_node_parent_parent = _node_parent.parent) === null || _node_parent_parent === void 0 ? void 0 : (_node_parent_parent_openingElement = _node_parent_parent.openingElement) === null || _node_parent_parent_openingElement === void 0 ? void 0 : (_node_parent_parent_openingElement_name = _node_parent_parent_openingElement.name) === null || _node_parent_parent_openingElement_name === void 0 ? void 0 : _node_parent_parent_openingElement_name.name) === "picture") {
                    return;
                }
                context.report({
                    node: node,
                    message: "Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: ".concat(url)
                });
            }
        };
    }
});
