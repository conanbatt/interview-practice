import type { Page, Route } from '@playwright/test';
import type { FetchHandler } from './next-worker-fixture';
export declare function handleRoute(route: Route, page: Page, fetchHandler: FetchHandler | null): Promise<void>;
