import { getPastYears } from "@/utils/helpers";
import CandidateField from "../CandidateFormField";
import CandidateDateField from "../CandidateFormDateField";

const emptyCertification: Certification = {
  name: "",
  date: "",
};

export default function CertificationForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  const years = getPastYears(50);
  const handleAddCertification = () => {
    const newCertification = [...candidate.certifications, emptyCertification];
    onChange("certifications", newCertification);
  };

  const handleChangeCertification = (
    index: number,
    key: keyof Certification,
    value: string,
  ) => {
    const newCertifications = [...candidate.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [key]: value,
    };
    onChange("certifications", newCertifications);
  };

  return (
    <div>
      <button
        onClick={handleAddCertification}
        className="button-gray mb-10 w-full"
      >
        Add Certification +
      </button>

      {candidate.certifications.map((exp, index) => (
        <div key={index} className="mb-4 rounded border p-4">
          <CandidateField
            label="Name"
            name="name"
            value={exp.name}
            onChange={(value) =>
              handleChangeCertification(index, "name", value)
            }
          />

          <div className="mt-5">
            <CandidateDateField
              label="Date"
              date={exp.date}
              onChangeDate={(value) =>
                handleChangeCertification(index, "date", value)
              }
              years={years}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
