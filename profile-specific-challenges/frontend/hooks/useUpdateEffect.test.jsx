import { expect, it, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useUpdateEffect } from "./useUpdateEffect";

describe("useUpdateEffect", () => {
  it("Does not run the callback on mount and does for re-renders", () => {
    const effect = vi.fn();
    const { rerender } = renderHook(() => useUpdateEffect(effect));
    expect(effect).not.toHaveBeenCalled();
    rerender();
    expect(effect).toHaveBeenCalledOnce();
  });
});
