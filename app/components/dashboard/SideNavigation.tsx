import { useState } from "react";
import { Link } from "react-router";

import { APP_TITLE } from "@/lib/app-config";

import { Icon } from "./Icon";

const primaryNav = [
  ["Dashboard", "e9d6d.svg"],
  ["AI Gap Analysis", "fb752.svg"],
  ["Document Hub", "8a942.svg"],
  ["Task / Workflow", "fbe85.svg"],
  ["Compliance Bot", "76780.svg"],
  ["Reports", "9db4b.svg"],
] as const;
const configNav = [
  ["Location", "cce76.svg", "/"],
  ["Department", "3dbb4.svg", "/department"],
  ["Employee’s", "9c9e3.svg", "/employees"],
  ["Roles", "c7f8c.svg", "/roles"],
  ["Framework’s", "d86ad.svg", "/frameworks"],
] as const;
const asset = (name: string) => `/figma-assets/${name}`;

/** Responsive app navigation and account footer. */
export function SideNavigation({
  currentSection,
  isOpen,
  onCloseMobile,
}: {
  currentSection:
    | "Location"
    | "Department"
    | "Employee’s"
    | "Framework’s"
    | "Roles";
  isOpen: boolean;
  onCloseMobile: () => void;
}) {
  const [configExpanded, setConfigExpanded] = useState(true);
  return (
    <aside
      className={`${isOpen ? "fixed inset-y-0 left-0 z-40 flex w-[270px] shadow-2xl" : "hidden"} h-full min-h-0 shrink-0 flex-col overflow-y-auto overscroll-contain bg-[#101010] px-4 pb-4 pt-5 md:relative md:inset-auto md:left-auto md:z-auto md:flex md:w-[clamp(190px,18.75vw,270px)] md:shadow-none`}
    >
      <div className="mb-7 flex h-6 items-center justify-between px-0.5">
        <Link
          to="/"
          aria-label={`${APP_TITLE} home`}
          className="flex items-center gap-1.5"
        >
          <img
            src="/figma-assets/complytune-logo.svg"
            alt=""
            width={128}
            height={24}
            className="shrink-0"
          />
        </Link>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-[8px] p-1 text-[#b7b7b7] hover:bg-[#202020]"
        >
          <Icon src="b2d25.svg" className="size-4" />
        </button>
      </div>

      <nav
        aria-label="Primary navigation"
        className="flex min-h-0 flex-1 flex-col justify-between"
      >
        <div className="space-y-[10px]">
          {primaryNav.map(([label, icon]) => (
            <button
              key={label}
              type="button"
              className="flex h-9 w-full items-center gap-2 rounded-[8px] px-2 text-left text-[16px] tracking-[-0.096px] text-[#aaa] transition-colors hover:bg-[#1b1b1b] hover:text-white"
            >
              <Icon src={icon} className="size-5" />
              {label}
            </button>
          ))}
          <div>
            <button
              type="button"
              aria-expanded={configExpanded}
              onClick={() => setConfigExpanded((value) => !value)}
              className="flex h-9 w-full items-center justify-between rounded-[8px] border border-[#a32cff] bg-[#7900e8] px-2 text-left text-[16px] font-medium tracking-[-0.096px] text-white shadow-[inset_0_2px_8px_rgba(190,102,255,0.42)]"
            >
              <span className="flex items-center gap-2">
                <Icon src="3743f.svg" className="size-5" />
                Configurations
              </span>
              <Icon
                src="87276.svg"
                className={`size-5 transition-transform ${configExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {configExpanded && (
              <div className="mt-1 space-y-0.5 pl-3">
                {configNav.map(([label, icon, href]) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={onCloseMobile}
                    aria-current={label === currentSection ? "page" : undefined}
                    className={`flex h-9 w-full items-center gap-2 rounded-[8px] px-2 text-left text-[16px] tracking-[-0.096px] transition-colors ${label === currentSection ? "bg-[#242424] text-white" : "text-[#a5a5a5] hover:bg-[#1b1b1b] hover:text-white"}`}
                  >
                    <Icon src={icon} className="size-5" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-1 pt-4">
          <button
            type="button"
            className="flex h-9 w-full items-center gap-2 rounded-[8px] px-2 text-left text-[16px] tracking-[-0.096px] text-[#aaa] hover:bg-[#1b1b1b]"
          >
            <Icon src="da856.svg" className="size-5" />
            Settings
          </button>
          <button
            type="button"
            className="flex h-9 w-full items-center gap-2 rounded-[8px] px-2 text-left text-[16px] tracking-[-0.096px] text-[#aaa] hover:bg-[#1b1b1b]"
          >
            <Icon src="8ed02.svg" className="size-5" />
            Support
          </button>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#181818] p-3">
            <img
              src={asset("a3564.png")}
              alt=""
              className="size-10 rounded-full object-cover"
            />
            <div className="min-w-0 text-[12px] leading-[19px]">
              <div className="truncate text-[14px] font-medium tracking-[-0.084px] text-white">
                Srinivas Talabathula
              </div>
              <div className="truncate text-[#9a9a9a]">
                srinivas93811@gmail.com
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
