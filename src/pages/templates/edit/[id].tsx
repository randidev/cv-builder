import LayoutEditor from "@/components/LayoutEditor";
import TemplateForm from "@/components/TemplateForm";
import TemplatePreview from "@/components/TemplatePreview";
import { dummyCandidate } from "@/dummy/candidate";
import useTemplate from "@/hooks/useTemplate";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import { useRouter } from "next/router";

export default function CreateTemplate() {
  useUnsavedChangesWarning();

  const router = useRouter();
  const { id } = router.query;
  const { template, tempTemplate, handleSubmit, handleChange } =
    useTemplate(id);

  if (!template) return <p>Loading...</p>;

  return (
    <LayoutEditor>
      <TemplatePreview template={tempTemplate} candidate={dummyCandidate} />
      <TemplateForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        template={tempTemplate}
      />
    </LayoutEditor>
  );
}
