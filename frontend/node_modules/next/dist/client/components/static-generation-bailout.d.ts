type BailoutOpts = {
    dynamic?: string;
    link?: string;
};
export type StaticGenerationBailout = (reason: string, opts?: BailoutOpts) => boolean | never;
export declare const staticGenerationBailout: StaticGenerationBailout;
export {};
