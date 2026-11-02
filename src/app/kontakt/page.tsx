import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { PageIntro, Pending } from "@/components/Blocks";
import ContactForm from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt & Anreise",
  description: `Kontakt, Öffnungszeiten und Anreise zu ${site.name} in ${site.city}. Schreiben Sie uns oder reservieren Sie Ihren Tisch online.`,
  alternates: { canonical: "/kontakt" },
};

function HoursList({ rows }: { rows: { days: string; time: string; note?: string }[] }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {rows.map((r) => (
        <li key={r.days}>
          <strong style={{ fontWeight: 500 }}>{r.days}</strong> {r.time}
          {r.note ? <span className="muted"> · {r.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export default function KontaktPage() {
  const missing = !site.address || !site.phone || !site.email || !site.hours;
  return (
    <>
      <PageIntro
        eyebrow="Kontakt & Anreise"
        title="So finden Sie zu uns."
        lead="Schreiben Sie uns, reservieren Sie Ihren Tisch online oder schauen Sie einfach vorbei – wir freuen uns auf Sie."
      />

      <section className="section section--tight" aria-labelledby="info-title">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 id="info-title" className="visually-hidden">
                Adresse, Kontakt und Öffnungszeiten
              </h2>
              <dl className="info-list">
                <div>
                  <dt>Adresse</dt>
                  <dd>
                    {site.address ? (
                      <address style={{ fontStyle: "normal" }}>
                        {site.name}
                        <br />
                        {site.address.street}
                        <br />
                        {site.address.zip} {site.address.city}
                      </address>
                    ) : (
                      <>
                        {site.name}, {site.city}
                        <br />
                        <Pending>Genaue Adresse folgt in Kürze</Pending>
                      </>
                    )}
                    {site.address?.mapsUrl ? (
                      <p style={{ marginTop: "0.6rem" }}>
                        <a className="text-link" href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                          In Google Maps öffnen
                        </a>
                      </p>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt>Telefon</dt>
                  <dd>{site.phone ? <a href={site.phone.href}>{site.phone.display}</a> : <Pending />}</dd>
                </div>
                <div>
                  <dt>E-Mail</dt>
                  <dd>{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Pending />}</dd>
                </div>
                <div>
                  <dt>Öffnungszeiten</dt>
                  <dd>
                    {site.hours ? <HoursList rows={site.hours} /> : <Pending>Öffnungszeiten folgen in Kürze</Pending>}
                    {site.kitchenHours ? (
                      <div style={{ marginTop: "0.8rem" }}>
                        <span className="small muted">Küche</span>
                        <HoursList rows={site.kitchenHours} />
                      </div>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt>Anreise</dt>
                  <dd>
                    {site.travel ? (
                      <>
                        {site.travel.car ? <p>{site.travel.car}</p> : null}
                        {site.travel.publicTransport ? <p>{site.travel.publicTransport}</p> : null}
                        {site.travel.parking ? <p>{site.travel.parking}</p> : null}
                      </>
                    ) : (
                      <Pending>Angaben zu Parkplätzen und öffentlichem Verkehr folgen in Kürze</Pending>
                    )}
                  </dd>
                </div>
              </dl>
              {missing ? (
                <p className="notice small" style={{ marginTop: "1.5rem" }}>
                  Einige Angaben ergänzen wir gerade. Für eine Reservation nutzen Sie bitte das{" "}
                  <Link href="/reservation" className="text-link">
                    Reservationsformular
                  </Link>{" "}
                  – wir bestätigen Ihnen den Tisch persönlich.
                </p>
              ) : null}
            </div>
            <div className="contact-grid__media">
              <Figure name="terrasseSchirme" ratio="4 / 5" ratioNarrow="4 / 3" sizes="(max-width: 899px) 100vw, 38vw" />
            </div>
          </div>
        </div>
      </section>

      <section id="nachricht" className="section section--foam" aria-labelledby="form-title">
        <div className="container">
          <div className="form-layout">
            <div>
              <span className="eyebrow">Nachricht</span>
              <h2 id="form-title" className="t-h2" style={{ marginBottom: "2rem" }}>
                Schreiben Sie uns
              </h2>
              <ContactForm />
            </div>
            <aside className="form-layout__aside" aria-label="Weitere Anfragen">
              <h2 className="t-h3" style={{ marginBottom: "1.2rem" }}>
                Schneller zum Ziel
              </h2>
              <ul className="feature__list" style={{ marginTop: 0 }}>
                <li>
                  <Link href="/reservation" className="text-link">
                    Tisch reservieren
                  </Link>
                </li>
                <li>
                  <Link href="/anlaesse#anfrage" className="text-link">
                    Feier oder Firmenanlass anfragen
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-link">
                    Häufige Fragen
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
