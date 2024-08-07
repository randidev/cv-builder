import { Template1, Template2 } from "@/components/PDFTemplates";
import { PDFViewer } from "@react-pdf/renderer";

const ResumeForm: React.FC<CommonCandidateFormProps> = ({
  candidate,
  templates,
  onChange,
}) => {
  const renderTemplate = (template: Template) => {
    const TemplateComponent = template.type === "1" ? Template1 : Template2;

    return (
      <label key={template.id} htmlFor={template.id} className="template-label">
        <input
          type="radio"
          id={template.id}
          name="idTemplate"
          onChange={() => onChange("idTemplate", template.id)}
          checked={template.id === candidate.idTemplate}
          className="template-radio"
        />
        <PDFViewer showToolbar={false} width="100px" height="100px">
          <TemplateComponent template={template} candidate={candidate} />
        </PDFViewer>
      </label>
    );
  };

  return (
    <div className="resume-form">
      <h3>Choose The Resume Template</h3>
      {templates.length > 0 ? (
        <div className="mt-3 grid grid-cols-3">
          {templates.map(renderTemplate)}
        </div>
      ) : (
        <span>No templates found.</span>
      )}
    </div>
  );
};

export default ResumeForm;
