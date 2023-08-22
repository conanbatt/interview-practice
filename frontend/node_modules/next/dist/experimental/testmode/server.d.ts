import { NodeRequestHandler } from '../../server/next-server';
export declare function interceptTestApis(): () => void;
export declare function wrapRequestHandler(handler: NodeRequestHandler): NodeRequestHandler;
