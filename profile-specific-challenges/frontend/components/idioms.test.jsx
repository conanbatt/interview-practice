import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  FunctionsAsComponents,
  UseEffectDerivedCalculation,
  UseEffectThrashing,
  UseStateDerivedCalculation,
  DirtyUnmount,
  AvoidingUseState,
  UnrenderableState,
} from "./idioms";
import * as React from "react";
import { API } from "../api";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  return {
    ...actual,
    useState: vi.fn((v) => actual.useState(v)),
    useEffect: vi.fn((fn, deps) => actual.useEffect(fn, deps)),
  };
});

const mockJson = vi.fn();
const mockText = vi.fn();
const mockFetch = vi.fn(
  () =>
    new Promise((res) =>
      setTimeout(() => {
        res({
          json: mockJson,
          text: mockText,
        });
      }, 500)
    )
);
global.fetch = mockFetch;

const mockAbort = vi.fn();
global.AbortController = vi.fn(() => ({
  abort: mockAbort,
  signal: {},
}));

describe("FunctionsAsComponents", () => {
  test("Renders with default prop", () => {
    render(<FunctionsAsComponents />);
    expect(screen.getByText("Start Now")).toBeInTheDocument();
  });

  test("Renders with custom prop", () => {
    render(<FunctionsAsComponents buttonText="Silver Button" />);
    expect(screen.getByText("Silver Button")).toBeInTheDocument();
  });
});

describe("UseEffectThrashing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetch is called if the prop is defined an non empty string", async () => {
    const { rerender } = render(
      <UseEffectThrashing fetchURL="" label="Fetch Data" />
    );
    expect(global.fetch).not.toHaveBeenCalled();

    rerender(<UseEffectThrashing fetchURL={0} label="Fetch Data" />);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("fetch is called only once for the same fetchURL and no unnecessary re-renders", async () => {
    const { rerender } = render(
      <UseEffectThrashing fetchURL="/api/data" label="Fetch Data" />
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);

    rerender(<UseEffectThrashing fetchURL="/api/data" label="Fetch Data" />);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    rerender(
      <UseEffectThrashing fetchURL="/api/other-data" label="Fetch Data" />
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("abort controller is called on unmount", async () => {
    const { unmount } = render(
      <UseEffectThrashing fetchURL="/api/data" label="Fetch Data" />
    );

    unmount();
    expect(mockAbort).toHaveBeenCalled();
    mockAbort.mockRestore();
  });
});

describe("UseEffectDerivedCalculation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("It renders with 0 as default count state", () => {
    render(<UseEffectDerivedCalculation />);

    expect(screen.getByText("Sum: 0")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 0")).toBeInTheDocument();
  });

  test("uses only one useState and no useEffect", () => {
    render(<UseEffectDerivedCalculation />);

    expect(React.useState).toHaveBeenCalledTimes(1);
    expect(React.useEffect).not.toHaveBeenCalled();
  });

  test("remainder is updated correctly when button is clicked", () => {
    render(<UseEffectDerivedCalculation />);

    const button = screen.getByText("Add Click Count");

    fireEvent.click(button);
    expect(screen.getByText("Sum: 1")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 1")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 2")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 2")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 3")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 3")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 4")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 4")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 5")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 0")).toBeInTheDocument();
  });
});

describe("UseStateDerivedCalculation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("It renders with 0 as default count state", () => {
    render(<UseStateDerivedCalculation />);

    expect(screen.getByText("Sum: 0")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 0")).toBeInTheDocument();
  });

  test("uses only one useState and no useEffect", () => {
    render(<UseStateDerivedCalculation />);

    expect(React.useState).toHaveBeenCalledTimes(1);
  });

  test("remainder is updated correctly when button is clicked", () => {
    render(<UseStateDerivedCalculation />);

    const button = screen.getByText("Add Click Count");

    fireEvent.click(button);
    expect(screen.getByText("Sum: 1")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 1")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 2")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 2")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 3")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 3")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 4")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 4")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sum: 5")).toBeInTheDocument();
    expect(screen.getByText("Remainder: 0")).toBeInTheDocument();
  });
});

describe("DirtyUnmount", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("updates the text every second and clears interval on unmount", () => {
    const { unmount } = render(<DirtyUnmount />);
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByText("Clock in seconds: 1")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText("Clock in seconds: 4")).toBeInTheDocument();

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});

describe("AvoidingUseState", () => {
  test("It renders the mounted state in text", () => {
    render(<AvoidingUseState />);

    expect(screen.getByText("Mounted")).toBeInTheDocument();
  });
});

describe("UnrenderableState", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("It updates loading and data from state", async () => {
    render(<UnrenderableState />);

    expect(screen.getByText("Loading: Pending")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersToNextTimer();
    });

    expect(screen.getByText("Loading: Done")).toBeInTheDocument();
    expect(
      screen.getByText("Result: Fetched Successfully")
    ).toBeInTheDocument();
  });

  test("It catches errors from the API", async () => {
    vi.spyOn(API, "unrenderableState").mockRejectedValueOnce(
      "Failed Successfully"
    );
    render(<UnrenderableState />);

    expect(screen.getByText("Loading: Pending")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersToNextTimer();
    });

    expect(screen.getByText("Loading: Done")).toBeInTheDocument();
    expect(screen.getByText("Result: Failed Successfully")).toBeInTheDocument();
  });
});
