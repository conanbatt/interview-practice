import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import { useRendersCount } from "./useRendersCount";

describe("useRendersCount", () => {
  it("counts renders for a component", () => {
    function TestComponent() {
      const count = useRendersCount();
      return <span>Count:{count}</span>;
    }

    const { rerender } = render(<TestComponent />);
    expect(screen.getByText("Count:1")).toBeInTheDocument();
    rerender(<TestComponent />);
    expect(screen.getByText("Count:2")).toBeInTheDocument();
  });
});
