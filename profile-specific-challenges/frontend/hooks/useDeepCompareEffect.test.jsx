import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

import { useDeepCompareEffect } from "./useDeepCompareEffect";

describe("useDeepCompareEffect", () => {
  it("Runs effects on different deps", () => {
    const fn = vi.fn();
    const literalDep = 1;
    const { rerender } = renderHook(() =>
      useDeepCompareEffect(fn, [literalDep]),
    );

    expect(fn).toHaveBeenCalledTimes(1);
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);

    literalDep = 2;
    rerender();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("Runs effects on objects that had changes", () => {
    const fn = vi.fn();
    const objectDep = { value: 1 };
    const { rerender } = renderHook(() =>
      useDeepCompareEffect(fn, [objectDep]),
    );

    expect(fn).toHaveBeenCalledTimes(1);
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);

    objectDep = { value: 2 };
    rerender();
    expect(fn).toHaveBeenCalledTimes(2);

    objectDep = { value: 2 };
    rerender();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not run effects on equal Sets & Maps", () => {
    const fn = vi.fn();
    const set = new Set();
    set.add(1);

    const { rerender } = renderHook(() => useDeepCompareEffect(fn, [set]));

    expect(fn).toHaveBeenCalledTimes(1);
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);

    const newSet = new Set();
    newSet.add(1);
    set = newSet;
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);

    newSet.add(2);
    rerender();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
