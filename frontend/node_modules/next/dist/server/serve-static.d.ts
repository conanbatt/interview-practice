/// <reference types="node" />
/// <reference types="send" />
import { IncomingMessage, ServerResponse } from 'http';
import send from 'next/dist/compiled/send';
export declare function serveStatic(req: IncomingMessage, res: ServerResponse, path: string, opts?: Parameters<typeof send>[2]): Promise<void>;
export declare function getContentType(extWithoutDot: string): string | null;
export declare function getExtension(contentType: string): string | null;
