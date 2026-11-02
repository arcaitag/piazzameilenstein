"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HIDDEN_ON = ["/reservation"];

export default function ActionBar() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.includes(pathname);

  useEffect(() => {
    document.body.classList.toggle("has-actionbar", !hidden);
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav className="action-bar" aria-label="Schnellzugriff">
      <Link href="/speisekarte">Speisekarte</Link>
      <Link href="/reservation" className="is-primary">
        Tisch reservieren
      </Link>
    </nav>
  );
}
