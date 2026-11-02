import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import ReservationForm from "@/components/forms/ReservationForm";
import ContactFallback from "@/components/forms/ContactFallback";

export const metadata: Metadata = {
  title: "Tisch reservieren",
  description:
    "Reservieren Sie Ihren Tisch bei Piazza Meilenstein online. Wir prüfen die Verfügbarkeit und bestätigen Ihre Reservation persönlich per E-Mail oder Telefon.",
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <>
      <header className="page-intro container">
        <span className="eyebrow">Tischreservation</span>
        <h1 className="t-h1">Ihr Tisch auf der Piazza.</h1>
        <p className="lead" style={{ marginTop: "1.5rem" }}>
          Schicken Sie uns Ihren Wunschtermin. Wir prüfen die Verfügbarkeit und bestätigen Ihnen die Reservation
          persönlich.
        </p>
      </header>

      <section className="section section--tight" style={{ paddingTop: 0 }} aria-label="Reservationsformular">
        <div className="container">
          <div className="form-layout">
            <div>
              <ReservationForm />
            </div>
            <aside className="form-layout__aside" aria-labelledby="ablauf-title">
              <h2 id="ablauf-title" className="t-h3" style={{ marginBottom: "1.5rem" }}>
                So funktioniert es
              </h2>
              <ol className="steps">
                <li>
                  <strong>Anfrage senden</strong>
                  <span className="muted">Datum, Uhrzeit, Anzahl Personen und Ihre Kontaktangaben.</span>
                </li>
                <li>
                  <strong>Wir prüfen</strong>
                  <span className="muted">Wir schauen, ob zur gewünschten Zeit ein Tisch frei ist.</span>
                </li>
                <li>
                  <strong>Bestätigung</strong>
                  <span className="muted">
                    Sie erhalten unsere Bestätigung per E-Mail oder Telefon. Erst dann ist der Tisch für Sie reserviert.
                  </span>
                </li>
              </ol>
              <div style={{ marginTop: "2.5rem" }}>
                <Figure name="innenraum" ratio="4 / 3" sizes="(max-width: 999px) 100vw, 30vw" decorative />
              </div>
              <p className="small" style={{ marginTop: "1.5rem" }}>
                <strong style={{ fontWeight: 500 }}>Grössere Gruppe oder Feier?</strong>{" "}
                <Link href="/anlaesse#anfrage" className="text-link">
                  Zur Anlass-Anfrage
                </Link>
              </p>
              <p className="small muted" style={{ marginTop: "0.8rem" }}>
                <ContactFallback />
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
