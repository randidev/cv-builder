import CandidateField from "../CandidateFormField";

const emptySkill: Skill = {
  name: "",
  score: 0,
};

export default function SkillForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  const handleAddSkill = () => {
    const newSkill = [...candidate.skills, emptySkill];
    onChange("skills", newSkill);
  };

  const handleChangeSkill = (
    index: number,
    key: keyof Skill,
    value: string
  ) => {
    const newSkills = [...candidate.skills];
    newSkills[index] = {
      ...newSkills[index],
      [key]: value,
    };
    onChange("skills", newSkills);
  };

  return (
    <div>
      <button onClick={handleAddSkill} className="button-gray w-full mb-10">
        Add Skill +
      </button>

      {candidate.skills.map((exp, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <CandidateField
            label="Name"
            name="name"
            value={exp.name}
            onChange={(value) => handleChangeSkill(index, "name", value)}
          />

          <CandidateField
            label="Score"
            name="score"
            value={String(exp.score)}
            onChange={(value) => handleChangeSkill(index, "score", value)}
            className="mt-5"
            isNumber
          />
        </div>
      ))}
    </div>
  );
}
