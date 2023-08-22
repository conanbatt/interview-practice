import type { Page, TestInfo } from '@playwright/test';
import type { NextWorkerFixture, FetchHandler } from './next-worker-fixture';
import type { NextOptions } from './next-options';
export interface NextFixture {
    onFetch: (handler: FetchHandler) => void;
}
export declare function applyNextFixture(use: (fixture: NextFixture) => Promise<void>, { testInfo, nextOptions, nextWorker, page, extraHTTPHeaders, }: {
    testInfo: TestInfo;
    nextOptions: NextOptions;
    nextWorker: NextWorkerFixture;
    page: Page;
    extraHTTPHeaders: Record<string, string> | undefined;
}): Promise<void>;
