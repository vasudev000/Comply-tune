import { Icon } from "./Icon";

const asset = (name: string) => `/figma-assets/${name}`;

function DepartmentSummaryIllustration() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-4 top-[23px] h-[96px] w-[121px]"
    >
      <div className="absolute left-[-0.36px] top-5 h-[76px] w-[86.39px] rounded-t-[7.97475px] bg-[#262626]" />
      <div className="absolute left-[35px] top-5 h-[76px] w-[86.39px] rounded-t-[7.97475px] bg-[#262626]" />
      <div
        className="absolute right-[18px] top-0 h-[96px] w-[87px]"
        style={{
          filter:
            "drop-shadow(-3.98737px -1.99369px 9.96843px rgba(0,0,0,0.1))",
        }}
      >
        <div className="absolute left-[0.25px] top-[0.35px] h-[95.65px] w-[86.39px] rounded-t-[7.97475px] bg-[#282828]">
          <div className="absolute left-[10px] top-[10px] flex h-[66px] w-[67px] flex-col gap-[3px] opacity-30">
            {Array.from({ length: 3 }, (_, row) => (
              <div key={row} className="grid h-5 grid-cols-2 gap-1">
                {Array.from({ length: 2 }, (_, cell) => (
                  <span key={cell} className="rounded-[2px] bg-[#3A3A3A]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationSummaryIllustration() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-4 top-[23px] h-[97px] w-[110px]"
    >
      <div className="absolute left-[-0.36px] top-5 h-[77px] w-[86.39px] rounded-t-[7.97475px] bg-[#262626]" />
      <div
        className="absolute right-0 top-0 h-[97px] w-[87px]"
        style={{
          filter:
            "drop-shadow(-65.7917px -27.2471px 28.5762px rgba(0,0,0,0.01)) drop-shadow(-37.2155px -15.2849px 23.9242px rgba(0,0,0,0.05)) drop-shadow(-16.6141px -6.64562px 17.9432px rgba(0,0,0,0.09)) drop-shadow(-3.98737px -1.99369px 9.96843px rgba(0,0,0,0.1))",
        }}
      >
        <div className="absolute left-[0.25px] top-[0.35px] h-[96.65px] w-[86.39px] rounded-t-[7.97475px] bg-[#292929]">
          <div className="absolute left-[10px] top-[10px] flex h-[79px] w-[67px] flex-col justify-between gap-[3px] opacity-30">
            {Array.from({ length: 3 }, (_, row) => (
              <div key={row} className="grid h-5 grid-cols-3 gap-1">
                {Array.from({ length: 3 }, (_, cell) => (
                  <span key={cell} className="rounded-[2px] bg-[#373737]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeSummaryIllustration() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[15px] top-[23px] h-[97px] w-[110px]"
    >
      <div className="absolute left-0 top-5 h-[77px] w-[86px]">
        <div className="absolute left-[-0.36px] top-0 h-[77px] w-[86.393px] rounded-t-[7.975px] bg-[#262626]" />
      </div>
      <div
        className="absolute right-0 top-0 h-[97px] w-[87px]"
        style={{
          filter:
            "drop-shadow(-87px -36px 13px rgba(20,20,20,0)) drop-shadow(-55px -23px 12px rgba(20,20,20,0.01)) drop-shadow(-31px -13px 10px rgba(20,20,20,0.05)) drop-shadow(-14px -6px 7.5px rgba(20,20,20,0.09)) drop-shadow(-3px -1px 4px rgba(20,20,20,0.1))",
        }}
      >
        <div className="absolute left-[0.25px] top-[0.35px] h-[96.653px] w-[86.393px] rounded-t-[7.975px] bg-[#292929]" />
        <div className="absolute left-[8.3px] top-[17px] h-[47.001px] w-[71.394px] overflow-clip">
          <div className="absolute inset-[-0.29%_-0.19%_-51.61%_0.19%]">
            <img
              src={asset("bb525.svg")}
              alt=""
              className="absolute inset-0 size-full"
            />
          </div>
          <div className="absolute contents inset-[-0.29%_-0.19%_-21.23%_0.19%]">
            <div className="absolute inset-[7.3%_-0.19%_-13.63%_0.19%]">
              <img
                src={asset("2d1f1.svg")}
                alt=""
                className="absolute inset-0 size-full"
              />
            </div>
            <img
              src={asset("09c3b.svg")}
              alt=""
              className="absolute left-[14.42px] top-[-0.14px] h-[57.115px] w-[42.836px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleSummaryIllustration() {
  return (
    <img
      src={asset("role-summary-illustration.svg")}
      alt=""
      aria-hidden="true"
      className="absolute right-[11px] top-[-32px] w-[187px] max-w-none"
    />
  );
}

export function SummaryCard({
  title,
  count,
  change,
  icon,
  tone,
  illustration = "location",
}: {
  title: string;
  count: number | string;
  change: string;
  icon: string;
  tone: "green" | "red" | "purple";
  illustration?: "location" | "department" | "employee" | "role";
}) {
  const toneClass =
    tone === "green"
      ? "text-[#00c47c]"
      : tone === "red"
        ? "text-[#ff3030]"
        : "text-[#a000ff]";
  const iconBackground =
    tone === "green"
      ? "bg-[#00b879]"
      : tone === "red"
        ? "bg-[#ff3030]"
        : "bg-[#9400ff]";
  return (
    <section className="relative flex h-[120px] min-w-0 items-center overflow-hidden rounded-xl border border-[#292929] bg-[#1b1b1b] px-5 py-4">
      <div className="relative z-10 flex min-w-0 flex-col gap-1">
        <h2 className="text-[18px] font-medium leading-6 text-[#f4f4f4]">
          {title}
        </h2>
        <div className="text-[32px] font-medium leading-9 tracking-[-0.6px] text-white">
          {count}
        </div>
        <div className="font-geist-mono flex items-center gap-1 whitespace-nowrap text-[14px] text-[#828282]">
          <span
            className={`flex size-5 items-center justify-center rounded-[4px] ${iconBackground}`}
          >
            <Icon src={icon} className="size-5" />
          </span>
          <span className={toneClass}>{change.split(" ")[0]}</span>
          <span>{change.slice(change.indexOf(" ") + 1)}</span>
        </div>
      </div>
      {illustration === "role" ? (
        <RoleSummaryIllustration />
      ) : illustration === "employee" ? (
        <EmployeeSummaryIllustration />
      ) : illustration === "department" ? (
        <DepartmentSummaryIllustration />
      ) : (
        <LocationSummaryIllustration />
      )}
    </section>
  );
}
