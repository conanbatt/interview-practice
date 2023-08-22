import '../node-polyfill-fetch';
import { initialize } from './router-server';
export interface StartServerOptions {
    dir: string;
    port: number;
    logReady?: boolean;
    isDev: boolean;
    hostname: string;
    allowRetry?: boolean;
    customServer?: boolean;
    minimalMode?: boolean;
    keepAliveTimeout?: number;
    isExperimentalTestProxy?: boolean;
}
export declare function getRequestHandlers({ dir, port, isDev, hostname, minimalMode, isNodeDebugging, keepAliveTimeout, experimentalTestProxy, }: {
    dir: string;
    port: number;
    isDev: boolean;
    hostname: string;
    minimalMode?: boolean;
    isNodeDebugging?: boolean;
    keepAliveTimeout?: number;
    experimentalTestProxy?: boolean;
}): ReturnType<typeof initialize>;
export declare function startServer({ dir, port, isDev, hostname, minimalMode, allowRetry, keepAliveTimeout, isExperimentalTestProxy, logReady, }: StartServerOptions): Promise<void>;
