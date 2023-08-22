"use strict";
var _definerule = require("../utils/define-rule");
var _nodeattributes = /*#__PURE__*/ _interop_require_default(require("../utils/node-attributes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var url = "https://nextjs.org/docs/messages/google-font-preconnect";
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: "Ensure `preconnect` is used with Google Fonts.",
            recommended: true,
            url: url
        },
        type: "problem",
        schema: []
    },
    create: function create(context) {
        return {
            JSXOpeningElement: function JSXOpeningElement(node) {
                if (node.name.name !== "link") {
                    return;
                }
                var attributes = new _nodeattributes.default(node);
                if (!attributes.has("href") || !attributes.hasValue("href")) {
                    return;
                }
                var hrefValue = attributes.value("href");
                var preconnectMissing = !attributes.has("rel") || !attributes.hasValue("rel") || attributes.value("rel") !== "preconnect";
                if (typeof hrefValue === "string" && hrefValue.startsWith("https://fonts.gstatic.com") && preconnectMissing) {
                    context.report({
                        node: node,
                        message: '`rel="preconnect"` is missing from Google Font. See: '.concat(url)
                    });
                }
            }
        };
    }
});
