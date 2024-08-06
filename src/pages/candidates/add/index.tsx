import CandidateForm from "@/components/CandidateForm";
import LayoutEditor from "@/components/LayoutEditor";
import TemplatePreview from "@/components/TemplatePreview";
import useCandidate from "@/hooks/useCandidate";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";

export default function AddCandidate() {
  useUnsavedChangesWarning();

  const {
    selectedTemplate,
    templates,
    temporaryCandidate,
    handleChange,
    handleSubmit,
  } = useCandidate();

  return (
    <LayoutEditor>
      <TemplatePreview
        template={selectedTemplate}
        candidate={temporaryCandidate}
      />
      <CandidateForm
        candidate={temporaryCandidate}
        templates={templates}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </LayoutEditor>
  );
}
