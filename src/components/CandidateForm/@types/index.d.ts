interface CommonCandidateFormProps {
  candidate: CandidateItem;
  templates: Template[];
  onChange: (key: keyof CandidateItem, value: CandidateItem[key]) => void;
}
