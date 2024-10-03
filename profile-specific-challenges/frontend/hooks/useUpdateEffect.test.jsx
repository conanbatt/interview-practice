import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useState } from "react";

import { useUpdateEffect } from "./useUpdateEffect";

function TestComponent() {
  const [called, setCalled] = useState(false);
  useUpdateEffect(() => {
    setCalled(true);
  }, [setCalled]);
  return <span>Update Called:{called.toString()}</span>;
}

describe("useUpdateEffect", () => {
  it("Does not run the callback on mount", () => {
    render(<TestComponent />);
    expect(
      screen.getByText("Updated Effect Called: false"),
    ).toBeInTheDocument();
  });

  it("Runs on ever state change", () => {
    const { rerender } = render(<TestComponent />);
    expect(
      screen.getByText("Updated Effect Called: false"),
    ).toBeInTheDocument();
    rerender(<TestComponent />);
    expect(screen.getByText("Updated Effect Called: true")).toBeInTheDocument();
  });
});
