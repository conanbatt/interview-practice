"use client";

import React from "react";
import { NotFoundBoundary } from "./not-found-boundary";
export function bailOnNotFound() {
    throw new Error("notFound() is not allowed to use in root layout");
}
function NotAllowedRootNotFoundError() {
    bailOnNotFound();
    return null;
}
export function DevRootNotFoundBoundary(param) {
    let { children  } = param;
    return /*#__PURE__*/ React.createElement(NotFoundBoundary, {
        notFound: /*#__PURE__*/ React.createElement(NotAllowedRootNotFoundError, null)
    }, children);
}

//# sourceMappingURL=dev-root-not-found-boundary.js.map