import { useState, type ReactNode } from "react";

import { DashboardTopBar } from "./DashboardTopBar";
import { SideNavigation } from "./SideNavigation";

export function DashboardShell({
  currentSection,
  pageIcon,
  children,
}: {
  currentSection:
    | "Location"
    | "Department"
    | "Employee’s"
    | "Framework’s"
    | "Roles";
  pageIcon: string;
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className="flex h-dvh min-h-0 w-full overflow-hidden bg-[var(--ds-color-bg-app)] text-[var(--ds-color-text-primary)]"
      style={{ fontFamily: "var(--ds-font-sans)" }}
    >
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}
      <SideNavigation
        currentSection={currentSection}
        isOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col p-0 md:p-2 md:pl-0">
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-none border-[#1d1d1d] bg-[var(--ds-color-bg-panel)] md:rounded-xl md:border">
          <DashboardTopBar
            currentSection={currentSection}
            pageIcon={pageIcon}
            mobileNavOpen={mobileNavOpen}
            onOpenMobile={() => setMobileNavOpen(true)}
          />
          {children}
        </div>
      </main>
    </div>
  );
}
