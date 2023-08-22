/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import './node-environment';
import './require-hook';
import './node-polyfill-fetch';
import './node-polyfill-form';
import './node-polyfill-web-streams';
import './node-polyfill-crypto';
import { CacheFs } from '../shared/lib/utils';
import type { MiddlewareManifest } from '../build/webpack/plugins/middleware-plugin';
import type RenderResult from './render-result';
import type { FetchEventResult } from './web/types';
import type { PrerenderManifest } from '../build';
import { BaseNextRequest, BaseNextResponse } from './base-http';
import type { PagesManifest } from '../build/webpack/plugins/pages-manifest-plugin';
import type { PayloadOptions } from './send-payload';
import type { NextParsedUrlQuery, NextUrlWithParsedQuery } from './request-meta';
import { Params } from '../shared/lib/router/utils/route-matcher';
import type { RouteMatch } from './future/route-matches/route-match';
import { type RenderOpts } from './render';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';
import { NodeNextRequest, NodeNextResponse } from './base-http/node';
import { ParsedUrlQuery } from 'querystring';
import { ParsedUrl } from '../shared/lib/router/utils/parse-url';
import BaseServer, { Options, FindComponentsResult, MiddlewareRoutingItem, RequestContext } from './base-server';
import { FontManifest } from './font-utils';
import ResponseCache from './response-cache';
import { IncrementalCache } from './lib/incremental-cache';
import { PagesAPIRouteMatch } from './future/route-matches/pages-api-route-match';
export * from './base-server';
export interface NodeRequestHandler {
    (req: IncomingMessage | BaseNextRequest, res: ServerResponse | BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery | undefined): Promise<void>;
}
export default class NextNodeServer extends BaseServer {
    private imageResponseCache?;
    protected renderWorkersPromises?: Promise<void>;
    protected renderWorkerOpts?: Parameters<typeof import('./lib/render-server').initialize>[0];
    protected dynamicRoutes?: {
        match: import('../shared/lib/router/utils/route-matcher').RouteMatchFn;
        page: string;
        re: RegExp;
    }[];
    constructor(options: Options);
    protected prepareImpl(): Promise<void>;
    protected loadEnvConfig({ dev, forceReload, silent, }: {
        dev: boolean;
        forceReload?: boolean;
        silent?: boolean;
    }): void;
    protected getIncrementalCache({ requestHeaders, requestProtocol, }: {
        requestHeaders: IncrementalCache['requestHeaders'];
        requestProtocol: 'http' | 'https';
    }): IncrementalCache;
    protected getResponseCache(): ResponseCache;
    protected getPublicDir(): string;
    protected getHasStaticDir(): boolean;
    protected getPagesManifest(): PagesManifest | undefined;
    protected getAppPathsManifest(): PagesManifest | undefined;
    protected hasPage(pathname: string): Promise<boolean>;
    protected getBuildId(): string;
    protected getHasAppDir(dev: boolean): boolean;
    protected sendRenderResult(req: NodeNextRequest, res: NodeNextResponse, options: {
        result: RenderResult;
        type: 'html' | 'json';
        generateEtags: boolean;
        poweredByHeader: boolean;
        options?: PayloadOptions | undefined;
    }): Promise<void>;
    protected sendStatic(req: NodeNextRequest, res: NodeNextResponse, path: string): Promise<void>;
    protected runApi(req: BaseNextRequest | NodeNextRequest, res: BaseNextResponse | NodeNextResponse, query: ParsedUrlQuery, match: PagesAPIRouteMatch): Promise<boolean>;
    protected renderHTML(req: NodeNextRequest, res: NodeNextResponse, pathname: string, query: NextParsedUrlQuery, renderOpts: RenderOpts): Promise<RenderResult>;
    private renderHTMLImpl;
    private streamResponseChunk;
    protected imageOptimizer(req: NodeNextRequest, res: NodeNextResponse, paramsResult: import('./image-optimizer').ImageParamsResult): Promise<{
        buffer: Buffer;
        contentType: string;
        maxAge: number;
    }>;
    protected getPagePath(pathname: string, locales?: string[]): string;
    protected renderPageComponent(ctx: RequestContext, bubbleNoFallback: boolean): Promise<false | {
        type: "html" | "json" | "rsc";
        body: RenderResult;
        revalidateOptions?: any;
    } | null>;
    protected findPageComponents({ pathname, query, params, isAppPath, }: {
        pathname: string;
        query: NextParsedUrlQuery;
        params: Params | null;
        isAppPath: boolean;
    }): Promise<FindComponentsResult | null>;
    private findPageComponentsImpl;
    protected getFontManifest(): FontManifest;
    protected getNextFontManifest(): any;
    protected getFallback(page: string): Promise<string>;
    protected normalizeNextData(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected handleNextImageRequest(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected handleCatchallRenderRequest(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    /**
     * Resolves `API` request, in development builds on demand
     * @param req http request
     * @param res http response
     * @param pathname path of request
     */
    protected handleApiRequest(req: BaseNextRequest, res: BaseNextResponse, query: ParsedUrlQuery, match: PagesAPIRouteMatch): Promise<boolean>;
    protected getCacheFilesystem(): CacheFs;
    private normalizeReq;
    private normalizeRes;
    getRequestHandler(): NodeRequestHandler;
    private makeRequestHandler;
    revalidate({ urlPath, revalidateHeaders, opts, }: {
        urlPath: string;
        revalidateHeaders: {
            [key: string]: string | string[];
        };
        opts: {
            unstable_onlyGenerated?: boolean;
        };
    }): Promise<void>;
    render(req: BaseNextRequest | IncomingMessage, res: BaseNextResponse | ServerResponse, pathname: string, query?: NextParsedUrlQuery, parsedUrl?: NextUrlWithParsedQuery, internal?: boolean): Promise<void>;
    renderToHTML(req: BaseNextRequest | IncomingMessage, res: BaseNextResponse | ServerResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    protected renderErrorToResponseImpl(ctx: RequestContext, err: Error | null): Promise<{
        type: "html" | "json" | "rsc";
        body: RenderResult;
        revalidateOptions?: any;
    } | null>;
    renderError(err: Error | null, req: BaseNextRequest | IncomingMessage, res: BaseNextResponse | ServerResponse, pathname: string, query?: NextParsedUrlQuery, setHeaders?: boolean): Promise<void>;
    renderErrorToHTML(err: Error | null, req: BaseNextRequest | IncomingMessage, res: BaseNextResponse | ServerResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    render404(req: BaseNextRequest | IncomingMessage, res: BaseNextResponse | ServerResponse, parsedUrl?: NextUrlWithParsedQuery, setHeaders?: boolean): Promise<void>;
    protected getMiddlewareManifest(): MiddlewareManifest | null;
    /** Returns the middleware routing item if there is one. */
    protected getMiddleware(): MiddlewareRoutingItem | undefined;
    protected getEdgeFunctionsPages(): string[];
    /**
     * Get information for the edge function located in the provided page
     * folder. If the edge function info can't be found it will throw
     * an error.
     */
    protected getEdgeFunctionInfo(params: {
        page: string;
        /** Whether we should look for a middleware or not */
        middleware: boolean;
    }): {
        name: string;
        paths: string[];
        wasm: {
            filePath: string;
            name: string;
        }[];
        assets: {
            filePath: string;
            name: string;
        }[];
    } | null;
    /**
     * Checks if a middleware exists. This method is useful for the development
     * server where we need to check the filesystem. Here we just check the
     * middleware manifest.
     */
    protected hasMiddleware(pathname: string): Promise<boolean>;
    /**
     * A placeholder for a function to be defined in the development server.
     * It will make sure that the root middleware or an edge function has been compiled
     * so that we can run it.
     */
    protected ensureMiddleware(): Promise<void>;
    protected ensureEdgeFunction(_params: {
        page: string;
        appPaths: string[] | null;
    }): Promise<void>;
    /**
     * This method gets all middleware matchers and execute them when the request
     * matches. It will make sure that each middleware exists and is compiled and
     * ready to be invoked. The development server will decorate it to add warns
     * and errors with rich traces.
     */
    protected runMiddleware(params: {
        request: BaseNextRequest;
        response: BaseNextResponse;
        parsedUrl: ParsedUrl;
        parsed: UrlWithParsedQuery;
        onWarning?: (warning: Error) => void;
    }): Promise<FetchEventResult | {
        finished: boolean;
    }>;
    protected handleCatchallMiddlewareRequest(req: BaseNextRequest, res: BaseNextResponse, parsed: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    private _cachedPreviewManifest;
    protected getPrerenderManifest(): PrerenderManifest;
    protected getRoutesManifest(): any;
    protected attachRequestMeta(req: BaseNextRequest, parsedUrl: NextUrlWithParsedQuery, isUpgradeReq?: boolean): void;
    protected runEdgeFunction(params: {
        req: BaseNextRequest | NodeNextRequest;
        res: BaseNextResponse | NodeNextResponse;
        query: ParsedUrlQuery;
        params: Params | undefined;
        page: string;
        appPaths: string[] | null;
        match?: RouteMatch;
        onWarning?: (warning: Error) => void;
    }): Promise<FetchEventResult | null>;
    protected get serverDistDir(): string;
}
