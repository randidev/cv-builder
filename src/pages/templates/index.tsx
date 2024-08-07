import { Template1, Template2 } from "@/components/PDFTemplates";
import APP from "@/config/app";
import { dummyCandidate } from "@/dummy/candidate";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { actions, selectors } from "@/redux/templates";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";

interface TemplateProps {
  template: Template;
}

export default function TemplateList() {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(selectors.templates);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    const template = templates.find((t) => t.id === id);
    if (template && confirm("Are you sure you want to delete this template?")) {
      dispatch(actions.removeTemplateAction(template));
    }
  };

  const TemplateItem = ({ template }: TemplateProps) => {
    return (
      <div key={template.id} className="flex flex-col">
        <Link
          className="block hover:translate-y-1 transition-all duration-200 w-fit"
          href={`${APP.LINKS.TEMPLATES.EDIT}/${template.id}`}>
          <PDFViewer width="100%" height="200px" showToolbar={false}>
            {template.type === "1" ? (
              <Template1 template={template} candidate={dummyCandidate} />
            ) : (
              <Template2 template={template} candidate={dummyCandidate} />
            )}
          </PDFViewer>
          <h3 className="mt-4">{template.title}</h3>
        </Link>

        <PDFDownloadLink
          document={
            template.type === "1" ? (
              <Template1 template={template} candidate={dummyCandidate} />
            ) : (
              <Template2 template={template} candidate={dummyCandidate} />
            )
          }
          fileName={`${template.title}_CV_TEMPLATE.pdf`}
          className="button-gray w-full mt-5 text-center">
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>

        <button
          onClick={(e) => handleDelete(e, template.id)}
          className="button-gray w-full mt-2">
          Delete Template
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-5 lg:px-0 px-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">My Templates</h1>
        <Link className="button-gray block" href={APP.LINKS.TEMPLATES.CREATE}>
          Create New Template+
        </Link>
      </div>
      <div className="mt-6">
        {templates.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {templates.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <p>
            No templates found.{" "}
            <Link href={APP.LINKS.TEMPLATES.CREATE} className="underline">
              Create
            </Link>{" "}
            a new template.
          </p>
        )}
      </div>
    </div>
  );
}
