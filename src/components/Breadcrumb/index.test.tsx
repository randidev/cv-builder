import Breadcrumb from ".";
import { render, screen } from "@testing-library/react";

const BreadcrumbItems = [
  {
    text: "Home",
    link: "/",
  },
];

describe("Breadcrumb component", () => {
  it("should render correctly", () => {
    render(<Breadcrumb items={BreadcrumbItems} />);

    const links = screen.getAllByText("Home");

    expect(links).toHaveLength(1);
  });
});
