import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home landing page", () => {
  it("renders the product name", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /insurance ai/i }),
    ).toBeInTheDocument();
  });

  it("shows the building status indicator", () => {
    render(<Home />);
    expect(screen.getByText(/^building$/i)).toBeInTheDocument();
  });
});
