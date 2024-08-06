import CandidateForm from "@/components/CandidateForm";
import LayoutEditor from "@/components/LayoutEditor";
import TemplatePreview from "@/components/TemplatePreview";
import useCandidate from "@/hooks/useCandidate";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import { useRouter } from "next/router";

export default function AddCandidate() {
  useUnsavedChangesWarning();

  const router = useRouter();
  const { id } = router.query;
  const {
    selectedTemplate,
    templates,
    temporaryCandidate,
    candidate,
    handleChange,
    handleSubmit,
  } = useCandidate(id);

  if (!candidate) return <p>Loading...</p>;

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
        isEdit
      />
    </LayoutEditor>
  );
}
