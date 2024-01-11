import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("", () => {
  it("should have Docs text", () => {
    render(<Home />);
    const myElem = screen.getByText("Docs");
    expect(myElem).toBeInTheDocument();
  });
});
