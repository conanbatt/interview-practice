"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getValidatedArgs", {
    enumerable: true,
    get: function() {
        return getValidatedArgs;
    }
});
const _index = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/arg/index.js"));
const _utils = require("../server/lib/utils");
const _iserror = /*#__PURE__*/ _interop_require_default(require("./is-error"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getValidatedArgs(validArgs, argv) {
    let args;
    try {
        args = (0, _index.default)(validArgs, {
            argv
        });
    } catch (error) {
        if ((0, _iserror.default)(error) && error.code === "ARG_UNKNOWN_OPTION") {
            (0, _utils.printAndExit)(error.message, 1);
        }
        throw error;
    }
    return args;
}

//# sourceMappingURL=get-validated-args.js.map