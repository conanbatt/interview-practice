"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PagesAPIRouteModule: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PagesAPIRouteModule: function() {
        return PagesAPIRouteModule;
    },
    default: function() {
        return _default;
    }
});
const _routemodule = require("../route-module");
const _node = require("../../../api-utils/node");
class PagesAPIRouteModule extends _routemodule.RouteModule {
    /**
   *
   * @param req the incoming server request
   * @param res the outgoing server response
   * @param context the context for the render
   */ async render(req, res, context) {
        await (0, _node.apiResolver)(req, res, context.query, this.userland, {
            ...context.previewProps,
            revalidate: context.revalidate,
            trustHostHeader: context.trustHostHeader,
            allowedRevalidateHeaderKeys: context.allowedRevalidateHeaderKeys,
            hostname: context.hostname
        }, context.minimalMode, context.dev, context.page);
    }
}
const _default = PagesAPIRouteModule;

//# sourceMappingURL=module.js.map