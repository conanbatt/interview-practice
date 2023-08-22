/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import './cpu-profile';
import http, { IncomingMessage, ServerResponse } from 'http';
import '../require-hook';
import '../node-polyfill-fetch';
import { Duplex } from 'stream';
export declare const WORKER_SELF_EXIT_CODE = 77;
export type WorkerRequestHandler = (req: IncomingMessage, res: ServerResponse) => Promise<any>;
export type WorkerUpgradeHandler = (req: IncomingMessage, socket: Duplex, head: Buffer) => any;
export declare function initializeServerWorker(requestHandler: WorkerRequestHandler, upgradeHandler: WorkerUpgradeHandler, opts: {
    dir: string;
    port: number;
    dev: boolean;
    minimalMode?: boolean;
    hostname?: string;
    workerType: 'router' | 'render';
    isNodeDebugging: boolean;
    keepAliveTimeout?: number;
}): Promise<{
    port: number;
    hostname: string;
    server: http.Server;
}>;
