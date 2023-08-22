import type { NextConfigComplete } from '../config-shared';
import type { IncomingMessage, ServerResponse } from 'http';
import '../require-hook';
import '../node-polyfill-fetch';
type RouteResult = {
    type: 'rewrite';
    url: string;
    statusCode: number;
    headers: Record<string, undefined | number | string | string[]>;
} | {
    type: 'error';
    error: {
        name: string;
        message: string;
        stack: any[];
    };
} | {
    type: 'none';
};
type MiddlewareConfig = {
    matcher: string[] | null;
    files: string[];
};
type ServerAddress = {
    hostname?: string;
    port?: number;
};
export declare function makeResolver(dir: string, nextConfig: NextConfigComplete, middleware: MiddlewareConfig, { hostname, port }: Partial<ServerAddress>): Promise<(req: IncomingMessage, res: ServerResponse) => Promise<RouteResult | void>>;
export {};
