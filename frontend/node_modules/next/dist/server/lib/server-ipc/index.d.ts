import type NextServer from '../../next-server';
import type { NextConfigComplete } from '../../config-shared';
import { RenderWorker } from '../router-server';
import type { Env } from '@next/env';
export declare function createIpcServer(server: InstanceType<typeof NextServer>): Promise<{
    ipcPort: number;
    ipcServer: import('http').Server;
    ipcValidationKey: string;
}>;
export declare const createWorker: (ipcPort: number, ipcValidationKey: string, isNodeDebugging: boolean | 'brk' | undefined, type: 'pages' | 'app', nextConfig: NextConfigComplete, initialEnv?: NodeJS.ProcessEnv | Env) => Promise<RenderWorker>;
