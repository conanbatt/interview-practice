import type { PrerenderManifest } from '../../../build';
import type { NextConfigComplete } from '../../config-shared';
import { getPathMatch } from '../../../shared/lib/router/utils/path-match';
import { MiddlewareRouteMatch } from '../../../shared/lib/router/utils/middleware-route-matcher';
export type FsOutput = {
    type: 'appFile' | 'pageFile' | 'nextImage' | 'publicFolder' | 'nextStaticFolder' | 'legacyStaticFolder' | 'devVirtualFsItem';
    itemPath: string;
    fsPath?: string;
    itemsRoot?: string;
    locale?: string;
};
export declare const buildCustomRoute: <T>(type: 'redirect' | 'header' | 'rewrite' | 'before_files_rewrite', item: T & {
    source: string;
}, basePath?: string, caseSensitive?: boolean) => T & {
    match: ReturnType<typeof getPathMatch>;
    check?: boolean | undefined;
};
export declare function setupFsCheck(opts: {
    dir: string;
    dev: boolean;
    minimalMode?: boolean;
    config: NextConfigComplete;
    addDevWatcherCallback?: (arg: (files: Map<string, {
        timestamp: number;
    }>) => void) => void;
}): Promise<{
    headers: (import("../../../lib/load-custom-routes").Header & {
        match: (pathname?: string | null | undefined, params?: any) => false | {
            [key: string]: any;
        };
        check?: boolean | undefined;
    })[];
    rewrites: {
        beforeFiles: (import("../../../lib/load-custom-routes").Rewrite & {
            match: (pathname?: string | null | undefined, params?: any) => false | {
                [key: string]: any;
            };
            check?: boolean | undefined;
        })[];
        afterFiles: (import("../../../lib/load-custom-routes").Rewrite & {
            match: (pathname?: string | null | undefined, params?: any) => false | {
                [key: string]: any;
            };
            check?: boolean | undefined;
        })[];
        fallback: (import("../../../lib/load-custom-routes").Rewrite & {
            match: (pathname?: string | null | undefined, params?: any) => false | {
                [key: string]: any;
            };
            check?: boolean | undefined;
        })[];
    };
    redirects: (import("../../../lib/load-custom-routes").Redirect & {
        match: (pathname?: string | null | undefined, params?: any) => false | {
            [key: string]: any;
        };
        check?: boolean | undefined;
    })[];
    buildId: string;
    handleLocale: (pathname: string, locales?: string[]) => {
        locale: string | undefined;
        pathname: string;
    };
    appFiles: Set<string>;
    pageFiles: Set<string>;
    dynamicRoutes: ({
        page: string;
        regex: string;
        namedRegex?: string | undefined;
        routeKeys?: {
            [key: string]: string;
        } | undefined;
    } & {
        match: ReturnType<typeof getPathMatch>;
    })[];
    nextDataRoutes: Set<string>;
    interceptionRoutes: {
        match: (pathname?: string | null | undefined, params?: any) => false | {
            [key: string]: any;
        };
        check?: boolean | undefined;
    }[] | undefined;
    devVirtualFsItems: Set<string>;
    prerenderManifest: PrerenderManifest;
    middlewareMatcher: MiddlewareRouteMatch | undefined;
    ensureCallback(fn: (item: FsOutput) => Promise<void> | undefined): void;
    getItem(itemPath: string): Promise<FsOutput | null>;
    getDynamicRoutes(): ({
        page: string;
        regex: string;
        namedRegex?: string | undefined;
        routeKeys?: {
            [key: string]: string;
        } | undefined;
    } & {
        match: ReturnType<typeof getPathMatch>;
    })[];
    getMiddlewareMatchers(): MiddlewareRouteMatch | undefined;
}>;
