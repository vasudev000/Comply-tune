import { useState, type FormEvent } from "react";
import { AppButton } from "./shared";

export type NewRole = {
  code: string;
  name: string;
  department: string;
  members: number;
  accessLevel: string;
  status: "Active" | "In-active";
};

export function RoleDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (role: NewRole) => void }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [members, setMembers] = useState("0");
  const [accessLevel, setAccessLevel] = useState("Read only");
  const [status, setStatus] = useState<NewRole["status"]>("Active");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd({ code: code.trim(), name: name.trim(), department: department.trim(), members: Number(members) || 0, accessLevel, status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form role="dialog" aria-modal="true" aria-labelledby="add-role-title" onSubmit={submit} className="max-h-[90vh] w-full max-w-[440px] overflow-y-auto rounded-xl border border-[#303030] bg-[#191919] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="add-role-title" className="text-lg font-semibold">Add Role</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-[8px] p-1 text-[#aaa] hover:bg-[#292929]">×</button>
        </div>
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Role ID<input autoFocus required value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. QA-001" className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none placeholder:text-[#666] focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Role name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Quality Manager" className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none placeholder:text-[#666] focus:border-[#8d21ed]" /></label>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Department<input required value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="e.g. Quality Assurance" className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none placeholder:text-[#666] focus:border-[#8d21ed]" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Access level<select value={accessLevel} onChange={(event) => setAccessLevel(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]"><option>Read only</option><option>Standard</option><option>Department admin</option><option>Manage compliance</option><option>Full access</option></select></label>
            <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Status<select value={status} onChange={(event) => setStatus(event.target.value as NewRole["status"])} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]"><option>Active</option><option>In-active</option></select></label>
          </div>
          <label className="grid gap-1.5 text-sm text-[#bdbdbd]">Assigned members<input type="number" min="0" value={members} onChange={(event) => setMembers(event.target.value)} className="rounded-md border border-[#353535] bg-[#111] px-3 py-2 text-white outline-none focus:border-[#8d21ed]" /></label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <AppButton type="button" onClick={onClose} className="px-4">Cancel</AppButton>
          <AppButton type="submit" variant="primary" className="bg-[#7900e8] px-4 hover:bg-[#8d16f7]">Add Role</AppButton>
        </div>
      </form>
    </div>
  );
}
