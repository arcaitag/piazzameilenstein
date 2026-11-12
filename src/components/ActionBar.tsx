"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Phone } from "@/components/Icons";
import { site } from "@/content/site";

const HIDDEN_ON = ["/reservation"];

export default function ActionBar() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.includes(pathname);

  useEffect(() => {
    document.body.classList.toggle("has-actionbar", !hidden);
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav className={site.phone ? "action-bar has-call" : "action-bar"} aria-label="Schnellzugriff">
      {site.phone ? (
        <a href={site.phone.href} className="action-bar__call">
          <Phone />
          <span className="visually-hidden">Anrufen: {site.phone.display}</span>
        </a>
      ) : null}
      <Link href="/speisekarte">Speisekarte</Link>
      <Link href="/reservation" className="is-primary">
        Tisch reservieren
      </Link>
    </nav>
  );
}
