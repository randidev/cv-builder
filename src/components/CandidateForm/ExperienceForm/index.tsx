import { getPastYears } from "@/utils/helpers";
import clsx from "clsx";
import { useState } from "react";
import CandidateField from "../CandidateFormField";
import CandidateDateField from "../CandidateFormDateField";

const emptyExperience: Experience = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function ExperienceForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  const years = getPastYears(50);
  const [isPresent, setIsPresent] = useState<boolean[]>(
    new Array(candidate.experiences.length).fill(false),
  );

  const handleAddExperience = () => {
    const newExperience = [...candidate.experiences, emptyExperience];
    onChange("experiences", newExperience);
  };

  const handleChangeExperience = (
    index: number,
    key: keyof Experience,
    value: string,
  ) => {
    const newExperiences = [...candidate.experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [key]: value,
    };
    onChange("experiences", newExperiences);
  };

  const handleIsPresent = (index: number, isChecked: boolean) => {
    const updatedIsPresent = [...isPresent];
    updatedIsPresent[index] = isChecked;

    handleChangeExperience(index, "endDate", isChecked ? "Present" : "");
    setIsPresent(updatedIsPresent);
  };

  return (
    <div>
      <button
        onClick={handleAddExperience}
        className="button-gray mb-10 w-full"
      >
        Add Experience +
      </button>

      {candidate.experiences.map((exp, index) => (
        <div key={index} className="mb-4 rounded border p-4">
          <CandidateField
            label="Job Title"
            name="title"
            value={exp.title}
            onChange={(value) => handleChangeExperience(index, "title", value)}
          />

          <CandidateField
            label="Company"
            name="company"
            value={exp.company}
            onChange={(value) =>
              handleChangeExperience(index, "company", value)
            }
            className="mt-5"
          />

          <CandidateField
            label="Location"
            name="location"
            value={exp.location}
            onChange={(value) =>
              handleChangeExperience(index, "location", value)
            }
            className="mt-5"
          />

          <div className={clsx("mt-5 grid grid-cols-2 items-end gap-2")}>
            <CandidateDateField
              label="Start Date"
              date={exp.startDate}
              onChangeDate={(value) =>
                handleChangeExperience(index, "startDate", value)
              }
              years={years}
            />

            {!isPresent[index] && (
              <CandidateDateField
                label="End Date"
                date={exp.endDate}
                onChangeDate={(value) =>
                  handleChangeExperience(index, "endDate", value)
                }
                years={years}
              />
            )}
          </div>

          <div className="mt-2">
            <label className="flex w-fit items-center gap-3">
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
              handleChangeExperience(index, "description", value)
            }
            className="mt-5"
            isTextarea
          />
        </div>
      ))}
    </div>
  );
}
