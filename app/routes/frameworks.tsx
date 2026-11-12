import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  DashboardTable,
  FilterSelect,
  SearchInput,
  type TableColumn,
} from "@/components/dashboard/shared";
import { APP_TITLE } from "@/lib/app-config";
import { demoFrameworks } from "@/lib/demo-data";

type Framework = {
  id: number;
  code: string;
  name: string;
  category: string;
  region: string;
  applicableClauses: number;
  totalClauses: number;
};

const frameworkColumns: TableColumn<Framework>[] = [
  {
    key: "code",
    label: "Framework ID",
    icon: "58b4a.svg",
    headerClassName: "min-w-[163px] whitespace-nowrap",
    cellClassName: "min-w-[163px] whitespace-nowrap",
    render: (row) => row.code,
  },
  {
    key: "name",
    label: "Framework Name",
    icon: "201f8.svg",
    headerClassName: "min-w-[260px] whitespace-nowrap",
    cellClassName: "min-w-[260px]",
    render: (row) => row.name,
  },
  {
    key: "category",
    label: "Category",
    icon: "378c4.svg",
    headerClassName: "min-w-[289px] whitespace-nowrap",
    cellClassName: "min-w-[289px]",
    render: (row) => row.category,
  },
  {
    key: "region",
    label: "Region",
    icon: "3a7f8.svg",
    headerClassName: "min-w-[169px] whitespace-nowrap",
    cellClassName: "min-w-[169px] whitespace-nowrap",
    render: (row) => row.region,
  },
  {
    key: "clauses",
    label: "Clauses",
    icon: "0bb14.svg",
    headerClassName: "min-w-[160px] whitespace-nowrap",
    cellClassName: "min-w-[160px] whitespace-nowrap",
    render: (row) => (
      <>
        <span>
          {row.applicableClauses}/{row.totalClauses}
        </span>{" "}
        <span className="text-[#828282]">Applicable</span>
      </>
    ),
  },
];

export function meta() {
  return [
    { title: `Frameworks | ${APP_TITLE}` },
    { name: "description", content: "Manage compliance frameworks." },
  ];
}

export default function FrameworksRoute() {
  const [rows] = useState(
    demoFrameworks.map((row, index) => ({ ...row, id: index + 1 })),
  );
  const regionOptions = Array.from(
    new Set(rows.map((framework) => framework.region)),
  );
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [selected, setSelected] = useState<number[]>([]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery =
          `${row.code} ${row.name} ${row.category} ${row.region}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return (
          matchesQuery && (region === "All regions" || row.region === region)
        );
      }),
    [query, region],
  );

  function toggleRow(id: number) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  return (
    <DashboardShell currentSection="Framework’s" pageIcon="d86ad.svg">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 pb-5 pt-4 md:px-6">
        <section
          aria-label="Frameworks"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search framework ..."
              ariaLabel="Search frameworks"
            />
            <div className="flex items-center gap-2">
              <FilterSelect
                label="Region"
                value={region}
                allValue="All regions"
                options={regionOptions}
                onChange={setRegion}
              />
            </div>
          </div>
          <DashboardTable
            rows={filteredRows}
            columns={frameworkColumns}
            selected={selected}
            onToggle={toggleRow}
            onToggleAll={(checked) =>
              setSelected(checked ? filteredRows.map((row) => row.id) : [])
            }
            minWidth="min-w-[1100px]"
            emptyMessage="No frameworks match your search."
          />
        </section>
      </div>
    </DashboardShell>
  );
}
