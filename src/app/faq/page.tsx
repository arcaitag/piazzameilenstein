import type { Metadata } from "next";
import { ArrowLink, CtaBand, PageIntro } from "@/components/Blocks";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten zu Reservation, Terrasse, Allergien, glutenfreier Pizza, Herkunft von Fleisch und Fisch sowie zu Feiern und Firmenanlässen bei Piazza Meilenstein.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro
        eyebrow="FAQ"
        title="Häufige Fragen"
        lead="Kurz beantwortet: Reservation, Essen, Allergien und Anlässe. Ihre Frage ist nicht dabei? Schreiben Sie uns."
      >
        <p style={{ marginTop: "1.6rem" }}>
          <ArrowLink href="/kontakt#nachricht">Frage stellen</ArrowLink>
        </p>
      </PageIntro>

      <section className="section section--tight" style={{ paddingTop: "1rem" }} aria-label="Fragen und Antworten">
        <div className="container container--narrow">
          {faq.map((group) => (
            <div key={group.title} className="faq-group" data-reveal="">
              <h2>{group.title}</h2>
              <div className="faq-list">
                {group.items.map((item) => (
                  <details key={item.q} className="faq-item">
                    <summary>
                      {item.q}
                      <span className="plus" aria-hidden="true" />
                    </summary>
                    <div className="faq-item__body">
                      <p>{item.a}</p>
                      {item.link ? <ArrowLink href={item.link.href}>{item.link.label}</ArrowLink> : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
