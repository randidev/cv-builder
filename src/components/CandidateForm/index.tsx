import { FormEvent, useMemo, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { convertImageToBase64 } from "@/utils/helpers";
import APP from "@/config/app";
import dynamic from "next/dynamic";
import { FaChevronLeft } from "react-icons/fa";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer group px-4 py-6 border-b border-gray-primary">
    {label}
    <span className="float-right transition-all duration-200 group-hover:translate-x-1">
      {">"}
    </span>
  </div>
);

interface CandidateFormProps {
  candidate: CandidateItem;
  templates: Template[];
  onChange: (key: keyof CandidateItem, value: string) => void;
  onSubmit: () => void;
  isEdit?: boolean;
}

const CandidateForm: React.FC<CandidateFormProps> = ({
  onSubmit,
  onChange,
  candidate,
  templates,
  isEdit,
}) => {
  const breadcrumbs = [
    { text: "Home", link: "/" },
    { text: "Candidates", link: APP.LINKS.CANDIDATES.DEFAULT },
    {
      text: isEdit ? `Edit ${candidate.firstName}'s Resume` : "Create",
      link: "#",
    },
  ];

  const [form, setForm] = useState<null | { title: string; component: string }>(
    null
  );

  const handleSubmit = () => {
    onSubmit();
  };

  const CurrentForm = useMemo(
    () =>
      dynamic<CommonCandidateFormProps>(
        () =>
          import(
            `@/components/CandidateForm/${
              form?.component || "DefaultComponent"
            }`
          )
      ),
    [form?.component]
  );

  const currentFormProps = useMemo(
    () => ({
      candidate,
      templates,
      onChange,
    }),
    [candidate, templates, onChange]
  );

  const renderMenuItems = () => {
    const menuItems = [
      { label: "Resume Template", component: "ResumeForm" },
      { label: "Personal Details", component: "PersonalDetailsForm" },
      { label: "Experiences", component: "ExperienceForm" },
      { label: "Educations", component: "EducationForm" },
      { label: "Skills", component: "SkillForm" },
      { label: "Certificates", component: "CertificationForm" },
      { label: "Description", component: "DescriptionForm" },
    ];

    return menuItems.map(({ label, component }) => (
      <MenuItem
        key={component}
        label={label}
        onClick={() => setForm({ component, title: label })}
      />
    ));
  };

  return (
    <div className="p-5 max-w-[600px] md:w-[600px] w-full border-l border-gray-primary md:block hidden overflow-y-auto max-h-body">
      <div className="mb-10 flex items-center justify-between">
        <Breadcrumb items={breadcrumbs} />
        <button className="button-gray" onClick={handleSubmit}>
          Save
        </button>
      </div>
      <div className="mt-10">
        {form !== null ? (
          <>
            <div
              onClick={() => setForm(null)}
              className="cursor-pointer flex text-xl items-center gap-3 mb-5 hover:-translate-x-1 transition-all duration-200">
              <FaChevronLeft />
              {form.title}
            </div>
            <CurrentForm {...currentFormProps} />
          </>
        ) : (
          <div className="flex flex-col">{renderMenuItems()}</div>
        )}
      </div>
    </div>
  );
};

export default CandidateForm;
