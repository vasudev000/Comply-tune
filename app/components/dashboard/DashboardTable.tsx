import type { ReactNode } from "react";

import { Icon } from "./Icon";

export type TableColumn<T> = {
  key: string;
  label: string;
  icon: string;
  headerClassName: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
};

export function DashboardTable<T extends { id: number }>({
  rows,
  columns,
  selected,
  onToggle,
  onToggleAll,
  onRowClick,
  minWidth,
  emptyMessage,
  headerHeightClass = "h-12",
  rowHeightClass = "h-12",
}: {
  rows: T[];
  columns: TableColumn<T>[];
  selected: number[];
  onToggle: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onRowClick?: (row: T) => void;
  minWidth: string;
  emptyMessage: string;
  headerHeightClass?: string;
  rowHeightClass?: string;
}) {
  const allSelected =
    rows.length > 0 && rows.every((row) => selected.includes(row.id));
  return (
    <div className="min-h-0 flex-1 overflow-auto overscroll-contain pt-3">
      <table
        className={`w-full ${minWidth} border-separate border-spacing-0 text-left text-[16px] tracking-[-0.084px]`}
      >
        <thead className="sticky top-0 z-10 bg-[var(--ds-color-bg-header)] text-[var(--ds-color-text-muted)]">
          <tr className={headerHeightClass}>
            <th
              className="sticky top-0 w-[68px] bg-[var(--ds-color-bg-header)] px-4"
              style={{
                boxShadow:
                  "inset 0 1px var(--ds-stroke-subtle), inset 0 -1px var(--ds-stroke-subtle)",
              }}
            >
              <input
                type="checkbox"
                aria-label="Select all visible rows"
                checked={allSelected}
                onChange={(event) => onToggleAll(event.target.checked)}
                className="size-[16px] rounded-[4px] accent-[#8c16e8]"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`sticky top-0 border-l border-[var(--ds-stroke-subtle)] bg-[var(--ds-color-bg-header)] px-4 font-medium ${column.headerClassName}`}
                style={{
                  boxShadow:
                    "inset 0 1px var(--ds-stroke-subtle), inset 0 -1px var(--ds-stroke-subtle)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Icon src={column.icon} className="size-5 opacity-75" />
                  {column.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={(event) => {
                if (!onRowClick) return;
                if (
                  event.target instanceof HTMLElement &&
                  event.target.closest("a, button, input, select")
                ) {
                  return;
                }
                onRowClick(row);
              }}
              onKeyDown={(event) => {
                if (
                  onRowClick &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  onRowClick(row);
                }
              }}
              className={`${rowHeightClass} text-[var(--ds-color-text-body)] hover:bg-[#1a1a1a] ${onRowClick ? "cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#8d21ed]" : ""}`}
            >
              <td className="border-b border-[var(--ds-stroke-subtle)] px-4">
                <input
                  type="checkbox"
                  aria-label={`Select row ${row.id}`}
                  checked={selected.includes(row.id)}
                  onChange={() => onToggle(row.id)}
                  className="size-[16px] rounded-[4px] accent-[#8c16e8]"
                />
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`max-w-[300px] truncate border-b border-l border-[var(--ds-stroke-subtle)] px-4 ${column.cellClassName ?? ""} ${column.key === "status" ? "overflow-visible" : ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-12 text-center text-sm text-[#888]"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
