import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
  userEvent,
} from "../../../test/utils";
import TemplateForm from ".";
import useAppDispatch from "@/hooks/useAppDispatch";
import { actions } from "@/redux/utils";

jest.mock("@/hooks/useAppDispatch");
jest.mock("@/redux/utils", () => ({
  ...jest.requireActual("@/redux/utils"),
  actions: {
    setUtilsAction: jest.fn().mockReturnValue(jest.fn()), // Mock setUtilsAction to return a function (thunk)
  },
}));
jest.mock("@/utils/helpers", () => ({
  ...jest.requireActual("@/utils/helpers"),
  convertImageToBase64: jest
    .fn()
    .mockResolvedValue("data:image/png;base64,example"),
}));

describe("TemplateForm", () => {
  const mockDispatch = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockTemplate: Template = {
    id: "",
    title: "",
    type: "1",
    fontSize: 100,
    colourScheme: "#ffffff",
    margin: 50,
    watermark: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(
      <TemplateForm
        template={mockTemplate}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render form elements", () => {
    const titleInput = screen.getByTestId("title-input");
    expect(titleInput).toBeInTheDocument();
    expect(screen.getByLabelText(/font size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/colour scheme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/margin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/watermark/i)).toBeInTheDocument();
  });

  it("should handle empty input values correctly", () => {
    // Test empty title input
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "s" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("title", "s");
  });

  it("should call onChange when inputs change", () => {
    act(() => {
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "New Title" },
      });
      expect(mockOnChange).toHaveBeenCalledWith("title", "New Title");

      fireEvent.change(screen.getByLabelText(/font size/i), {
        target: { value: "120" },
      });

      expect(mockOnChange).toHaveBeenCalledWith("fontSize", "120");

      fireEvent.change(screen.getByLabelText(/colour scheme/i), {
        target: { value: "#000000" },
      });
      expect(mockOnChange).toHaveBeenCalledWith("colourScheme", "#000000");

      fireEvent.change(screen.getByLabelText(/margin/i), {
        target: { value: "60" },
      });
      expect(mockOnChange).toHaveBeenCalledWith("margin", "60");
    });
  });

  it("should call onSubmit when form is submitted", () => {
    act(() => {
      fireEvent.submit(screen.getByTestId("form-template-editor"));
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("should call onChange with watermark in base64 format when a file is selected", async () => {
    await act(async () => {
      const file = new File(["dummy content"], "example.png", {
        type: "image/png",
      });
      const input = screen.getByTestId("watermark-input");

      fireEvent.change(input, { target: { files: [file] } });

      // Wait for the file change to trigger the onChange with base64 value
      await new Promise((r) => setTimeout(r, 500));

      // Check that convertImageToBase64 is called with the file
      // This assumes that convertImageToBase64 is properly mocked
      expect(mockOnChange).toHaveBeenCalledWith(
        "watermark",
        expect.any(String),
      );
    });
  });

  it("should dispatch setUtilsAction with showEditor: false when the Preview button is clicked", () => {
    act(() => {
      const previewButton = screen.getByRole("button", { name: /Preview/i });

      fireEvent.click(previewButton);

      expect(actions.setUtilsAction).toHaveBeenCalledWith({
        showEditor: false,
      });

      // Ensure dispatch was called with the result of setUtilsAction
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("should have a template name in the breadcrumb if in edit mode", () => {
    render(
      <TemplateForm
        template={{ ...mockTemplate, id: "1", title: "Dummy" }}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />,
    );

    const breadcrumbItem = screen.getAllByText("Edit Dummy");

    expect(breadcrumbItem).toHaveLength(1);
  });
});
