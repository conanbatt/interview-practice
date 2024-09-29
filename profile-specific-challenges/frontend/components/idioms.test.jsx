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
  AvoidMagicNumbers,
  UnidiomaticHTMLStructure,
  CrudeStateManagement,
  SubstandardDataStructure,
  UnidiomaticHTMLHierarchy,
  DangerousIdentifier,
  IncorrectDependencies,
  UnnecessaryFunctionRedefinitions,
  UnoptimizableRenderingStructure,
  ExcessivePropDrilling,
  deepCopyObject,
  deepCopyArray,
} from "./idioms";
import * as React from "react";
import { API } from "../api";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  return {
    ...actual,
    useCallback: vi.fn((...args) => actual.useCallback(...args)),
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
      }, 500),
    ),
);
global.fetch = mockFetch;

const mockAbort = vi.fn();
global.AbortController = vi.fn(() => ({
  abort: mockAbort,
  signal: {},
}));

describe("FunctionsAsComponents", () => {
  test("Renders with default prop", () => {
    const serialized = FunctionsAsComponents.toString();
    render(<FunctionsAsComponents />);
    expect(screen.getByText("Start Now")).toBeInTheDocument();

    expect(serialized).not.toMatch(/\{ children: .*\(\) \}/);
  });
});

describe("Object Deep Copying", () => {
  test("Does shallow copying", () => {
    const obj = {
      a: { b: 5 },
    };
    const newObj = deepCopyObject(obj);
    obj.a.b = 1;

    expect(newObj.a.b).toEqual(5);
  });

  test("Copies unserializable objects", () => {
    const map = new Map();
    map.set("c", 10);
    const obj = {
      a: { b: map },
    };
    const newObj = deepCopyObject(obj);
    map.set("c", 15);
    expect(newObj.a.b.get("c")).toEqual(10);
  });
});

describe("Array Deep Copying", () => {
  test("Does shallow copying", () => {
    const array = [{ a: 1 }, { b: 2 }];
    const newArr = deepCopyArray(array);
    array[0].a = 10;

    expect(newArr[0].a).toEqual(1);
  });

  test("Copies unserializable objects", () => {
    const map = new Map();
    map.set("c", 10);

    const array = [map];
    const newArr = deepCopyArray(array);
    map.set("c", 0);

    expect(newArr[0].get("c")).toEqual(10);
  });
});

describe("UseEffectThrashing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("abort signal is used to prevent trashy fetching", async () => {
    const { rerender } = render(
      <UseEffectThrashing
        frequentlyChangedURL="/api?ts=1"
        label="Fetch Data"
      />,
    );

    expect(mockAbort).not.toHaveBeenCalled();

    rerender(
      <UseEffectThrashing
        frequentlyChangedURL="/api?ts=2"
        label="Fetch Data"
      />,
    );
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

    expect(React.useState).toHaveBeenCalledTimes(2); // called twice even with one useState
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
      screen.getByText("Result: Fetched Successfully"),
    ).toBeInTheDocument();
  });
});

// how to test that calendar days are not defined within component?
describe("CrudeDeclarations", () => {
  test("does not use straight literals for numbers", () => {
    const fn = CrudeDeclarations.toString();
    // Do not want repeated code over and over!
    expect(fn.match(/(\d{1,2},)/g).length).toBeLessThan(5);
    render(<CrudeDeclarations />);

    // month with least days is Feb with 28
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(27);
  });
});

// also hard to test
describe("AvoidMagicNumbers", () => {
  test("does not have magic numbers in the render block", () => {
    const fn = AvoidMagicNumbers.toString();
    expect(fn).not.toMatch(/children: age >= \d\d/);
    render(<AvoidMagicNumbers />);
  });
});

describe("UnidiomaticHTMLStructure", () => {
  test("it has an idiomatic html structure", () => {
    render(<UnidiomaticHTMLStructure />);

    const input = screen.getByRole("textbox");

    expect(input.parentElement.tagName).toBe("FORM");
    expect(input.labels.length).toBe(1);
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
});

describe("UnidiomaticHTMLHierarchy", () => {
  test("uses idiomatic HTML", () => {
    render(<UnidiomaticHTMLHierarchy />);
    expect(screen.getAllByRole("list").length).toBe(2);
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

describe("DangerousIdentifier", () => {
  test("adds people when submitting form and uses unique id for keys", () => {
    const consoleSpy = vi.spyOn(console, "error");
    render(<DangerousIdentifier />);

    const addCta = screen.getByText("Add Person");
    const input = screen.getByRole("textbox");

    input.value = "Silver";
    fireEvent.click(addCta);

    expect(screen.getAllByRole("listitem").length).toBe(1);
    expect(screen.getByText("Silver")).toBeInTheDocument();

    input.value = "Dev";
    fireEvent.click(addCta);

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("Dev")).toBeInTheDocument();

    input.value = "Dev";
    fireEvent.click(addCta);

    expect(screen.getAllByRole("listitem").length).toBe(3);

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});

describe("IncorrectDependencies", () => {
  test("calls the track records view function once", () => {
    const spy = vi.spyOn(API, "trackView");
    const records = [{ id: 1, name: "Messi" }];
    const { rerender } = render(<IncorrectDependencies records={records} />);

    const copyRecords = structuredClone(records);
    rerender(<IncorrectDependencies records={copyRecords} />);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(records);
  });
});

describe("UnnecessaryFunctionRedefinitions", () => {
  test("functions with no dependencies should not be in component definitions", () => {
    const fn = UnnecessaryFunctionRedefinitions.toString();

    expect(fn).not.toMatch(/const validateEmail = /);
  });
});

describe("UnoptimizableRenderingStructure", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("fetches records every 5 seconds and clears interval on unmount", async () => {
    const recordsSpy = vi.spyOn(API, "fetchRecords");
    const { unmount } = render(
      <UnoptimizableRenderingStructure altRecords={[]} />,
    );
    expect(recordsSpy).toHaveBeenCalledTimes(0);

    await act(() => {
      vi.advanceTimersToNextTimerAsync();
    });
    expect(recordsSpy).toHaveBeenCalledTimes(1);

    await act(() => {
      vi.advanceTimersToNextTimerAsync();
    });
    expect(recordsSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByText("Renders: 1")).toBeInTheDocument();
  });
});

describe("ExcessivePropDrilling", () => {
  test("it adds one at a time, divides and multiplies by 5", () => {
    render(<ExcessivePropDrilling />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Multiply by 5"));
    expect(screen.getByText("Count: 5")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Divide by 5"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
