import '../lib/setup-exception-listeners';
import { __ApiPreviewProps } from '../server/api-utils';
import { RSC, RSC_VARY_HEADER } from '../client/components/app-router-headers';
export type SsgRoute = {
    initialRevalidateSeconds: number | false;
    srcRoute: string | null;
    dataRoute: string | null;
    initialStatus?: number;
    initialHeaders?: Record<string, string>;
};
export type DynamicSsgRoute = {
    routeRegex: string;
    fallback: string | null | false;
    dataRoute: string | null;
    dataRouteRegex: string | null;
};
export type PrerenderManifest = {
    version: 4;
    routes: {
        [route: string]: SsgRoute;
    };
    dynamicRoutes: {
        [route: string]: DynamicSsgRoute;
    };
    notFoundRoutes: string[];
    preview: __ApiPreviewProps;
};
type CustomRoute = {
    regex: string;
    statusCode?: number | undefined;
    permanent?: undefined;
    source: string;
    locale?: false | undefined;
    basePath?: false | undefined;
    destination?: string | undefined;
};
export type RoutesManifest = {
    version: number;
    pages404: boolean;
    basePath: string;
    redirects: Array<CustomRoute>;
    rewrites?: Array<CustomRoute> | {
        beforeFiles: Array<CustomRoute>;
        afterFiles: Array<CustomRoute>;
        fallback: Array<CustomRoute>;
    };
    headers: Array<CustomRoute>;
    staticRoutes: Array<{
        page: string;
        regex: string;
        namedRegex?: string;
        routeKeys?: {
            [key: string]: string;
        };
    }>;
    dynamicRoutes: Array<{
        page: string;
        regex: string;
        namedRegex?: string;
        routeKeys?: {
            [key: string]: string;
        };
    }>;
    dataRoutes: Array<{
        page: string;
        routeKeys?: {
            [key: string]: string;
        };
        dataRouteRegex: string;
        namedDataRouteRegex?: string;
    }>;
    i18n?: {
        domains?: Array<{
            http?: true;
            domain: string;
            locales?: string[];
            defaultLocale: string;
        }>;
        locales: string[];
        defaultLocale: string;
        localeDetection?: false;
    };
    rsc: {
        header: typeof RSC;
        varyHeader: typeof RSC_VARY_HEADER;
    };
    skipMiddlewareUrlNormalize?: boolean;
    caseSensitive?: boolean;
};
export default function build(dir: string, reactProductionProfiling: boolean | undefined, debugOutput: boolean | undefined, runLint: boolean | undefined, noMangling: boolean | undefined, appDirOnly: boolean | undefined, turboNextBuild: boolean | undefined, turboNextBuildRoot: null | undefined, buildMode: 'default' | 'experimental-compile' | 'experimental-generate'): Promise<void>;
export {};
