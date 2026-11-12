import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  DepartmentDialog,
  type NewDepartment,
} from "@/components/dashboard/DepartmentDialog";
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
import { demoDepartments } from "@/lib/demo-data";

type DepartmentStatus = "Active" | "In-active";
type Department = NewDepartment & { id: number };

const departmentColumns: TableColumn<Department>[] = [
  {
    key: "code",
    label: "Department Code",
    icon: "18625.svg",
    headerClassName: "min-w-[212px] whitespace-nowrap",
    cellClassName: "min-w-[212px]",
    render: (row) => row.code,
  },
  {
    key: "name",
    label: "Department Name",
    icon: "58b4a.svg",
    headerClassName: "min-w-[220px]",
    cellClassName: "min-w-[220px]",
    render: (row) => row.name,
  },
  {
    key: "head",
    label: "Department Head",
    icon: "3f14e.svg",
    headerClassName: "min-w-[260px]",
    cellClassName: "min-w-[260px]",
    render: (row) => (
      <span>
        {row.head} <span className="text-[#828282]">/ </span>
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
    key: "employees",
    label: "Employee’s",
    icon: "d0cee.svg",
    headerClassName: "w-[164px]",
    cellClassName: "w-[164px]",
    render: (row) => row.employees,
  },
  {
    key: "status",
    label: "Status",
    icon: "8a537.svg",
    headerClassName: "min-w-[140px]",
    cellClassName: "min-w-[140px]",
    render: (row) => <StatusTag status={row.status} />,
  },
];

export function meta() {
  return [
    { title: `Departments | ${APP_TITLE}` },
    { name: "description", content: "Manage organization departments." },
  ];
}

export default function DepartmentRoute() {
  const [rows, setRows] = useState<Department[]>(
    demoDepartments.map((row, index) => ({ ...row, id: index + 1 })),
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [showAdd, setShowAdd] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [selected, setSelected] = useState<number[]>([]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = `${row.code} ${row.name} ${row.head} ${row.email}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery && (status === "All statuses" || row.status === status)
        );
      }),
    [rows, query, status],
  );

  function addDepartment(department: NewDepartment) {
    setRows((current) => [
      ...current,
      { ...department, id: Math.max(0, ...current.map((row) => row.id)) + 1 },
    ]);
    setShowAdd(false);
  }

  function saveDepartment(department: NewDepartment) {
    if (editingDepartment) {
      setRows((current) =>
        current.map((row) =>
          row.id === editingDepartment.id
            ? { ...row, ...department, id: row.id }
            : row,
        ),
      );
      setShowAdd(false);
      setEditingDepartment(null);
      return;
    }
    addDepartment(department);
  }

  function closeDepartmentDialog() {
    setShowAdd(false);
    setEditingDepartment(null);
  }

  function toggleRow(id: number) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  const totalCount = rows.length;
  const activeCount = rows.filter((row) => row.status === "Active").length;
  const inactiveCount = rows.filter((row) => row.status === "In-active").length;

  return (
    <DashboardShell currentSection="Department" pageIcon="3dbb4.svg">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 pb-5 pt-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <SummaryCard
            title="Active Department"
            count={activeCount}
            change="+2 Department's added"
            icon="fde0b.svg"
            tone="green"
            illustration="department"
          />
          <SummaryCard
            title="Inactive Department"
            count={inactiveCount}
            change="+4 Department's removed"
            icon="d6fa0.svg"
            tone="red"
            illustration="department"
          />
          <SummaryCard
            title="Total Department"
            count={totalCount}
            change="+2 Department's added"
            icon="9beff.svg"
            tone="purple"
            illustration="department"
          />
        </div>

        <section
          aria-label="Departments"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#242424] pt-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search location ..."
              ariaLabel="Search departments"
            />
            <div className="flex items-center gap-2">
              <StatusFilter value={status} onChange={setStatus} />
              <AppButton
                type="button"
                variant="primary"
                onClick={() => {
                  setEditingDepartment(null);
                  setShowAdd(true);
                }}
                className="h-9 px-3"
              >
                <AddIcon />
                Add Department
              </AppButton>
            </div>
          </div>
          <DashboardTable
            rows={filteredRows}
            columns={departmentColumns}
            selected={selected}
            onToggle={toggleRow}
            onToggleAll={(checked) =>
              setSelected(checked ? filteredRows.map((row) => row.id) : [])
            }
            onRowClick={(row) => {
              setEditingDepartment(row);
              setShowAdd(true);
            }}
            minWidth="min-w-[1100px]"
            emptyMessage="No departments match your search."
          />
        </section>
      </div>
      {showAdd && (
        <DepartmentDialog
          key={editingDepartment?.id ?? "new-department"}
          {...(editingDepartment ? { initialData: editingDepartment } : {})}
          onClose={closeDepartmentDialog}
          onAdd={saveDepartment}
        />
      )}
    </DashboardShell>
  );
}
