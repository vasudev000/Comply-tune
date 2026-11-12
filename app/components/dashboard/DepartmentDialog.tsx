import { useState, type FormEvent } from "react";

import { Icon } from "./Icon";
import { AppButton, StatusTag } from "./shared";
import { splitFilesBySize } from "@/lib/file-validation";

export type NewDepartment = {
  code: string;
  name: string;
  head: string;
  email: string;
  description?: string;
  employees: number;
  status: "Active" | "In-active";
};

export function DepartmentDialog({
  onClose,
  onAdd,
  initialData,
}: {
  onClose: () => void;
  onAdd: (department: NewDepartment) => void;
  initialData?: NewDepartment;
}) {
  const [code, setCode] = useState(initialData?.code ?? "");
  const [name, setName] = useState(initialData?.name ?? "");
  const [head, setHead] = useState(initialData?.head ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isEditing, setIsEditing] = useState(!initialData);

  function addFiles(incoming: File[]) {
    const { accepted, rejected } = splitFilesBySize(incoming);
    setFileError(rejected.length ? "Each file must be 12 MB or smaller." : "");
    setFiles((current) => [...current, ...accepted]);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEditing) return;
    onAdd({
      code: code.trim(),
      name: name.trim(),
      head: head.trim(),
      email: email.trim(),
      description: description.trim(),
      employees: initialData?.employees ?? 0,
      status: initialData?.status ?? "Active",
    });
  }

  return (
    <div
      className="department-dialog-backdrop fixed inset-0 z-50 flex justify-end bg-black/65"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-department-title"
        onSubmit={submit}
        className="department-dialog-panel flex h-full w-full max-w-[608px] flex-col overflow-hidden border-l border-[#303030] bg-[#191919] shadow-2xl"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#222] bg-[#151515] px-6 md:px-8">
          <div className="flex items-center gap-3">
            <h2
              id="add-department-title"
              className="text-[20px] font-medium text-[#cbcbcb]"
            >
              {initialData
                ? isEditing
                  ? "Edit Department"
                  : "Department Details"
                : "Add Department"}
            </h2>
            {initialData && <StatusTag status={initialData.status} />}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-7 place-items-center rounded-[7px] hover:bg-[#292929]"
          >
            <img
              src="/figma-assets/department-drawer/close.svg"
              alt=""
              width="28"
              height="28"
              className="size-7"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-7 md:px-8">
          <div className="grid gap-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <label className="grid gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Department code
                <input
                  autoFocus
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter department code"
                  className="h-10 min-w-0 rounded-[10px] border border-[#2b2b2b] bg-[#202020] px-3 text-[16px] font-normal text-white outline-none placeholder:text-[#585858] focus:border-[#8d21ed]"
                />
              </label>
              <label className="grid gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Department name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter department name"
                  className="h-10 min-w-0 rounded-[10px] border border-[#2b2b2b] bg-[#202020] px-3 text-[16px] font-normal text-white outline-none placeholder:text-[#585858] focus:border-[#8d21ed]"
                />
              </label>
              <label className="grid gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Department head
                <input
                  required
                  value={head}
                  onChange={(event) => setHead(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter department head name"
                  className="h-10 min-w-0 rounded-[10px] border border-[#2b2b2b] bg-[#202020] px-3 text-[16px] font-normal text-white outline-none placeholder:text-[#585858] focus:border-[#8d21ed]"
                />
              </label>
              <label className="grid gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter email"
                  className="h-10 min-w-0 rounded-[10px] border border-[#2b2b2b] bg-[#202020] px-3 text-[16px] font-normal text-white outline-none placeholder:text-[#585858] focus:border-[#8d21ed]"
                />
              </label>
            </div>

            <label className="grid gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]">
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                readOnly={!isEditing}
                placeholder="Enter department description"
                className="h-[136px] resize-y rounded-[10px] border border-[#2b2b2b] bg-[#202020] p-3 text-[16px] font-normal text-white outline-none placeholder:text-[#585858] focus:border-[#8d21ed]"
              />
            </label>

            <div className="grid gap-2.5">
              <span className="text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Upload Files
              </span>
              <label
                className={`department-upload-pattern flex min-h-[219px] flex-col items-center justify-center gap-2.5 rounded-[10px] border-2 border-dashed border-[#2f2f2f] p-4 text-center ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (!isEditing) return;
                  addFiles(Array.from(event.dataTransfer.files));
                }}
              >
                <input
                  type="file"
                  multiple
                  disabled={!isEditing}
                  className="sr-only"
                  onChange={(event) =>
                    addFiles(Array.from(event.target.files ?? []))
                  }
                />
                <img
                  src="/figma-assets/department-drawer/folder.svg"
                  alt=""
                  width="55.2"
                  height="48"
                />
                <span className="text-[16px] leading-5 text-white">
                  Drag and drop your files to upload
                </span>
                <span className="text-[14px] leading-5 text-[#585858]">
                  {files.length
                    ? files.map((file) => file.name).join(", ")
                    : "File size is upto 12 MB max"}
                </span>
                {fileError && (
                  <span role="alert" className="text-[13px] text-[#ff6868]">
                    {fileError}
                  </span>
                )}
                <span className="inline-flex h-9 items-center gap-[6px] rounded-[8px] bg-[#333] px-3 text-[16px] text-[#a0a0a0]">
                  <Icon src="department-drawer/upload.svg" /> Upload files
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex h-[72px] shrink-0 items-center justify-end gap-3 border-t border-[#222] bg-[#151515] px-6 md:px-8">
          {initialData && !isEditing ? (
            <AppButton
              type="button"
              variant="filled-neutral"
              className="h-9 gap-[6px]"
              style={{ paddingInline: "32px" }}
              onClick={() => setIsEditing(true)}
            >
              <Icon src="department-drawer/edit.svg" />
              Edit
            </AppButton>
          ) : (
            <>
              <AppButton
                type="button"
                className="h-9 gap-[6px] bg-[#202020] px-3 text-[#a0a0a0]"
                onClick={() => (initialData ? setIsEditing(false) : onClose())}
              >
                {initialData ? "Cancel" : "Save as draft"}
              </AppButton>
              <AppButton type="submit" variant="primary" className="h-9 px-3">
                <Icon src="department-drawer/submit.svg" />
                {initialData ? "Save changes" : "Submit"}
              </AppButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
