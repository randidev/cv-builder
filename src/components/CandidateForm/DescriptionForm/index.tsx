import CandidateField from "../CandidateFormField";

export default function DescriptionForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  return (
    <>
      <div>
        <CandidateField
          label="Description"
          name="description"
          value={candidate.description}
          onChange={(value) => onChange("description", value)}
          isTextarea
        />
      </div>
    </>
  );
}
