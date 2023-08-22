"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyNextFixture", {
    enumerable: true,
    get: function() {
        return applyNextFixture;
    }
});
const _pageroute = require("./page-route");
class NextFixtureImpl {
    constructor(testId, options, worker, page){
        this.testId = testId;
        this.options = options;
        this.worker = worker;
        this.page = page;
        this.fetchHandler = null;
        const handleFetch = this.handleFetch.bind(this);
        worker.onFetch(testId, handleFetch);
        this.page.route("**", (route)=>(0, _pageroute.handleRoute)(route, page, handleFetch));
    }
    teardown() {
        this.worker.cleanupTest(this.testId);
    }
    onFetch(handler) {
        this.fetchHandler = handler;
    }
    async handleFetch(request) {
        const handler = this.fetchHandler;
        if (handler) {
            const result = handler(request);
            if (result) {
                return result;
            }
        }
        if (this.options.fetchLoopback) {
            return fetch(request);
        }
        return undefined;
    }
}
async function applyNextFixture(use, { testInfo , nextOptions , nextWorker , page , extraHTTPHeaders  }) {
    const fixture = new NextFixtureImpl(testInfo.testId, nextOptions, nextWorker, page);
    page.setExtraHTTPHeaders({
        ...extraHTTPHeaders,
        "Next-Test-Proxy-Port": String(nextWorker.proxyPort),
        "Next-Test-Data": fixture.testId
    });
    await use(fixture);
    fixture.teardown();
}

//# sourceMappingURL=next-fixture.js.map