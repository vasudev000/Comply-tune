// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DashboardTable, type TableColumn } from "./DashboardTable";

type Row = { id: number; name: string };

const columns: TableColumn<Row>[] = [
  {
    key: "name",
    label: "Name",
    icon: "0315e.svg",
    headerClassName: "min-w-[120px]",
    render: (row) => row.name,
  },
];

describe("DashboardTable interactions", () => {
  let container: HTMLDivElement;
  let root: Root;

  afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
  });

  it("opens a row when clicked and routes checkbox changes to selection", () => {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    const onRowClick = vi.fn();
    const onToggle = vi.fn();
    const onToggleAll = vi.fn();

    act(() => {
      root.render(
        <DashboardTable
          rows={[{ id: 1, name: "Quality Assurance" }]}
          columns={columns}
          selected={[]}
          onToggle={onToggle}
          onToggleAll={onToggleAll}
          onRowClick={onRowClick}
          minWidth="min-w-[300px]"
          emptyMessage="No rows"
        />,
      );
    });

    const row = container.querySelector("tbody tr");
    expect(row).not.toBeNull();
    act(() => row?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(onRowClick).toHaveBeenCalledWith({
      id: 1,
      name: "Quality Assurance",
    });

    const rowCheckbox = container.querySelector("tbody input[type=checkbox]");
    expect(rowCheckbox).not.toBeNull();
    act(() => (rowCheckbox as HTMLInputElement).click());
    expect(onToggle).toHaveBeenCalledWith(1);
  });
});
