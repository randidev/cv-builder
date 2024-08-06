import { FormEvent } from "react";
import Breadcrumb from "../Breadcrumb";
import { convertImageToBase64 } from "@/utils/helpers";
import APP from "@/config/app";

interface TemplateFormProps {
  template: Template;
  onChange: (key: keyof Template, value: string) => void;
  onSubmit: () => void;
}

export default function TemplateForm({
  onSubmit,
  template,
  onChange,
}: TemplateFormProps) {
  const breadcrumbs = [
    { text: "Home", link: "/" },
    { text: "Templates", link: APP.LINKS.TEMPLATES.DEFAULT },
    { text: template.id ? `Edit ${template.title}` : "Create", link: "#" },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange =
    (key: keyof Template) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(key, e.target.value);
    };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const base64 = await convertImageToBase64(file);
      onChange("watermark", base64);
    }
  };

  return (
    <div className="p-5 max-w-[600px] md:w-[600px] w-full border-l border-gray-primary md:block hidden overflow-y-auto max-h-body">
      <div className="mb-10 flex items-center justify-between">
        <Breadcrumb items={breadcrumbs} />
        <h3 className="text-lg font-medium">Editor</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-col gap-5">
          <label className="font-medium">Type</label>
          <div className="flex items-start gap-10">
            {["1", "2"].map((type) => (
              <label
                key={type}
                htmlFor={type}
                className="flex gap-2 items-start">
                <input
                  type="radio"
                  name="type"
                  id={type}
                  checked={template.type === type}
                  required
                  onChange={() => onChange("type", type)}
                />
                <img
                  src={`/images/templates/${type}.png`}
                  className="max-w-[150px] cursor-pointer"
                  alt={`Template type ${type}`}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            id="title"
            required
            name="title"
            value={template.title}
            onChange={handleInputChange("title")}
          />
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label htmlFor="fontSize">Font Size</label>
          <div className="flex items-center gap-2">
            <input
              className="form-control"
              type="range"
              min={0}
              max={200}
              id="fontSize"
              name="fontSize"
              required
              value={template.fontSize}
              onChange={handleInputChange("fontSize")}
            />
            <span>{template.fontSize}%</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label htmlFor="colour">Colour Scheme</label>
          <input
            className="form-control"
            type="color"
            id="colour"
            name="colour"
            required
            value={template.colourScheme}
            onChange={handleInputChange("colourScheme")}
          />
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label htmlFor="margin">Margin</label>
          <div className="flex items-center gap-2">
            <input
              className="form-control"
              type="range"
              min={0}
              max={200}
              id="margin"
              name="margin"
              required
              value={template.margin}
              onChange={handleInputChange("margin")}
            />
            <span>{template.margin}%</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label htmlFor="watermark">Watermark</label>
          <input
            type="file"
            className="form-control"
            id="watermark"
            name="watermark"
            onChange={handleFileChange}
          />
          {template.watermark && (
            <img
              src={template.watermark}
              className="max-w-[150px] mt-2"
              alt="Watermark preview"
            />
          )}
        </div>

        <button type="submit" className="mt-10 button-gray w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
