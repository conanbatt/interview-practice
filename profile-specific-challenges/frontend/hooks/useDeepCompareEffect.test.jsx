import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

import { useDeepCompareEffect } from "./useDeepCompareEffect";

describe("useDeepCompareEffect", () => {
  it("Runs effects on different deps", () => {
    const render = renderHook(() =>
      useDeepCompareEffect(() => console.log("called"), 1),
    );
  });

  it("Does not run affects on object references", () => {});

  it("Does not run affects on equal arrays and objects", () => {});

  it("does not run effects on equal Sets & Maps", () => {});
});
