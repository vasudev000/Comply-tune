import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleDialog, type NewRole } from "@/components/dashboard/RoleDialog";
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
import { demoRoles } from "@/lib/demo-data";

type Role = NewRole & { id: number };

const roleColumns: TableColumn<Role>[] = [
  {
    key: "code",
    label: "Role ID",
    icon: "58b4a.svg",
    headerClassName: "min-w-[130px] whitespace-nowrap",
    cellClassName: "min-w-[130px] whitespace-nowrap",
    render: (row) => row.code,
  },
  {
    key: "name",
    label: "Role Name",
    icon: "c7f8c.svg",
    headerClassName: "min-w-[190px] whitespace-nowrap",
    cellClassName: "min-w-[190px] whitespace-nowrap",
    render: (row) => row.name,
  },
  {
    key: "department",
    label: "Department",
    icon: "3dbb4.svg",
    headerClassName: "min-w-[220px] whitespace-nowrap",
    cellClassName: "min-w-[220px] whitespace-nowrap",
    render: (row) => row.department,
  },
  {
    key: "members",
    label: "Members",
    icon: "d0cee.svg",
    headerClassName: "w-[120px] whitespace-nowrap",
    cellClassName: "w-[120px] whitespace-nowrap",
    render: (row) => row.members,
  },
  {
    key: "accessLevel",
    label: "Access Level",
    icon: "58b4a.svg",
    headerClassName: "min-w-[180px] whitespace-nowrap",
    cellClassName: "min-w-[180px] whitespace-nowrap",
    render: (row) => row.accessLevel,
  },
  {
    key: "status",
    label: "Status",
    icon: "8a537.svg",
    headerClassName: "min-w-[130px] whitespace-nowrap",
    cellClassName: "min-w-[130px] whitespace-nowrap",
    render: (row) => <StatusTag status={row.status} />,
  },
];

export function meta() {
  return [
    { title: `Roles | ${APP_TITLE}` },
    {
      name: "description",
      content: "Manage organization roles and access levels.",
    },
  ];
}

export default function RolesRoute() {
  const [rows, setRows] = useState<Role[]>(
    demoRoles.map((row, index) => ({ ...row, id: index + 1 })),
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery =
          `${row.code} ${row.name} ${row.department} ${row.accessLevel}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return (
          matchesQuery && (status === "All statuses" || row.status === status)
        );
      }),
    [rows, query, status],
  );

  function addRole(role: NewRole) {
    setRows((current) => [
      ...current,
      { ...role, id: Math.max(0, ...current.map((row) => row.id)) + 1 },
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
    <DashboardShell currentSection="Roles" pageIcon="c7f8c.svg">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 pb-5 pt-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <SummaryCard
            title="Active Roles"
            count={activeCount}
            change="+2 roles added"
            icon="fde0b.svg"
            tone="green"
            illustration="role"
          />
          <SummaryCard
            title="Inactive Roles"
            count={inactiveCount}
            change="+1 role updated"
            icon="d6fa0.svg"
            tone="red"
            illustration="role"
          />
          <SummaryCard
            title="Total Roles"
            count={rows.length}
            change="Access levels managed"
            icon="9beff.svg"
            tone="purple"
            illustration="role"
          />
        </div>
        <section aria-label="Roles" className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#242424] pt-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search roles ..."
              ariaLabel="Search roles"
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
                Add Role
              </AppButton>
            </div>
          </div>
          <DashboardTable
            rows={filteredRows}
            columns={roleColumns}
            selected={selected}
            onToggle={toggleRow}
            onToggleAll={(checked) =>
              setSelected(checked ? filteredRows.map((row) => row.id) : [])
            }
            minWidth="min-w-[1180px]"
            emptyMessage="No roles match your search."
          />
        </section>
      </div>
      {showAdd && (
        <RoleDialog onClose={() => setShowAdd(false)} onAdd={addRole} />
      )}
    </DashboardShell>
  );
}
