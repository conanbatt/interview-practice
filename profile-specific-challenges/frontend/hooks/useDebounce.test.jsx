import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  function getHook(ms, dep) {
    const spy = vi.fn();
    return [
      spy,
      renderHook(({ delay = 5, deps = [] }) => useDebounce(spy, delay, deps), {
        initialProps: {
          delay: ms,
          deps: dep,
        },
      }),
    ];
  }

  it("should call passed function after given amount of time", () => {
    const [spy] = getHook();

    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("first function should return actual state of debounce", () => {
    let [, hook] = getHook();
    let [isReady] = hook.result.current;

    expect(isReady()).toBe(false);
    hook.unmount();
    expect(isReady()).toBe(null);

    [, hook] = getHook();
    [isReady] = hook.result.current;
    vi.advanceTimersByTime(5);
    expect(isReady()).toBe(true);
  });

  it("second function should cancel debounce", () => {
    const [spy, hook] = getHook();
    const [isReady, cancel] = hook.result.current;

    expect(spy).not.toHaveBeenCalled();
    expect(isReady()).toBe(false);

    act(() => {
      cancel();
    });
    vi.advanceTimersByTime(5);

    expect(spy).not.toHaveBeenCalled();
    expect(isReady()).toBe(null);
  });

  it("should reset timeout on delay change", () => {
    const [spy, hook] = getHook(50);

    expect(spy).not.toHaveBeenCalled();
    hook.rerender({ delay: 5, deps: [] });

    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should reset timeout on deps change", () => {
    const [spy, hook] = getHook(50, [5, 6]);

    vi.advanceTimersByTime(45);
    expect(spy).not.toHaveBeenCalled();
    hook.rerender({ delay: 50, deps: [6, 6] });

    vi.advanceTimersByTime(45);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
