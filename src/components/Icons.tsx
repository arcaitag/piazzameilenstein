export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M3 10h13M11.5 5.5L16 10l-4.5 4.5" />
    </svg>
  );
}

export function Download({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M10 3v10M5.5 8.5L10 13l4.5-4.5M4 16.5h12" />
    </svg>
  );
}
