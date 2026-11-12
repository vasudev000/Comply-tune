import { useState } from "react";

import { Icon } from "./Icon";

/** Breadcrumb, unit picker, mobile menu trigger, and notifications. */
export function DashboardTopBar({
  currentSection,
  pageIcon,
  onOpenMobile,
  mobileNavOpen,
}: {
  currentSection: string;
  pageIcon: string;
  onOpenMobile: () => void;
  mobileNavOpen: boolean;
}) {
  const [unitMenuOpen, setUnitMenuOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Hyderabad, Unit I");
  return (
    <header className="flex h-[60px] min-h-[60px] shrink-0 items-center justify-between gap-3 border-b border-[#222] px-3 md:px-8">
      <div className="flex min-w-0 items-center gap-2 text-[18px] tracking-[-0.108px] text-[#bdbdbd]">
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
          onClick={onOpenMobile}
          className="flex size-9 shrink-0 items-center justify-center rounded-[8px] text-[#bdbdbd] hover:bg-[#202020] md:hidden"
        >
          <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
            <span className="h-[2px] rounded bg-current" />
            <span className="h-[2px] rounded bg-current" />
            <span className="h-[2px] rounded bg-current" />
          </span>
        </button>
        <span className="hidden text-[#8e8e8e] sm:inline">Configuration</span>
        <Icon
          src="70682.svg"
          className="hidden size-3 -rotate-90 opacity-70 sm:block"
        />
        <Icon src={pageIcon} className="size-5" />
        <span className="truncate text-white">{currentSection}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={unitMenuOpen}
            onClick={() => setUnitMenuOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setUnitMenuOpen(false);
            }}
            className="flex h-10 items-center gap-2 rounded-[8px] border border-[#282828] px-3 text-[14px] tracking-[-0.084px] text-[#ddd] hover:bg-[#202020]"
          >
            <Icon src="9c129.svg" className="size-5" />
            <span>{selectedUnit}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`shrink-0 transition-transform ${unitMenuOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M9.69129 14.1961L4.33321 8.67075C3.99887 8.32591 4.20153 7.66683 4.64188 7.66683H15.358C15.7984 7.66683 16.001 8.32591 15.6667 8.67075L10.3086 14.1961C10.131 14.3793 9.86888 14.3793 9.69129 14.1961Z"
                fill="#858383"
              />
            </svg>
          </button>
          {unitMenuOpen && (
            <div
              role="menu"
              aria-label="Select organization unit"
              className="absolute right-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-[8px] border border-[#303030] bg-[#1b1b1b] p-1 shadow-xl"
            >
              {[
                "Hyderabad, Unit I",
                "Hyderabad, Unit II",
                "Hyderabad, Unit III",
              ].map((unit) => (
                <button
                  key={unit}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selectedUnit === unit}
                  onClick={() => {
                    setSelectedUnit(unit);
                    setUnitMenuOpen(false);
                  }}
                  className={`block w-full whitespace-nowrap rounded-[6px] px-3 py-2 text-left text-[14px] hover:bg-[#292929] ${selectedUnit === unit ? "text-white" : "text-[#bdbdbd]"}`}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-[8px] border border-[#282828] hover:bg-[#202020]"
        >
          <Icon src="6f59b.svg" className="size-5" />
        </button>
      </div>
    </header>
  );
}
