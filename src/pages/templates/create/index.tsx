import LayoutEditor from "@/components/LayoutEditor";
import TemplateForm from "@/components/TemplateForm";
import TemplatePreview from "@/components/TemplatePreview";
import { dummyCandidate } from "@/dummy/candidate";
import useTemplate from "@/hooks/useTemplate";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";

export default function CreateTemplate() {
  useUnsavedChangesWarning();

  const { tempTemplate, handleSubmit, handleChange } = useTemplate();

  return (
    <LayoutEditor>
      <TemplatePreview template={tempTemplate} candidate={dummyCandidate} />
      <TemplateForm
        template={tempTemplate}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </LayoutEditor>
  );
}
