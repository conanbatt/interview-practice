/// <reference types="node" />
/// <reference types="node" />
import type { __ApiPreviewProps } from './api-utils';
import type { DomainLocale } from './config';
import type { FontManifest, FontConfig } from './font-utils';
import type { LoadComponentsReturnType } from './load-components';
import type { MiddlewareRouteMatch } from '../shared/lib/router/utils/middleware-route-matcher';
import type { Params } from '../shared/lib/router/utils/route-matcher';
import type { NextConfig, NextConfigComplete } from './config-shared';
import type { NextParsedUrlQuery, NextUrlWithParsedQuery } from './request-meta';
import type { ParsedUrlQuery } from 'querystring';
import type { RenderOpts, RenderOptsPartial } from './render';
import type { ResponseCacheBase } from './response-cache';
import type { UrlWithParsedQuery } from 'url';
import type { ServerRuntime, SizeLimit } from 'next/types';
import type { PagesManifest } from '../build/webpack/plugins/pages-manifest-plugin';
import type { BaseNextRequest, BaseNextResponse } from './base-http';
import type { PayloadOptions } from './send-payload';
import type { PrerenderManifest } from '../build';
import type { ClientReferenceManifest } from '../build/webpack/plugins/flight-manifest-plugin';
import type { NextFontManifest } from '../build/webpack/plugins/next-font-manifest-plugin';
import type { PagesAPIRouteMatch } from './future/route-matches/pages-api-route-match';
import RenderResult from './render-result';
import { ImageConfigComplete } from '../shared/lib/image-config';
import { MiddlewareMatcher } from '../build/analysis/get-page-static-info';
import { RouteMatcherManager } from './future/route-matcher-managers/route-matcher-manager';
import { LocaleRouteNormalizer } from './future/normalizers/locale-route-normalizer';
import { I18NProvider } from './future/helpers/i18n-provider';
export type FindComponentsResult = {
    components: LoadComponentsReturnType;
    query: NextParsedUrlQuery;
};
export interface MiddlewareRoutingItem {
    page: string;
    match: MiddlewareRouteMatch;
    matchers?: MiddlewareMatcher[];
}
export interface Options {
    /**
     * Object containing the configuration next.config.js
     */
    conf: NextConfig;
    /**
     * Set to false when the server was created by Next.js
     */
    customServer?: boolean;
    /**
     * Tells if Next.js is running in dev mode
     */
    dev?: boolean;
    /**
     * Enables the experimental testing mode.
     */
    experimentalTestProxy?: boolean;
    /**
     * Where the Next project is located
     */
    dir?: string;
    /**
     * Tells if Next.js is at the platform-level
     */
    minimalMode?: boolean;
    /**
     * Hide error messages containing server information
     */
    quiet?: boolean;
    /**
     * The hostname the server is running behind
     */
    hostname?: string;
    /**
     * The port the server is running behind
     */
    port?: number;
    /**
     * The HTTP Server that Next.js is running behind
     */
    httpServer?: import('http').Server;
    _routerWorker?: boolean;
    _renderWorker?: boolean;
    isNodeDebugging?: 'brk' | boolean;
}
export interface BaseRequestHandler {
    (req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery | undefined): Promise<void>;
}
export type RequestContext = {
    req: BaseNextRequest;
    res: BaseNextResponse;
    pathname: string;
    query: NextParsedUrlQuery;
    renderOpts: RenderOptsPartial;
};
export declare class NoFallbackError extends Error {
}
export declare class WrappedBuildError extends Error {
    innerError: Error;
    constructor(innerError: Error);
}
type ResponsePayload = {
    type: 'html' | 'json' | 'rsc';
    body: RenderResult;
    revalidateOptions?: any;
};
export default abstract class Server<ServerOptions extends Options = Options> {
    protected readonly dir: string;
    protected readonly quiet: boolean;
    protected readonly nextConfig: NextConfigComplete;
    protected readonly distDir: string;
    protected readonly publicDir: string;
    protected readonly hasStaticDir: boolean;
    protected readonly hasAppDir: boolean;
    protected readonly pagesManifest?: PagesManifest;
    protected readonly appPathsManifest?: PagesManifest;
    protected readonly buildId: string;
    protected readonly minimalMode: boolean;
    protected readonly renderOpts: {
        deploymentId?: string;
        poweredByHeader: boolean;
        buildId: string;
        generateEtags: boolean;
        runtimeConfig?: {
            [key: string]: any;
        };
        assetPrefix?: string;
        canonicalBase: string;
        dev?: boolean;
        previewProps: __ApiPreviewProps;
        customServer?: boolean;
        ampOptimizerConfig?: {
            [key: string]: any;
        };
        basePath: string;
        optimizeFonts: FontConfig;
        images: ImageConfigComplete;
        fontManifest?: FontManifest;
        disableOptimizedLoading?: boolean;
        optimizeCss: any;
        nextConfigOutput: 'standalone' | 'export';
        nextScriptWorkers: any;
        locale?: string;
        locales?: string[];
        defaultLocale?: string;
        domainLocales?: DomainLocale[];
        distDir: string;
        runtime?: ServerRuntime;
        serverComponents?: boolean;
        crossOrigin?: 'anonymous' | 'use-credentials' | '' | undefined;
        supportsDynamicHTML?: boolean;
        isBot?: boolean;
        clientReferenceManifest?: ClientReferenceManifest;
        serverActionsBodySizeLimit?: SizeLimit;
        serverActionsManifest?: any;
        nextFontManifest?: NextFontManifest;
        renderServerComponentData?: boolean;
        serverComponentProps?: any;
        largePageDataBytes?: number;
        appDirDevErrorLogger?: (err: any) => Promise<void>;
        strictNextHead: boolean;
    };
    protected serverOptions: ServerOptions;
    private responseCache;
    protected appPathRoutes?: Record<string, string[]>;
    protected clientReferenceManifest?: ClientReferenceManifest;
    protected nextFontManifest?: NextFontManifest;
    readonly hostname?: string;
    readonly fetchHostname?: string;
    readonly port?: number;
    protected abstract getPublicDir(): string;
    protected abstract getHasStaticDir(): boolean;
    protected abstract getHasAppDir(dev: boolean): boolean;
    protected abstract getPagesManifest(): PagesManifest | undefined;
    protected abstract getAppPathsManifest(): PagesManifest | undefined;
    protected abstract getBuildId(): string;
    protected abstract findPageComponents(params: {
        pathname: string;
        query: NextParsedUrlQuery;
        params: Params;
        isAppPath: boolean;
        sriEnabled?: boolean;
        appPaths?: string[] | null;
        shouldEnsure: boolean;
    }): Promise<FindComponentsResult | null>;
    protected abstract getFontManifest(): FontManifest | undefined;
    protected abstract getPrerenderManifest(): PrerenderManifest;
    protected abstract getNextFontManifest(): NextFontManifest | undefined;
    protected abstract attachRequestMeta(req: BaseNextRequest, parsedUrl: NextUrlWithParsedQuery): void;
    protected abstract getFallback(page: string): Promise<string>;
    protected abstract hasPage(pathname: string): Promise<boolean>;
    protected abstract sendRenderResult(req: BaseNextRequest, res: BaseNextResponse, options: {
        result: RenderResult;
        type: 'html' | 'json' | 'rsc';
        generateEtags: boolean;
        poweredByHeader: boolean;
        options?: PayloadOptions;
    }): Promise<void>;
    protected abstract runApi(req: BaseNextRequest, res: BaseNextResponse, query: ParsedUrlQuery, match: PagesAPIRouteMatch): Promise<boolean>;
    protected abstract renderHTML(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query: NextParsedUrlQuery, renderOpts: RenderOpts): Promise<RenderResult>;
    protected abstract getIncrementalCache(options: {
        requestHeaders: Record<string, undefined | string | string[]>;
        requestProtocol: 'http' | 'https';
    }): import('./lib/incremental-cache').IncrementalCache;
    protected abstract getResponseCache(options: {
        dev: boolean;
    }): ResponseCacheBase;
    protected abstract loadEnvConfig(params: {
        dev: boolean;
        forceReload?: boolean;
    }): void;
    readonly matchers: RouteMatcherManager;
    protected readonly i18nProvider?: I18NProvider;
    protected readonly localeNormalizer?: LocaleRouteNormalizer;
    protected readonly isRenderWorker?: boolean;
    constructor(options: ServerOptions);
    protected reloadMatchers(): Promise<void>;
    protected normalizeNextData(_req: BaseNextRequest, _res: BaseNextResponse, _parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected handleNextImageRequest(_req: BaseNextRequest, _res: BaseNextResponse, _parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected handleCatchallRenderRequest(_req: BaseNextRequest, _res: BaseNextResponse, _parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected handleCatchallMiddlewareRequest(_req: BaseNextRequest, _res: BaseNextResponse, _parsedUrl: NextUrlWithParsedQuery): Promise<{
        finished: boolean;
    }>;
    protected getRoutes(): {
        matchers: RouteMatcherManager;
    };
    logError(err: Error): void;
    handleRequest(req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery): Promise<void>;
    private handleRequestImpl;
    getRequestHandler(): BaseRequestHandler;
    protected handleUpgrade(_req: BaseNextRequest, _socket: any, _head?: any): Promise<void>;
    setAssetPrefix(prefix?: string): void;
    protected prepared: boolean;
    protected preparedPromise: Promise<void> | null;
    /**
     * Runs async initialization of server.
     * It is idempotent, won't fire underlying initialization more than once.
     */
    prepare(): Promise<void>;
    protected prepareImpl(): Promise<void>;
    protected close(): Promise<void>;
    protected getAppPathRoutes(): Record<string, string[]>;
    protected run(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: UrlWithParsedQuery): Promise<void>;
    private runImpl;
    private pipe;
    private pipeImpl;
    private getStaticHTML;
    render(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: NextParsedUrlQuery, parsedUrl?: NextUrlWithParsedQuery, internalRender?: boolean): Promise<void>;
    private renderImpl;
    protected getStaticPaths({ pathname, }: {
        pathname: string;
        requestHeaders: import('./lib/incremental-cache').IncrementalCache['requestHeaders'];
        originalAppPath?: string;
    }): Promise<{
        staticPaths?: string[];
        fallbackMode?: 'static' | 'blocking' | false;
    }>;
    private renderToResponseWithComponents;
    private renderToResponseWithComponentsImpl;
    private stripNextDataPath;
    protected getOriginalAppPaths(route: string): string[] | null;
    protected renderPageComponent(ctx: RequestContext, bubbleNoFallback: boolean): Promise<false | ResponsePayload | null>;
    private renderToResponse;
    protected getMiddleware(): MiddlewareRoutingItem | undefined;
    protected getRoutesManifest(): {
        dynamicRoutes: {
            page: string;
            regex: string;
            namedRegex?: string;
            routeKeys?: {
                [key: string]: string;
            };
        };
        rewrites: {
            beforeFiles: any[];
            afterFiles: any[];
            fallback: any[];
        };
    } | undefined;
    private renderToResponseImpl;
    renderToHTML(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    private renderToHTMLImpl;
    renderError(err: Error | null, req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: NextParsedUrlQuery, setHeaders?: boolean): Promise<void>;
    private renderErrorImpl;
    private customErrorNo404Warn;
    private renderErrorToResponse;
    protected renderErrorToResponseImpl(ctx: RequestContext, err: Error | null): Promise<ResponsePayload | null>;
    renderErrorToHTML(err: Error | null, req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    protected getFallbackErrorComponents(): Promise<LoadComponentsReturnType | null>;
    render404(req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: Pick<NextUrlWithParsedQuery, 'pathname' | 'query'>, setHeaders?: boolean): Promise<void>;
}
export {};
