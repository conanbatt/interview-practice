export declare function isAbortError(e: any): e is Error & {
    name: 'AbortError';
};
/**
 * This is a minimal implementation of a Writable with just enough
 * functionality to handle stream cancellation.
 */
export interface PipeTarget {
    /**
     * Called when new data is read from readable source.
     */
    write: (chunk: Uint8Array) => unknown;
    /**
     * Always called once we read all data (if the writable isn't already
     * destroyed by a client disconnect).
     */
    end: () => unknown;
    /**
     * An optional method which is called after every write, to support
     * immediately streaming in gzip responses.
     */
    flush?: () => unknown;
    /**
     * The close event listener is necessary for us to detect an early client
     * disconnect while we're attempting to read data. This must be done
     * out-of-band so that we can cancel the readable (else we'd have to wait for
     * the readable to produce more data before we could tell it to cancel).
     */
    on: (event: 'close', cb: () => void) => void;
    /**
     * Allows us to cleanup our onClose listener.
     */
    off: (event: 'close', cb: () => void) => void;
}
export declare function pipeReadable(readable: ReadableStream, writable: PipeTarget): Promise<void>;
