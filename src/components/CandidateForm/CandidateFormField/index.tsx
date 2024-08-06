interface CandidateFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isTextarea?: boolean;
  isDescription?: boolean;
  isNumber?: boolean;
}

const CandidateField = ({
  label,
  name,
  value,
  onChange,
  className,
  isTextarea,
  isDescription = true,
  isNumber,
}: CandidateFieldProps) => {
  return (
    <div className={className}>
      <label>
        {label}
        {isTextarea ? (
          <textarea
            name={name}
            className="form-control"
            rows={10}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isDescription
                ? `Use '-' for bullet points and give 2 breakline above it.\nExample:\nHalo!\n\n- This is my #1 achievement\n- This is my #2 achievment`
                : ""
            }
          />
        ) : (
          <input
            type={isNumber ? "number" : "text"}
            name={name}
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </label>
    </div>
  );
};

export default CandidateField;
