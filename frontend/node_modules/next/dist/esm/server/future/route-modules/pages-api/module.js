import { RouteModule } from "../route-module";
import { apiResolver } from "../../../api-utils/node";
export class PagesAPIRouteModule extends RouteModule {
    /**
   *
   * @param req the incoming server request
   * @param res the outgoing server response
   * @param context the context for the render
   */ async render(req, res, context) {
        await apiResolver(req, res, context.query, this.userland, {
            ...context.previewProps,
            revalidate: context.revalidate,
            trustHostHeader: context.trustHostHeader,
            allowedRevalidateHeaderKeys: context.allowedRevalidateHeaderKeys,
            hostname: context.hostname
        }, context.minimalMode, context.dev, context.page);
    }
}
export default PagesAPIRouteModule;

//# sourceMappingURL=module.js.map