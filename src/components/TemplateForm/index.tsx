import { FormEvent } from "react";
import Breadcrumb from "../Breadcrumb";
import useAppSelector from "@/hooks/useAppSelector";
import { actions, selectors } from "@/redux/templates";
import useAppDispatch from "@/hooks/useAppDispatch";
import { convertImageToBase64 } from "@/utils/helpers";

const breadcrumbs = [
  { text: "Home", link: "/" },
  { text: "Templates", link: "/templates" },
  { text: "Create", link: "#" },
];

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
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="p-5 max-w-[600px] md:w-[600px] w-full border-l border-gray-primary md:block hidden overflow-y-auto max-h-body">
      <div className="mb-10 flex items-center justify-between">
        <Breadcrumb items={breadcrumbs} />
        <h3 className="text-lg font-medium">Editor</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-col gap-5">
          Type
          <div className="flex items-start gap-10">
            {["1", "2"].map((type) => (
              <label
                key={type}
                htmlFor={String(type)}
                className="flex gap-2 items-start">
                <input
                  type="radio"
                  name="type"
                  id={String(type)}
                  checked={template.type === type}
                  required
                  onChange={(e) => onChange("type", String(type))}
                />
                <img
                  src={`/images/templates/${type}.png`}
                  className="max-w-[150px] cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label className="w-fit" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            id="title"
            required
            name="title"
            value={template.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label className="w-fit" htmlFor="fontSize">
            Font Size
          </label>
          <div className="flex items-center gap-2">
            <input
              className="form-control"
              type="range"
              min={0}
              max={200}
              id="fontSize"
              required
              name="fontSize"
              value={template.fontSize}
              onChange={(e) => onChange("fontSize", e.target.value)}
            />
            <span>{template.fontSize}%</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label className="w-fit" htmlFor="colour">
            Colour Scheme
          </label>
          <input
            className="form-control"
            type="color"
            id="colour"
            name="colour"
            required
            value={template.colourScheme}
            onChange={(e) => onChange("colourScheme", e.target.value)}
          />
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label className="w-fit" htmlFor="margin">
            Margin
          </label>
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
              onChange={(e) => onChange("margin", e.target.value)}
            />
            <span>{template.margin}%</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <label className="w-fit" htmlFor="watermark">
            Watermark
          </label>
          <input
            type="file"
            className="form-control"
            id="watermark"
            name="watermark"
            onChange={async (e) => {
              const files = e.target.files;

              if (files) {
                const file = files[0];
                const base64 = await convertImageToBase64(file);
                onChange("watermark", base64);
              }
            }}
          />
          {template.watermark && (
            <img src={template.watermark} className="max-w-[150px]" />
          )}
        </div>

        <button type="submit" className="mt-10 button-gray w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
