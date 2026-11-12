import { useState, type FormEvent } from "react";
import { AppButton } from "./shared";

export type NewEmployee = { employeeId: string; name: string; email: string; role: string; location: string; status: "Active" | "In-active" };

export function EmployeeDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (employee: NewEmployee) => void }) {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd({ employeeId: employeeId.trim(), name: name.trim(), email: email.trim(), role: role.trim(), location: location.trim(), status: "Active" });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form role="dialog" aria-modal="true" aria-labelledby="add-employee-title" onSubmit={submit} className="w-full max-w-[440px] rounded-xl border border-[#303030] bg-[#191919] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="add-employee-title" className="text-lg font-semibold">Add Employee</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-[8px] p-1 text-[#aaa] hover:bg-[#292929]">×</button>
        </div>
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Employee ID<input autoFocus required value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Employee name<input required value={name} onChange={(event) => setName(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Role / Department<input required value={role} onChange={(event) => setRole(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Location<input required value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <AppButton type="button" onClick={onClose} className="px-4">Cancel</AppButton>
          <AppButton type="submit" variant="primary" className="bg-[#7900e8] px-4 hover:bg-[#8d16f7]">Add Employee</AppButton>
        </div>
      </form>
    </div>
  );
}
