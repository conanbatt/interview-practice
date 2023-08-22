import { PropagateToWorkersField } from './router-utils/types';
export declare const WORKER_SELF_EXIT_CODE = 77;
declare let result: undefined | {
    port: number;
    hostname: string;
};
export declare function clearModuleContext(target: string): Promise<void> | undefined;
export declare function deleteAppClientCache(): any;
export declare function deleteCache(filePaths: string[]): void;
export declare function propagateServerField(field: PropagateToWorkersField, value: any): Promise<void>;
export declare function initialize(opts: {
    dir: string;
    port: number;
    dev: boolean;
    minimalMode?: boolean;
    hostname?: string;
    workerType: 'router' | 'render';
    isNodeDebugging: boolean;
    keepAliveTimeout?: number;
    serverFields?: any;
    experimentalTestProxy: boolean;
}): Promise<NonNullable<typeof result>>;
export {};
