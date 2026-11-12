export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M3 10h13M11.5 5.5L16 10l-4.5 4.5" />
    </svg>
  );
}

export function Phone({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path
        strokeLinejoin="round"
        d="M6.6 2.8 4.3 3.4c-.7.2-1.2.9-1.1 1.6.8 5.9 5.4 10.5 11.3 11.3.7.1 1.4-.4 1.6-1.1l.6-2.3c.1-.5-.1-1-.6-1.3l-2.5-1.2c-.5-.2-1-.1-1.4.3l-1 1.1c-1.9-.9-3.5-2.5-4.4-4.4l1.1-1c.4-.4.5-.9.3-1.4L7.9 3.4c-.3-.5-.8-.7-1.3-.6Z"
      />
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
