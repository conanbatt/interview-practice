import { expect, it, describe } from "vitest";
import { renderHook } from "@testing-library/react";

import { useRendersCount } from "./useRendersCount";

describe("useRendersCount", () => {
  it("counts renders for a component", () => {
    const { result, rerender } = renderHook(() => useRendersCount());
    expect(result.current).toEqual(1);
    rerender();
    expect(result.current).toEqual(2);
  });
});
