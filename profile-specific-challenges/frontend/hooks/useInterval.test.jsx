import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useState } from "react";

import { useInterval } from "./useInterval";

function TestComponent({ maxLoops = 10 }) {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), count < maxLoops ? 1000 : null);
  return <span>Count:{count}</span>;
}

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs interval periods and updates the component", () => {
    render(<TestComponent />);
    expect(screen.getByText("Count:0")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText("Count:1")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText("Count:2")).toBeInTheDocument();
  });

  it("stops the interval", () => {
    render(<TestComponent maxLoops={1} />);
    expect(screen.getByText("Count:0")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText("Count:1")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText("Count:1")).toBeInTheDocument();
  });
});
