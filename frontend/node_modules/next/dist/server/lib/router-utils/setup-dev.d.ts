/// <reference types="node" />
import type { NextConfigComplete } from '../../config-shared';
import HotReloader from '../../dev/hot-reloader';
import { Telemetry } from '../../../telemetry/storage';
import { IncomingMessage, ServerResponse } from 'http';
import { UnwrapPromise } from '../../../lib/coalesced-function';
import { MiddlewareMatcher } from '../../../build/analysis/get-page-static-info';
import { MiddlewareRouteMatch } from '../../../shared/lib/router/utils/middleware-route-matcher';
type SetupOpts = {
    dir: string;
    turbo?: boolean;
    appDir?: string;
    pagesDir?: string;
    telemetry: Telemetry;
    isCustomServer?: boolean;
    fsChecker: UnwrapPromise<ReturnType<typeof import('./filesystem').setupFsCheck>>;
    nextConfig: NextConfigComplete;
};
export declare function setupDev(opts: SetupOpts): Promise<{
    serverFields: {
        actualMiddlewareFile?: string | undefined;
        actualInstrumentationHookFile?: string | undefined;
        appPathRoutes?: Record<string, string | string[]> | undefined;
        middleware?: {
            page: string;
            match: MiddlewareRouteMatch;
            matchers?: MiddlewareMatcher[] | undefined;
        } | undefined;
        hasAppNotFound?: boolean | undefined;
        interceptionRoutes?: {
            match: (pathname?: string | null | undefined, params?: any) => false | {
                [key: string]: any;
            };
            check?: boolean | undefined;
        }[] | undefined;
    };
    hotReloader: HotReloader;
    renderWorkers: {
        app?: import("../router-server").RenderWorker | undefined;
        pages?: import("../router-server").RenderWorker | undefined;
    };
    requestHandler: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<{
        finished: boolean;
    }>;
    logErrorWithOriginalStack: (err: unknown, type?: "warning" | "uncaughtException" | "unhandledRejection" | "app-dir" | undefined) => Promise<void>;
    ensureMiddleware(): Promise<void>;
}>;
export {};
