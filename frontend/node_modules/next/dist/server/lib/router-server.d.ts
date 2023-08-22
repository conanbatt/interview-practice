import type { WorkerRequestHandler, WorkerUpgradeHandler } from './setup-server-worker';
export type RenderWorker = InstanceType<typeof import('next/dist/compiled/jest-worker').Worker> & {
    initialize: typeof import('./render-server').initialize;
    deleteCache: typeof import('./render-server').deleteCache;
    deleteAppClientCache: typeof import('./render-server').deleteAppClientCache;
    clearModuleContext: typeof import('./render-server').clearModuleContext;
    propagateServerField: typeof import('./render-server').propagateServerField;
};
export declare function initialize(opts: {
    dir: string;
    port: number;
    dev: boolean;
    minimalMode?: boolean;
    hostname?: string;
    workerType: 'router' | 'render';
    isNodeDebugging: boolean;
    keepAliveTimeout?: number;
    customServer?: boolean;
    experimentalTestProxy?: boolean;
}): Promise<[WorkerRequestHandler, WorkerUpgradeHandler]>;
