import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Icons";

export const metadata: Metadata = { title: "Seite nicht gefunden", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container not-found section">
      <span className="eyebrow">Fehler 404</span>
      <h1 className="t-h1">Diese Seite gibt es nicht.</h1>
      <p className="lead" style={{ marginTop: "1.5rem" }}>
        Vielleicht hat sich die Adresse geändert. Hier geht es weiter:
      </p>
      <div className="btn-row">
        <Link href="/" className="btn btn--primary">
          Zur Startseite <Arrow />
        </Link>
        <Link href="/speisekarte" className="btn btn--secondary">
          Speisekarte
        </Link>
      </div>
    </div>
  );
}
