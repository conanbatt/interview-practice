import type { FsOutput } from './filesystem';
import type { IncomingMessage } from 'http';
import type { NextConfigComplete } from '../../config-shared';
import { RenderWorker } from '../router-server';
import { UnwrapPromise } from '../../../lib/coalesced-function';
import { NextUrlWithParsedQuery } from '../../request-meta';
export declare function getResolveRoutes(fsChecker: UnwrapPromise<ReturnType<typeof import('./filesystem').setupFsCheck>>, config: NextConfigComplete, opts: Parameters<typeof import('../router-server').initialize>[0], renderWorkers: {
    app?: RenderWorker;
    pages?: RenderWorker;
}, renderWorkerOpts: Parameters<RenderWorker['initialize']>[0], ensureMiddleware?: () => Promise<void>): (req: IncomingMessage, matchedDynamicRoutes: Set<string>, isUpgradeReq: boolean, signal: AbortSignal) => Promise<{
    finished: boolean;
    statusCode?: number | undefined;
    bodyStream?: ReadableStream<any> | null | undefined;
    resHeaders: Record<string, string | string[]>;
    parsedUrl: NextUrlWithParsedQuery;
    matchedOutput?: FsOutput | null | undefined;
}>;
