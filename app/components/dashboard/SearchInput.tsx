import { Icon } from "./Icon";

/** Search field shared by configuration tables. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <label className="flex h-9 w-full max-w-[250px] items-center gap-1.5 rounded-md border border-[#292929] bg-[#111] px-3 text-[#777] focus-within:border-[#5f2b84]">
      <Icon src="900a3.svg" className="size-5 opacity-70" />
      <span className="sr-only">{ariaLabel}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#777]"
      />
    </label>
  );
}
