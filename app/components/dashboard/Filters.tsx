import { Icon } from "./Icon";

/** Select control used by table filters. */
export function FilterSelect({
  label,
  value,
  allValue,
  options,
  onChange,
}: {
  label: string;
  value: string;
  allValue: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative inline-flex h-9 min-w-[110px] items-center justify-center gap-2 rounded-[8px] border border-transparent bg-[#232323] px-3 text-[16px] tracking-[-0.096px] text-[#c6c6c6] focus-within:border-[#5f2b84]">
      <span aria-hidden="true">{value === allValue ? label : value}</span>
      <Icon src="70682.svg" className="pointer-events-none size-5" />
      <select
        aria-label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 size-full cursor-pointer appearance-none opacity-0"
      >
        <option value={allValue}>{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Status-specific filter preset. */
export function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FilterSelect
      label="Status"
      value={value}
      allValue="All statuses"
      options={["Active", "In-active"]}
      onChange={onChange}
    />
  );
}
