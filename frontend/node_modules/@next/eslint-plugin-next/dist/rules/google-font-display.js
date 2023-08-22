"use strict";
var _definerule = require("../utils/define-rule");
var _nodeattributes = /*#__PURE__*/ _interop_require_default(require("../utils/node-attributes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var url = "https://nextjs.org/docs/messages/google-font-display";
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: "Enforce font-display behavior with Google Fonts.",
            recommended: true,
            url: url
        },
        type: "problem",
        schema: []
    },
    create: function create(context) {
        return {
            JSXOpeningElement: function JSXOpeningElement(node) {
                var message;
                if (node.name.name !== "link") {
                    return;
                }
                var attributes = new _nodeattributes.default(node);
                if (!attributes.has("href") || !attributes.hasValue("href")) {
                    return;
                }
                var hrefValue = attributes.value("href");
                var isGoogleFont = typeof hrefValue === "string" && hrefValue.startsWith("https://fonts.googleapis.com/css");
                if (isGoogleFont) {
                    var params = new URLSearchParams(hrefValue.split("?")[1]);
                    var displayValue = params.get("display");
                    if (!params.has("display")) {
                        message = "A font-display parameter is missing (adding `&display=optional` is recommended).";
                    } else if (displayValue === "auto" || displayValue === "block" || displayValue === "fallback") {
                        message = "".concat(displayValue[0].toUpperCase() + displayValue.slice(1), " is not recommended.");
                    }
                }
                if (message) {
                    context.report({
                        node: node,
                        message: "".concat(message, " See: ").concat(url)
                    });
                }
            }
        };
    }
});
