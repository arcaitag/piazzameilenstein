import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Figure from "@/components/Figure";
import LunchgateWidget from "@/components/LunchgateWidget";
import { reservation, site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Tisch reservieren",
  description:
    "Tisch bei Piazza Meilenstein in Langenthal online reservieren: Datum, Uhrzeit und Anzahl Personen wählen – direkt über unser Reservationssystem.",
  path: "/reservation",
});

export default function ReservationPage() {
  return (
    <>
      <header className="page-intro container">
        <span className="eyebrow">Tischreservation</span>
        <h1 className="t-h1">Ihr Tisch auf der Piazza.</h1>
        <p className="lead" style={{ marginTop: "1.5rem" }}>
          Wählen Sie Datum, Uhrzeit und Anzahl Personen – wir freuen uns auf Ihren Besuch.
        </p>
      </header>

      <section className="section section--tight" style={{ paddingTop: 0 }} aria-label="Online-Reservation">
        <div className="container">
          <div className="form-layout">
            <div>
              <LunchgateWidget />
              <p className="small muted" style={{ marginTop: "1rem" }}>
                Die Reservation läuft über das Reservationssystem von {reservation.provider}.{" "}
                <a className="text-link" href={reservation.url} target="_blank" rel="noopener">
                  In neuem Fenster öffnen
                  <span className="visually-hidden"> (Reservation bei {reservation.provider})</span>
                </a>
                {" · "}
                <Link href="/datenschutz" className="text-link">
                  Datenschutz
                </Link>
              </p>
            </div>
            <aside className="form-layout__aside" aria-labelledby="gruppen-title">
              <h2 id="gruppen-title" className="t-h3" style={{ marginBottom: "1rem" }}>
                Grössere Gruppe oder Feier?
              </h2>
              <p>
                Für Geburtstage, Firmenessen und andere Anlässe planen wir gerne gemeinsam mit Ihnen – Ablauf, Essen und
                Getränke.
              </p>
              <p style={{ marginTop: "1.2rem" }}>
                <Link href="/anlaesse#anfrage" className="text-link">
                  Zur Anlass-Anfrage
                </Link>
              </p>
              {site.phone ? (
                <p style={{ marginTop: "1.6rem" }}>
                  Lieber telefonisch? Rufen Sie uns an:{" "}
                  <a className="text-link" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                </p>
              ) : null}
              <div style={{ marginTop: "2.5rem" }}>
                <Figure name="innenraum" ratio="4 / 3" sizes="(max-width: 999px) 100vw, 30vw" decorative />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
