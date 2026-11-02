import type { Metadata } from "next";
import Figure from "@/components/Figure";
import { PageIntro } from "@/components/Blocks";
import EventForm from "@/components/forms/EventForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Feiern & Firmenanlässe",
  description:
    "Geburtstag, Familienfest, Firmenessen oder Teamabend bei Piazza Meilenstein: Schicken Sie uns Ihre Anfrage – wir melden uns persönlich und besprechen die Details.",
  alternates: { canonical: "/anlaesse" },
};

export default function AnlaessePage() {
  return (
    <>
      <PageIntro
        layout="split"
        image="tisch"
        imageRatio="4 / 5"
        eyebrow="Feiern & Firmenanlässe"
        title="Ihr Anlass auf der Piazza."
        lead="Geburtstag, Familienfest, Firmenessen oder Teamabend: Erzählen Sie uns, was Sie vorhaben. Wir melden uns persönlich und planen den Anlass gemeinsam mit Ihnen."
      >
        <div className="btn-row">
          <a href="#anfrage" className="btn btn--primary">
            Zur Anfrage
          </a>
        </div>
      </PageIntro>

      <section className="section section--tight" aria-label="Private Feiern und Geschäftsanlässe">
        <div className="container">
          <div>
            <div className="anlass-cols">
              <article data-reveal="">
                <span className="eyebrow">Privat</span>
                <h2 className="t-h3">Feiern mit Familie und Freunden</h2>
                <p style={{ marginTop: "1rem" }}>
                  Ein runder Geburtstag, eine Verlobung, die Taufe oder einfach ein grosses Wiedersehen: An langen Tischen
                  unter Grün wird gegessen, angestossen und gefeiert. Was auf den Tisch kommt –
                  Antipasti zum Teilen, Pasta, Pizza oder Fleisch vom Grill – besprechen wir mit Ihnen.
                </p>
              </article>
              <article data-reveal="" style={{ ["--delay" as string]: "0.08s" }}>
                <span className="eyebrow">Geschäftlich</span>
                <h2 className="t-h3">Firmenessen und Teamanlässe</h2>
                <p style={{ marginTop: "1rem" }}>
                  Ein Essen mit Kundinnen und Kunden, der Abschluss eines Projekts oder ein Abend mit dem ganzen Team:
                  Sagen Sie uns, wie viele Personen kommen und was Ihnen wichtig ist. Wir schlagen Ihnen einen Ablauf vor,
                  der zu Ihrem Anlass passt.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--foam" aria-labelledby="ablauf-title">
        <div className="container">
          <div className="form-layout">
            <div id="anfrage" style={{ scrollMarginTop: "calc(var(--header-h) + 2rem)" }}>
              <span className="eyebrow">Anfrage</span>
              <h2 className="t-h2" style={{ marginBottom: "2rem" }}>
                Erzählen Sie uns von Ihrem Anlass
              </h2>
              <EventForm />
            </div>
            <aside className="form-layout__aside" aria-labelledby="ablauf-title">
              <h2 id="ablauf-title" className="t-h3" style={{ marginBottom: "1.5rem" }}>
                So geht es weiter
              </h2>
              <ol className="steps">
                <li>
                  <strong>Anfrage senden</strong>
                  <span className="muted">Datum, Gästezahl und Ihre Wünsche – mehr braucht es für den Anfang nicht.</span>
                </li>
                <li>
                  <strong>Wir melden uns</strong>
                  <span className="muted">Wir besprechen mit Ihnen Ablauf, Essen und Getränke.</span>
                </li>
                <li>
                  <strong>Bestätigung</strong>
                  <span className="muted">Sobald alles passt, bestätigen wir Ihnen den Anlass verbindlich.</span>
                </li>
              </ol>
              <div style={{ marginTop: "2.5rem" }}>
                <Figure name="innenraum" ratio="4 / 3" sizes="(max-width: 999px) 100vw, 30vw" decorative />
              </div>
              <p className="small muted" style={{ marginTop: "1.5rem" }}>
                Fragen vorab? Vielleicht finden Sie die Antwort bei den{" "}
                <Link href="/faq" className="text-link">
                  häufigen Fragen
                </Link>
                .
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
