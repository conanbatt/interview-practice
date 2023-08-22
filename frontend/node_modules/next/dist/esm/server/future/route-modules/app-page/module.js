import { renderToHTMLOrFlight } from "../../../app-render/app-render";
import { RouteModule } from "../route-module";
export class AppPageRouteModule extends RouteModule {
    render(req, res, context) {
        return renderToHTMLOrFlight(req, res, context.page, context.query, context.renderOpts);
    }
}
export default AppPageRouteModule;

//# sourceMappingURL=module.js.map