import LayoutEditor from "@/components/LayoutEditor";
import TemplateForm from "@/components/TemplateForm";
import TemplatePreview from "@/components/TemplatePreview";
import useTemplate from "@/hooks/useTemplate";
import { useRouter } from "next/router";

export default function CreateTemplate() {
  const router = useRouter();
  const { id } = router.query;
  const { template, tempTemplate, handleSubmit, handleChange } =
    useTemplate(id);

  if (!template) return <p>Loading...</p>;

  return (
    <LayoutEditor>
      <TemplatePreview template={tempTemplate} />
      <TemplateForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        template={tempTemplate}
      />
    </LayoutEditor>
  );
}
