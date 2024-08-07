interface DateFieldProps {
  label: string;
  date: string;
  onChangeDate: (value: string) => void;
  years: number[];
}

const CandidateDateField = ({
  label,
  date,
  onChangeDate,
  years,
}: DateFieldProps) => {
  const [month, year] = date.split(" ");

  return (
    <label>
      {label}
      <div className="flex items-center gap-2">
        <select
          name="month"
          className="form-control w-full"
          value={month}
          onChange={(e) =>
            onChangeDate(
              e.target.value + " " + (year ?? new Date().getFullYear()),
            )
          }
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          name="year"
          className="form-control w-full"
          value={year}
          onChange={(e) => {
            onChangeDate(
              (month ?? "January") + " " + e.target.value.toString(),
            );
          }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};

export default CandidateDateField;
