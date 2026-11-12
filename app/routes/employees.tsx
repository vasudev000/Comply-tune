import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  EmployeeDialog,
  type NewEmployee,
} from "@/components/dashboard/EmployeeDialog";
import {
  AddIcon,
  AppButton,
  DashboardTable,
  SearchInput,
  StatusFilter,
  StatusTag,
  SummaryCard,
  type TableColumn,
} from "@/components/dashboard/shared";
import { APP_TITLE } from "@/lib/app-config";
import { demoEmployees } from "@/lib/demo-data";

type Employee = NewEmployee & { id: number };

const employeeColumns: TableColumn<Employee>[] = [
  {
    key: "employeeId",
    label: "Employee ID",
    icon: "58b4a.svg",
    headerClassName: "w-[120px] whitespace-nowrap",
    cellClassName: "w-[120px] whitespace-nowrap",
    render: (row) => row.employeeId,
  },
  {
    key: "name",
    label: "Employee Name",
    icon: "employee-name.svg",
    headerClassName: "w-[220px] whitespace-nowrap",
    cellClassName: "w-[220px] whitespace-nowrap",
    render: (row) => (
      <span>
        {row.name} <span className="text-[#828282]">/ </span>
        <a
          className="text-[#828282] underline decoration-[#888] underline-offset-2 hover:text-white"
          href={`mailto:${row.email}`}
        >
          {row.email}
        </a>
      </span>
    ),
  },
  {
    key: "role",
    label: "Role / Department",
    icon: "3f14e.svg",
    headerClassName: "w-[250px] whitespace-nowrap",
    cellClassName: "w-[250px] whitespace-nowrap",
    render: (row) => row.role,
  },
  {
    key: "location",
    label: "Location",
    icon: "c76db.svg",
    headerClassName: "w-[190px] whitespace-nowrap",
    cellClassName: "w-[190px] whitespace-nowrap",
    render: (row) => row.location,
  },
  {
    key: "status",
    label: "Status",
    icon: "1a35e.svg",
    headerClassName: "w-[123px] whitespace-nowrap",
    cellClassName: "w-[123px] whitespace-nowrap",
    render: (row) => <StatusTag status={row.status} />,
  },
];

export function meta() {
  return [
    { title: `Employees | ${APP_TITLE}` },
    { name: "description", content: "Manage organization employees." },
  ];
}

export default function EmployeesRoute() {
  const [rows, setRows] = useState<Employee[]>(
    demoEmployees.map((row, index) => ({ ...row, id: index + 1 })),
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery =
          `${row.employeeId} ${row.name} ${row.email} ${row.role} ${row.location}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return (
          matchesQuery && (status === "All statuses" || row.status === status)
        );
      }),
    [rows, query, status],
  );

  function addEmployee(employee: NewEmployee) {
    setRows((current) => [
      ...current,
      { ...employee, id: Math.max(0, ...current.map((row) => row.id)) + 1 },
    ]);
    setShowAdd(false);
  }

  function toggleRow(id: number) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  const activeCount = rows.filter((row) => row.status === "Active").length;
  const inactiveCount = rows.filter((row) => row.status === "In-active").length;

  return (
    <DashboardShell currentSection="Employee’s" pageIcon="9c9e3.svg">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 pb-5 pt-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <SummaryCard
            title="Active Employee’s"
            count={activeCount}
            change="+26 Employee’s added"
            icon="fde0b.svg"
            tone="green"
            illustration="employee"
          />
          <SummaryCard
            title="Inactive Employee’s"
            count={inactiveCount}
            change="+4 Employee’s removed"
            icon="d6fa0.svg"
            tone="red"
            illustration="employee"
          />
          <SummaryCard
            title="Total Employee’s"
            count={rows.length}
            change="+26 Employee’s added"
            icon="9beff.svg"
            tone="purple"
            illustration="employee"
          />
        </div>

        <section
          aria-label="Employees"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#242424] pt-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search location ..."
              ariaLabel="Search employees"
            />
            <div className="flex items-center gap-2">
              <StatusFilter value={status} onChange={setStatus} />
              <AppButton
                type="button"
                variant="primary"
                onClick={() => setShowAdd(true)}
                className="h-9 px-3"
              >
                <AddIcon />
                Add Employee
              </AppButton>
            </div>
          </div>
          <DashboardTable
            rows={filteredRows}
            columns={employeeColumns}
            selected={selected}
            onToggle={toggleRow}
            onToggleAll={(checked) =>
              setSelected(checked ? filteredRows.map((row) => row.id) : [])
            }
            minWidth="min-w-[975px]"
            emptyMessage="No employees match your search."
          />
        </section>
      </div>
      {showAdd && (
        <EmployeeDialog onClose={() => setShowAdd(false)} onAdd={addEmployee} />
      )}
    </DashboardShell>
  );
}
