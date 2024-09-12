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
  CrudeDeclarations,
  MagicNumbers,
  UnidiomaticHTMLStructure,
  CrudeStateManagement,
  SubstandardDataStructure,
  UnidiomaticHTMLHierarchy,
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

  test("renders with 0 as default count state", () => {
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
  test("renders the mounted state in text", () => {
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

  test("updates loading and data from state", async () => {
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

  test("catches errors from the API", async () => {
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

// how to test that calendar days are not defined within component?
describe("CrudeDeclarations", () => {
  test("uses semantic html", () => {
    render(<CrudeDeclarations />);

    // month with least days is Feb with 28
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(27);
  });
});

// also hard to test
describe("MagicNumbers", () => {
  test("renders the correct message", () => {
    const { rerender } = render(<MagicNumbers age={20} />);

    expect(screen.getByText("Spicy")).toBeInTheDocument();

    rerender(<MagicNumbers age={10} />);

    expect(screen.getByText("You are not old enough")).toBeInTheDocument();
  });
});

describe("UnidiomaticHTMLStructure", () => {
  test("it has an idiomatic html structure", () => {
    render(<UnidiomaticHTMLStructure />);

    const input = screen.getByRole("textbox");

    expect(input.parentElement.tagName).toBe("FORM");
  });

  test("input element updates state correctly", () => {
    render(<UnidiomaticHTMLStructure />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const inputValue = "New Input Content";
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);
  });
});

describe("CrudeStateManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("uses a single useState call for form state", () => {
    render(<CrudeStateManagement />);
    expect(React.useState).toHaveBeenCalledTimes(1);
  });

  test("uses idiomatic HTML", () => {
    render(<CrudeStateManagement />);
    let inputs = screen.getAllByRole("textbox");

    for (let input of inputs) {
      expect(input.labels.length).toBe(1);
    }
  });
});

describe("UnidiomaticHTMLHierarchy", () => {
  test("uses idiomatic HTML", () => {
    render(<UnidiomaticHTMLHierarchy />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(6);
  });
});

describe("SubstandardDataStructure", () => {
  test("renders as many errors as thrown", async () => {
    render(<SubstandardDataStructure />);
    const btnA = screen.getByText("Throw Error A");
    const btnB = screen.getByText("Throw Error B");

    expect(btnA).toBeInTheDocument();
    expect(btnB).toBeInTheDocument();

    fireEvent.click(btnA);
    expect(screen.getAllByRole("listitem").length).toBe(1);
    fireEvent.click(btnB);
    expect(screen.getAllByRole("listitem").length).toBe(2);
    fireEvent.click(btnB);
    expect(screen.getAllByRole("listitem").length).toBe(3);

    expect(screen.getAllByText("Error A").length).toBe(1);
    expect(screen.getAllByText("Error B").length).toBe(2);

    fireEvent.click(screen.getByText("Clear Errors"));
    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });
});
