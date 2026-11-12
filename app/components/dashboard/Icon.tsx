const asset = (name: string) => `/figma-assets/${name}`;

/** Decorative icon backed by a public Figma asset. */
export function Icon({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      src={asset(src)}
      alt=""
      aria-hidden="true"
      className={`size-5 shrink-0 ${className}`}
    />
  );
}
