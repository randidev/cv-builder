import LayoutEditor from "@/components/LayoutEditor";
import TemplateForm from "@/components/TemplateForm";
import TemplatePreview from "@/components/TemplatePreview";
import useTemplate from "@/hooks/useTemplate";

export default function CreateTemplate() {
  const { tempTemplate, handleSubmit, handleChange } = useTemplate();

  return (
    <LayoutEditor>
      <TemplatePreview template={tempTemplate} />
      <TemplateForm
        template={tempTemplate}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </LayoutEditor>
  );
}
