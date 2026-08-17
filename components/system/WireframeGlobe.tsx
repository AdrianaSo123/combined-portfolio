// Thin wireframe globe — a cybercore/Y2K motif (spec §14). Decorative only;
// hidden from the accessibility tree. Uses currentColor so the parent controls
// tint and opacity.
export function WireframeGlobe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
      focusable="false"
    >
      {/* outer sphere */}
      <circle cx="100" cy="100" r="90" />
      {/* meridians (longitude) */}
      <ellipse cx="100" cy="100" rx="78" ry="90" />
      <ellipse cx="100" cy="100" rx="45" ry="90" />
      <line x1="100" y1="10" x2="100" y2="190" />
      {/* parallels (latitude) */}
      <line x1="10" y1="100" x2="190" y2="100" />
      <ellipse cx="100" cy="100" rx="90" ry="30" />
      <ellipse cx="100" cy="100" rx="90" ry="62" />
      {/* polar caps */}
      <ellipse cx="100" cy="46" rx="55" ry="10" />
      <ellipse cx="100" cy="154" rx="55" ry="10" />
    </svg>
  );
}
