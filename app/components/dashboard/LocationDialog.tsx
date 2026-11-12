import { useState, type DragEvent, type FormEvent } from "react";

import { splitFilesBySize } from "@/lib/file-validation";
import { locationCitiesByState, locationStatesByCountry } from "@/lib/location-options";

import { AppButton, StatusTag } from "./shared";

export type NewLocation = {
  name: string;
  location: string;
  contact: string;
  employees: number;
  status: "Active" | "In-active";
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  streetAddress?: string;
  phone?: string;
  manager?: string;
  timezone?: string;
};

const inputClassName =
  "h-10 min-w-0 rounded-[10px] border border-[#2b2b2b] bg-[#202020] px-3 text-[16px] font-normal text-[#e1e1e1] outline-none placeholder:text-[#585858] focus:border-[#8d21ed]";
const labelClassName =
  "grid min-w-0 gap-2.5 text-[16px] font-medium leading-5 text-[#e1e1e1]";

function LocationSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <div className="relative min-w-0">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className={`${inputClassName} w-full appearance-none pr-10 ${value ? "text-[#e1e1e1]" : "text-[#585858]"}`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        src="/figma-assets/location-drawer/dropdown.svg"
        alt=""
        width="20"
        height="20"
        className="pointer-events-none absolute right-2.5 top-1/2 size-5 -translate-y-1/2"
      />
    </div>
  );
}

export function LocationDialog({
  onClose,
  onAdd,
  initialData,
}: {
  onClose: () => void;
  onAdd: (location: NewLocation) => void;
  initialData?: NewLocation;
}) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [country, setCountry] = useState(initialData?.country ?? "");
  const [state, setState] = useState(initialData?.state ?? "");
  const [city, setCity] = useState(initialData?.city ?? "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode ?? "");
  const [streetAddress, setStreetAddress] = useState(
    initialData?.streetAddress ?? initialData?.location ?? "",
  );
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [email, setEmail] = useState(initialData?.contact ?? "");
  const [timezone, setTimezone] = useState(initialData?.timezone ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isEditing, setIsEditing] = useState(!initialData);

  function addFiles(incoming: File[]) {
    const { accepted, rejected } = splitFilesBySize(incoming);
    setFileError(rejected.length ? "Each file must be 12 MB or smaller." : "");
    setFiles((current) => [
      ...current,
      ...accepted,
    ]);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (!isEditing) return;
    addFiles(Array.from(event.dataTransfer.files));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEditing) return;
    const address = [streetAddress, city, state, country, postalCode]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(", ");
    onAdd({
      name: name.trim(),
      location: address,
      contact: email.trim(),
      employees: initialData?.employees ?? 0,
      status: initialData?.status ?? "Active",
      country,
      state,
      city,
      postalCode: postalCode.trim(),
      streetAddress: streetAddress.trim(),
      phone: phone.trim(),
      timezone,
    });
  }

  return (
    <div
      className="location-dialog-backdrop fixed inset-0 z-50 flex justify-end bg-black/65"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-dialog-title"
        onSubmit={submit}
        className="location-dialog-panel flex h-full w-full max-w-[608px] flex-col overflow-hidden border-l border-[#303030] bg-[#191919] shadow-2xl"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#222] bg-[#151515] px-6 md:px-8">
          <div className="flex items-center gap-3">
            <h2
              id="location-dialog-title"
              className="text-[20px] font-medium text-[#cbcbcb]"
            >
              {initialData
                ? isEditing
                  ? "Edit Location"
                  : "Location Details"
                : "Add Location"}
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
              src="/figma-assets/location-drawer/close.svg"
              alt=""
              width="28"
              height="28"
              className="size-7"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-7 md:px-8">
          <div className="grid gap-7">
            <label className={labelClassName}>
              Manufacturing name
              <input
                autoFocus={!initialData}
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                readOnly={!isEditing}
                placeholder="Enter manufacturing name"
                className={inputClassName}
              />
            </label>

            <div className="grid gap-2.5">
              <span className="text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Address
              </span>
              <div className="grid gap-2.5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <LocationSelect
                    label="Country"
                    value={country}
                    disabled={!isEditing}
                    onChange={(value) => {
                      setCountry(value);
                      setState("");
                      setCity("");
                    }}
                    options={[
                      "United States",
                      "India",
                      "Canada",
                      "United Kingdom",
                    ]}
                  />
                  <LocationSelect
                    label="State"
                    value={state}
                    disabled={!isEditing}
                    onChange={(value) => {
                      setState(value);
                      setCity("");
                    }}
                    options={locationStatesByCountry[country] ?? []}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <LocationSelect
                    label="City/Town"
                    value={city}
                    disabled={!isEditing}
                    onChange={setCity}
                    options={locationCitiesByState[state] ?? []}
                  />
                  <input
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    readOnly={!isEditing}
                    placeholder="Zip/Postal code"
                    aria-label="Zip or postal code"
                    className={inputClassName}
                  />
                </div>
                <input
                  required
                  value={streetAddress}
                  onChange={(event) => setStreetAddress(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Streets Address"
                  aria-label="Street address"
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <label className={labelClassName}>
                Phone number
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter mobile number name"
                  className={inputClassName}
                />
              </label>
              <label className={labelClassName}>
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter email"
                  className={inputClassName}
                />
              </label>
            </div>

            <label className={labelClassName}>
              Timezone
              <LocationSelect
                label="Select timezone"
                value={timezone}
                disabled={!isEditing}
                onChange={setTimezone}
                options={[
                  "Asia/Kolkata",
                  "America/Chicago",
                  "America/Denver",
                  "America/Los_Angeles",
                  "Europe/London",
                ]}
              />
            </label>

            <div className="grid gap-2.5">
              <span className="text-[16px] font-medium leading-5 text-[#e1e1e1]">
                Upload Certificates
              </span>
              <label
                className={`location-upload-pattern flex min-h-[200px] flex-col items-center justify-center gap-2.5 rounded-[10px] border-2 border-dashed border-[#2f2f2f] p-4 text-center ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
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
                  src="/figma-assets/location-drawer/folder.svg"
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
                  <img
                    src="/figma-assets/location-drawer/upload.svg"
                    alt=""
                    width="20"
                    height="20"
                  />
                  Upload files
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
              <img
                src="/figma-assets/department-drawer/edit.svg"
                alt=""
                width="20"
                height="20"
              />
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
                <img
                  src="/figma-assets/location-drawer/submit.svg"
                  alt=""
                  width="20"
                  height="20"
                />
                {initialData ? "Save changes" : "Submit"}
              </AppButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
