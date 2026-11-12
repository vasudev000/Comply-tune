/** Compact active/inactive status label for table rows. */
export function StatusTag({ status }: { status: "Active" | "In-active" }) {
  return (
    <span
      className={`inline-flex h-[var(--ds-control-height-compact)] items-center rounded-[var(--ds-radius-tag)] border px-2 text-[length:var(--ds-font-size-tag)] leading-none ${status === "Active" ? "border-[var(--ds-color-success-border)] bg-[var(--ds-color-success-bg)] text-[var(--ds-color-success-text)]" : "border-[var(--ds-color-danger-border)] bg-[var(--ds-color-danger-bg)] text-[var(--ds-color-danger-text)]"}`}
    >
      {status}
    </span>
  );
}
