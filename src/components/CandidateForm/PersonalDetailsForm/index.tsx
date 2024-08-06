import CandidateField from "../CandidateFormField";

export default function PersonalDetailsForm({
  candidate,
  onChange,
}: CommonCandidateFormProps) {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5">
          <CandidateField
            label="First Name"
            name="firstName"
            value={candidate.firstName}
            onChange={(value) => onChange("firstName", value)}
          />
          <CandidateField
            label="Last Name"
            name="lastName"
            value={candidate.lastName}
            onChange={(value) => onChange("lastName", value)}
          />
        </div>

        <CandidateField
          label="Job Title"
          name="jobTitle"
          value={candidate.jobTitle}
          onChange={(value) => onChange("jobTitle", value)}
          className="mt-5"
        />

        <CandidateField
          label="Email Address"
          name="email"
          value={candidate.email}
          onChange={(value) => onChange("email", value)}
          className="mt-5"
        />

        <CandidateField
          label="Phone Number"
          name="phoneNumber"
          value={candidate.phoneNumber}
          onChange={(value) => onChange("phoneNumber", value)}
          className="mt-5"
        />

        <CandidateField
          label="LinkedIn"
          name="linkedin"
          value={candidate.linkedin}
          onChange={(value) => onChange("linkedin", value)}
          className="mt-5"
        />

        <CandidateField
          label="Address"
          name="address"
          value={candidate.address}
          onChange={(value) => onChange("address", value)}
          className="mt-5"
          isTextarea
          isDescription={false}
        />
      </div>
    </>
  );
}
