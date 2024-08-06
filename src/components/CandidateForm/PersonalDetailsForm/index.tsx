import { FormEvent } from "react";

export default function PersonalDetailsForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <input name="firstName" className="form-control" />
            <input name="lastName" />
          </div>
        </form>
      </div>
    </>
  );
}
