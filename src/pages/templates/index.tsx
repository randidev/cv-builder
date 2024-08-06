import { Template1, Template2 } from "@/components/PDFTemplates";
import { dummyCandidate } from "@/dummy/candidate";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { actions, selectors } from "@/redux/templates";
import { PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";

export default function TemplateList() {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(selectors.templates);

  const handleDelete = (e: any, id: string) => {
    e.stopPropagation();
    const template = templates.find((t) => t.id === id);
    if (template && confirm("Are you sure want to delete this template?")) {
      dispatch(actions.removeTemplateAction(template));
    }
    return;
  };

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">My Templates</h1>
        <Link className="button-gray block" href="/templates/create">
          Create New Template+
        </Link>
      </div>
      <div className="mt-6">
        {templates.length > 0 ? (
          <div className="grid grid-cols-5">
            {templates.map((template) => (
              <div key={template.title} className="flex flex-col">
                <Link
                  className="block hover:translate-y-1 transition-all duration-200 w-fit"
                  href={`/templates/edit/${template.id}`}>
                  <PDFViewer
                    width={"200px"}
                    height={"200px"}
                    showToolbar={false}>
                    {template.type === "1" ? (
                      <Template1
                        template={template}
                        candidate={dummyCandidate}
                      />
                    ) : (
                      <Template2
                        template={template}
                        candidate={dummyCandidate}
                      />
                    )}
                  </PDFViewer>
                  <h3 className="mt-4">{template.title}</h3>
                </Link>

                <button
                  onClick={(e) => handleDelete(e, template.id)}
                  className="button-gray w-fit mt-5">
                  Delete Template
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>
            No templates found.{" "}
            <Link href="/templates/create" className="underline">
              Create
            </Link>{" "}
            new template.
          </p>
        )}
      </div>
    </div>
  );
}
