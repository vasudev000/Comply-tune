import type { ButtonHTMLAttributes } from "react";

/** Shared button styles for configuration screens. */
export function AppButton({
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger" | "filled-neutral";
  size?: "sm" | "md";
}) {
  return (
    <button
      {...props}
      data-variant={variant}
      data-size={size}
      className={`ds-button ${className}`}
    />
  );
}

/** Purple plus icon used by add actions. */
export function AddIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 shrink-0"
      fill="none"
    >
      <rect x="2" y="2" width="16" height="16" rx="3.84267" fill="#C484FF" />
      <path
        d="M5.3335 9.99967H14.6668M10.0002 5.33301V14.6663"
        stroke="white"
        strokeWidth="1.60111"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
