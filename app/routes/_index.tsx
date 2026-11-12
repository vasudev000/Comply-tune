import { useMemo, useState } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  LocationDialog,
  type NewLocation,
} from "@/components/dashboard/LocationDialog";
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
import { demoLocations } from "@/lib/demo-data";

type LocationStatus = "Active" | "In-active";
type Location = NewLocation & { id: number };

const locationColumns: TableColumn<Location>[] = [
  {
    key: "name",
    label: "Name",
    icon: "0315e.svg",
    headerClassName: "min-w-[190px]",
    render: (row) => row.name,
  },
  {
    key: "location",
    label: "Location",
    icon: "e99af.svg",
    headerClassName: "min-w-[190px]",
    render: (row) => row.location,
  },
  {
    key: "contact",
    label: "Contact",
    icon: "2c492.svg",
    headerClassName: "min-w-[190px]",
    render: (row) => (
      <a
        className="underline decoration-[#888] underline-offset-2 hover:text-white"
        href={`mailto:${row.contact}`}
      >
        {row.contact}
      </a>
    ),
  },
  {
    key: "employees",
    label: "Employee’s",
    icon: "0d5b5.svg",
    headerClassName: "w-[164px]",
    render: (row) => row.employees,
  },
  {
    key: "status",
    label: "Status",
    icon: "8a537.svg",
    headerClassName: "w-[140px]",
    render: (row) => <StatusTag status={row.status} />,
  },
];

export function meta() {
  return [
    { title: `Locations | ${APP_TITLE}` },
    { name: "description", content: "Manage organization locations." },
  ];
}

export default function HomeRoute() {
  const [rows, setRows] = useState<Location[]>(
    demoLocations.map((row, index) => ({ ...row, id: index + 1 })),
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [showAdd, setShowAdd] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = `${row.name} ${row.location} ${row.contact}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery && (status === "All statuses" || row.status === status)
        );
      }),
    [rows, query, status],
  );

  function addLocation(location: NewLocation) {
    setRows((current) => [
      ...current,
      { ...location, id: Math.max(0, ...current.map((row) => row.id)) + 1 },
    ]);
    setShowAdd(false);
  }

  function saveLocation(location: NewLocation) {
    if (editingLocation) {
      setRows((current) =>
        current.map((row) =>
          row.id === editingLocation.id
            ? { ...row, ...location, id: row.id }
            : row,
        ),
      );
      setShowAdd(false);
      setEditingLocation(null);
      return;
    }
    addLocation(location);
  }

  function closeLocationDialog() {
    setShowAdd(false);
    setEditingLocation(null);
  }

  function toggleRow(id: number) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  return (
    <DashboardShell currentSection="Location" pageIcon="cce76.svg">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 pb-5 pt-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <SummaryCard
            title="Active Locations"
            count={rows.filter((row) => row.status === "Active").length}
            change="+2 locations added"
            icon="fde0b.svg"
            tone="green"
          />
          <SummaryCard
            title="Inactive Locations"
            count={rows.filter((row) => row.status === "In-active").length}
            change="+4 locations removed"
            icon="d6fa0.svg"
            tone="red"
          />
          <SummaryCard
            title="Total Locations"
            count={rows.length}
            change="+2 locations added"
            icon="9beff.svg"
            tone="purple"
          />
        </div>

        <section
          aria-label="Locations"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#242424] pt-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search location ..."
              ariaLabel="Search locations"
            />
            <div className="flex items-center gap-2">
              <StatusFilter value={status} onChange={setStatus} />
              <AppButton
                type="button"
                variant="primary"
                onClick={() => {
                  setEditingLocation(null);
                  setShowAdd(true);
                }}
                className="h-9 px-3"
              >
                <AddIcon />
                Add location
              </AppButton>
            </div>
          </div>
          <DashboardTable
            rows={filteredRows}
            columns={locationColumns}
            selected={selected}
            onToggle={toggleRow}
            onToggleAll={(checked) =>
              setSelected(checked ? filteredRows.map((row) => row.id) : [])
            }
            onRowClick={(row) => {
              setEditingLocation(row);
              setShowAdd(true);
            }}
            minWidth="min-w-[960px]"
            emptyMessage="No locations match your search."
          />
        </section>
      </div>
      {showAdd && (
        <LocationDialog
          key={editingLocation?.id ?? "new-location"}
          {...(editingLocation ? { initialData: editingLocation } : {})}
          onClose={closeLocationDialog}
          onAdd={saveLocation}
        />
      )}
    </DashboardShell>
  );
}
