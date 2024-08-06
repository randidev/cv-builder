import { getPastYears } from "@/utils/helpers";
import clsx from "clsx";
import { useState } from "react";
import CandidateField from "../CandidateFormField";
import CandidateDateField from "../CandidateFormDateField";

const emptyEducation: Education = {
  degree: "",
  major: "",
  university: "",
  school: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function EducationForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  const years = getPastYears(50);
  const [isPresent, setIsPresent] = useState<boolean[]>(
    new Array(candidate.education.length).fill(false)
  );

  const handleAddEducation = () => {
    const newEducation = [...candidate.education, emptyEducation];
    onChange("education", newEducation);
  };

  const handleChangeEducation = (
    index: number,
    key: keyof Education,
    value: string
  ) => {
    const newEducations = [...candidate.education];
    newEducations[index] = {
      ...newEducations[index],
      [key]: value,
    };
    onChange("education", newEducations);
  };

  const handleIsPresent = (index: number, isChecked: boolean) => {
    const updatedIsPresent = [...isPresent];
    updatedIsPresent[index] = isChecked;

    handleChangeEducation(index, "endDate", isChecked ? "Present" : "");
    setIsPresent(updatedIsPresent);
  };

  return (
    <div>
      <button onClick={handleAddEducation} className="button-gray w-full mb-10">
        Add Education +
      </button>

      {candidate.education.map((exp, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <CandidateField
            label="University/School"
            name="university"
            value={exp.university ?? ""}
            onChange={(value) =>
              handleChangeEducation(index, "university", value)
            }
          />

          <CandidateField
            label="Degree"
            name="degree"
            value={exp.degree}
            onChange={(value) => handleChangeEducation(index, "degree", value)}
            className="mt-5"
          />

          <CandidateField
            label="Major"
            name="major"
            value={exp.major}
            onChange={(value) => handleChangeEducation(index, "major", value)}
            className="mt-5"
          />

          <div className={clsx("mt-5 items-end grid gap-2 grid-cols-2")}>
            <CandidateDateField
              label="Start Date"
              date={exp.startDate}
              onChangeDate={(value) =>
                handleChangeEducation(index, "startDate", value)
              }
              years={years}
            />

            {!isPresent[index] && (
              <CandidateDateField
                label="End Date"
                date={exp.endDate}
                onChangeDate={(value) =>
                  handleChangeEducation(index, "endDate", value)
                }
                years={years}
              />
            )}
          </div>

          <div className="mt-2">
            <label className="w-fit flex items-center gap-3">
              <input
                type="checkbox"
                onChange={(e) => handleIsPresent(index, e.target.checked)}
              />
              Present
            </label>
          </div>

          <CandidateField
            label="Description"
            name="description"
            value={exp.description}
            onChange={(value) =>
              handleChangeEducation(index, "description", value)
            }
            className="mt-5"
            isTextarea
          />
        </div>
      ))}
    </div>
  );
}
