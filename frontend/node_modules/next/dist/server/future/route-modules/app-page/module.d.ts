/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { AppPageRouteDefinition } from '../../route-definitions/app-page-route-definition';
import type RenderResult from '../../../render-result';
import type { RenderOpts } from '../../../app-render/types';
import type { NextParsedUrlQuery } from '../../../request-meta';
import type { LoaderTree } from '../../../lib/app-dir-module';
import { RouteModule, type RouteModuleOptions, type RouteModuleHandleContext } from '../route-module';
type AppPageUserlandModule = {
    /**
     * The tree created in next-app-loader that holds component segments and modules
     */
    loaderTree: LoaderTree;
};
interface AppPageRouteHandlerContext extends RouteModuleHandleContext {
    page: string;
    query: NextParsedUrlQuery;
    renderOpts: RenderOpts;
}
export type AppPageRouteModuleOptions = RouteModuleOptions<AppPageRouteDefinition, AppPageUserlandModule>;
export declare class AppPageRouteModule extends RouteModule<AppPageRouteDefinition, AppPageUserlandModule> {
    render(req: IncomingMessage, res: ServerResponse, context: AppPageRouteHandlerContext): Promise<RenderResult>;
}
export default AppPageRouteModule;
