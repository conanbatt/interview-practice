"use client";

import React, { use, useEffect, useMemo, useCallback, startTransition, useInsertionEffect } from "react";
import { AppRouterContext, LayoutRouterContext, GlobalLayoutRouterContext, CacheStates } from "../../shared/lib/app-router-context";
import { reducer } from "./router-reducer/router-reducer";
import { ACTION_FAST_REFRESH, ACTION_NAVIGATE, ACTION_PREFETCH, ACTION_REFRESH, ACTION_RESTORE, ACTION_SERVER_ACTION, ACTION_SERVER_PATCH, PrefetchKind } from "./router-reducer/router-reducer-types";
import { createHrefFromUrl } from "./router-reducer/create-href-from-url";
import { SearchParamsContext, PathnameContext } from "../../shared/lib/hooks-client-context";
import { useReducerWithReduxDevtools } from "./use-reducer-with-devtools";
import { ErrorBoundary } from "./error-boundary";
import { createInitialRouterState } from "./router-reducer/create-initial-router-state";
import { isBot } from "../../shared/lib/router/utils/is-bot";
import { addBasePath } from "../add-base-path";
import { AppRouterAnnouncer } from "./app-router-announcer";
import { RedirectBoundary } from "./redirect-boundary";
import { findHeadInCache } from "./router-reducer/reducers/find-head-in-cache";
import { createInfinitePromise } from "./infinite-promise";
import { NEXT_RSC_UNION_QUERY } from "./app-router-headers";
import { removeBasePath } from "../remove-base-path";
import { hasBasePath } from "../has-base-path";
const isServer = typeof window === "undefined";
// Ensure the initialParallelRoutes are not combined because of double-rendering in the browser with Strict Mode.
let initialParallelRoutes = isServer ? null : new Map();
let globalServerActionDispatcher = null;
export function getServerActionDispatcher() {
    return globalServerActionDispatcher;
}
export function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url, location.origin);
    urlWithoutFlightParameters.searchParams.delete(NEXT_RSC_UNION_QUERY);
    if (process.env.NODE_ENV === "production") {
        if (process.env.__NEXT_CONFIG_OUTPUT === "export" && urlWithoutFlightParameters.pathname.endsWith(".txt")) {
            const { pathname  } = urlWithoutFlightParameters;
            const length = pathname.endsWith("/index.txt") ? 10 : 4;
            // Slice off `/index.txt` or `.txt` from the end of the pathname
            urlWithoutFlightParameters.pathname = pathname.slice(0, -length);
        }
    }
    return urlWithoutFlightParameters;
}
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
function HistoryUpdater(param) {
    let { tree , pushRef , canonicalUrl , sync  } = param;
    useInsertionEffect(()=>{
        // Identifier is shortened intentionally.
        // __NA is used to identify if the history entry can be handled by the app-router.
        // __N is used to identify if the history entry can be handled by the old router.
        const historyState = {
            __NA: true,
            tree
        };
        if (pushRef.pendingPush && createHrefFromUrl(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, "", canonicalUrl);
        } else {
            window.history.replaceState(historyState, "", canonicalUrl);
        }
        sync();
    }, [
        tree,
        pushRef,
        canonicalUrl,
        sync
    ]);
    return null;
}
const createEmptyCacheNode = ()=>({
        status: CacheStates.LAZY_INITIALIZED,
        data: null,
        subTreeData: null,
        parallelRoutes: new Map()
    });
function useServerActionDispatcher(dispatch) {
    const serverActionDispatcher = useCallback((actionPayload)=>{
        startTransition(()=>{
            dispatch({
                ...actionPayload,
                type: ACTION_SERVER_ACTION,
                mutable: {},
                cache: createEmptyCacheNode()
            });
        });
    }, [
        dispatch
    ]);
    globalServerActionDispatcher = serverActionDispatcher;
}
/**
 * Server response that only patches the cache and tree.
 */ function useChangeByServerResponse(dispatch) {
    return useCallback((previousTree, flightData, overrideCanonicalUrl)=>{
        startTransition(()=>{
            dispatch({
                type: ACTION_SERVER_PATCH,
                flightData,
                previousTree,
                overrideCanonicalUrl,
                cache: createEmptyCacheNode(),
                mutable: {}
            });
        });
    }, [
        dispatch
    ]);
}
function useNavigate(dispatch) {
    return useCallback((href, navigateType, forceOptimisticNavigation, shouldScroll)=>{
        const url = new URL(addBasePath(href), location.href);
        return dispatch({
            type: ACTION_NAVIGATE,
            url,
            isExternalUrl: isExternalURL(url),
            locationSearch: location.search,
            forceOptimisticNavigation,
            shouldScroll: shouldScroll != null ? shouldScroll : true,
            navigateType,
            cache: createEmptyCacheNode(),
            mutable: {}
        });
    }, [
        dispatch
    ]);
}
/**
 * The global router that wraps the application components.
 */ function Router(param) {
    let { buildId , initialHead , initialTree , initialCanonicalUrl , children , assetPrefix  } = param;
    const initialState = useMemo(()=>createInitialRouterState({
            buildId,
            children,
            initialCanonicalUrl,
            initialTree,
            initialParallelRoutes,
            isServer,
            location: !isServer ? window.location : null,
            initialHead
        }), [
        buildId,
        children,
        initialCanonicalUrl,
        initialTree,
        initialHead
    ]);
    const [{ tree , cache , prefetchCache , pushRef , focusAndScrollRef , canonicalUrl , nextUrl  }, dispatch, sync] = useReducerWithReduxDevtools(reducer, initialState);
    useEffect(()=>{
        // Ensure initialParallelRoutes is cleaned up from memory once it's used.
        initialParallelRoutes = null;
    }, []);
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams , pathname  } = useMemo(()=>{
        const url = new URL(canonicalUrl, typeof window === "undefined" ? "http://n" : window.location.href);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: hasBasePath(url.pathname) ? removeBasePath(url.pathname) : url.pathname
        };
    }, [
        canonicalUrl
    ]);
    const changeByServerResponse = useChangeByServerResponse(dispatch);
    const navigate = useNavigate(dispatch);
    useServerActionDispatcher(dispatch);
    /**
   * The app router that is exposed through `useRouter`. It's only concerned with dispatching actions to the reducer, does not hold state.
   */ const appRouter = useMemo(()=>{
        const routerInstance = {
            back: ()=>window.history.back(),
            forward: ()=>window.history.forward(),
            prefetch: (href, options)=>{
                // Don't prefetch for bots as they don't navigate.
                // Don't prefetch during development (improves compilation performance)
                if (isBot(window.navigator.userAgent) || process.env.NODE_ENV === "development") {
                    return;
                }
                const url = new URL(addBasePath(href), location.href);
                // External urls can't be prefetched in the same way.
                if (isExternalURL(url)) {
                    return;
                }
                startTransition(()=>{
                    var _options_kind;
                    dispatch({
                        type: ACTION_PREFETCH,
                        url,
                        kind: (_options_kind = options == null ? void 0 : options.kind) != null ? _options_kind : PrefetchKind.FULL
                    });
                });
            },
            replace: (href, options)=>{
                if (options === void 0) options = {};
                startTransition(()=>{
                    var _options_scroll;
                    navigate(href, "replace", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            push: (href, options)=>{
                if (options === void 0) options = {};
                startTransition(()=>{
                    var _options_scroll;
                    navigate(href, "push", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            refresh: ()=>{
                startTransition(()=>{
                    dispatch({
                        type: ACTION_REFRESH,
                        cache: createEmptyCacheNode(),
                        mutable: {},
                        origin: window.location.origin
                    });
                });
            },
            // @ts-ignore we don't want to expose this method at all
            fastRefresh: ()=>{
                if (process.env.NODE_ENV !== "development") {
                    throw new Error("fastRefresh can only be used in development mode. Please use refresh instead.");
                } else {
                    startTransition(()=>{
                        dispatch({
                            type: ACTION_FAST_REFRESH,
                            cache: createEmptyCacheNode(),
                            mutable: {},
                            origin: window.location.origin
                        });
                    });
                }
            }
        };
        return routerInstance;
    }, [
        dispatch,
        navigate
    ]);
    useEffect(()=>{
        // Exists for debugging purposes. Don't use in application code.
        if (window.next) {
            window.next.router = appRouter;
        }
    }, [
        appRouter
    ]);
    if (process.env.NODE_ENV !== "production") {
        // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(()=>{
            // Add `window.nd` for debugging purposes.
            // This is not meant for use in applications as concurrent rendering will affect the cache/tree/router.
            // @ts-ignore this is for debugging
            window.nd = {
                router: appRouter,
                cache,
                prefetchCache,
                tree
            };
        }, [
            appRouter,
            cache,
            prefetchCache,
            tree
        ]);
    }
    useEffect(()=>{
        // If the app is restored from bfcache, it's possible that
        // pushRef.mpaNavigation is true, which would mean that any re-render of this component
        // would trigger the mpa navigation logic again from the lines below.
        // This will restore the router to the initial state in the event that the app is restored from bfcache.
        function handlePageShow(event) {
            var _window_history_state;
            if (!event.persisted || !((_window_history_state = window.history.state) == null ? void 0 : _window_history_state.tree)) return;
            dispatch({
                type: ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: window.history.state.tree
            });
        }
        window.addEventListener("pageshow", handlePageShow);
        return ()=>{
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [
        dispatch
    ]);
    // When mpaNavigation flag is set do a hard navigation to the new url.
    // Infinitely suspend because we don't actually want to rerender any child
    // components with the new URL and any entangled state updates shouldn't
    // commit either (eg: useTransition isPending should stay true until the page
    // unloads).
    //
    // This is a side effect in render. Don't try this at home, kids. It's
    // probably safe because we know this is a singleton component and it's never
    // in <Offscreen>. At least I hope so. (It will run twice in dev strict mode,
    // but that's... fine?)
    if (pushRef.mpaNavigation) {
        const location1 = window.location;
        if (pushRef.pendingPush) {
            location1.assign(canonicalUrl);
        } else {
            location1.replace(canonicalUrl);
        }
        // TODO-APP: Should we listen to navigateerror here to catch failed
        // navigations somehow? And should we call window.stop() if a SPA navigation
        // should interrupt an MPA one?
        use(createInfinitePromise());
    }
    /**
   * Handle popstate event, this is used to handle back/forward in the browser.
   * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
   * That case can happen when the old router injected the history entry.
   */ const onPopState = useCallback((param)=>{
        let { state  } = param;
        if (!state) {
            // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
            return;
        }
        // This case happens when the history entry was pushed by the `pages` router.
        if (!state.__NA) {
            window.location.reload();
            return;
        }
        // @ts-ignore useTransition exists
        // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
        // Without startTransition works if the cache is there for this path
        startTransition(()=>{
            dispatch({
                type: ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: state.tree
            });
        });
    }, [
        dispatch
    ]);
    // Register popstate event to call onPopstate.
    useEffect(()=>{
        window.addEventListener("popstate", onPopState);
        return ()=>{
            window.removeEventListener("popstate", onPopState);
        };
    }, [
        onPopState
    ]);
    const head = useMemo(()=>{
        return findHeadInCache(cache, tree[1]);
    }, [
        cache,
        tree
    ]);
    let content = /*#__PURE__*/ React.createElement(RedirectBoundary, null, head, cache.subTreeData, /*#__PURE__*/ React.createElement(AppRouterAnnouncer, {
        tree: tree
    }));
    if (process.env.NODE_ENV !== "production") {
        if (typeof window !== "undefined") {
            const DevRootNotFoundBoundary = require("./dev-root-not-found-boundary").DevRootNotFoundBoundary;
            content = /*#__PURE__*/ React.createElement(DevRootNotFoundBoundary, null, content);
        }
        const HotReloader = require("./react-dev-overlay/hot-reloader-client").default;
        content = /*#__PURE__*/ React.createElement(HotReloader, {
            assetPrefix: assetPrefix
        }, content);
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(HistoryUpdater, {
        tree: tree,
        pushRef: pushRef,
        canonicalUrl: canonicalUrl,
        sync: sync
    }), /*#__PURE__*/ React.createElement(PathnameContext.Provider, {
        value: pathname
    }, /*#__PURE__*/ React.createElement(SearchParamsContext.Provider, {
        value: searchParams
    }, /*#__PURE__*/ React.createElement(GlobalLayoutRouterContext.Provider, {
        value: {
            buildId,
            changeByServerResponse,
            tree,
            focusAndScrollRef,
            nextUrl
        }
    }, /*#__PURE__*/ React.createElement(AppRouterContext.Provider, {
        value: appRouter
    }, /*#__PURE__*/ React.createElement(LayoutRouterContext.Provider, {
        value: {
            childNodes: cache.parallelRoutes,
            tree: tree,
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl
        }
    }, content))))));
}
export default function AppRouter(props) {
    const { globalErrorComponent , ...rest } = props;
    return /*#__PURE__*/ React.createElement(ErrorBoundary, {
        errorComponent: globalErrorComponent
    }, /*#__PURE__*/ React.createElement(Router, rest));
}

//# sourceMappingURL=app-router.js.map