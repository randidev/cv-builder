import { render, screen } from "@testing-library/react";
import Navbar from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Navbar component", () => {
  it("should render correctly", () => {
    render(<Navbar />);

    const links = screen.getAllByText("Template Builder");

    expect(links).toHaveLength(1);
  });
});
