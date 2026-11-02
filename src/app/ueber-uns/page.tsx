import type { Metadata } from "next";
import Figure from "@/components/Figure";
import { ArrowLink, CtaBand, PageIntro } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Wie auf einer italienischen Piazza: Bei Piazza Meilenstein kommt man zusammen. Unsere Haltung – hausgemacht, selbst gereift, offen deklariert und gastfreundlich.",
  alternates: { canonical: "/ueber-uns" },
};

const principles = [
  {
    title: "Hausgemacht",
    text: "Pizza und Pasta machen wir selbst. Für die Spezialitäten «di nostra produzione» – Paccheri, Lasagne und Spaghetti ai Frutti di Mare – stellen wir die Pasta in der eigenen Küche her.",
  },
  {
    title: "Selbst gereift",
    text: "Unser Dry Aged Beef reift am Knochen, gut sichtbar in der Show-Kühlvitrine. Wir lassen ihm die Zeit, die es braucht, um mürbe zu werden und sein Aroma zu entwickeln.",
  },
  {
    title: "Offen deklariert",
    text: "Woher Fleisch und Fisch stammen, steht auf unserer Karte. Und wer eine Allergie oder Unverträglichkeit hat, bekommt von unserem Service ehrliche Auskunft über Zutaten und Zubereitung.",
  },
  {
    title: "Gastfreundlich",
    text: "Welches Steak passt zu Ihnen? Unser Service erklärt Ihnen gerne die Besonderheiten der einzelnen Stücke und von welchem Teil des Rindes sie stammen – damit Sie genau das finden, was Ihnen schmeckt.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Über uns"
        title="Wie auf einer italienischen Piazza."
        lead="In Italien ist die Piazza der Platz, an dem man sich trifft: zum Essen, zum Reden, zum Bleiben. Genau das soll unsere Piazza sein – ein Ort für gute Küche, lange Tische und Gäste, die gerne wiederkommen."
      />

      <section className="section section--tight" aria-label="Bilder aus der Küche">
        <div className="container">
          <div className="duo">
            <div className="duo__a">
              <Figure
                name="capreseOel"
                ratio="4 / 5"
                sizes="(max-width: 899px) 100vw, 56vw"
                caption="Ein Faden Olivenöl, frische Kräuter – die Details machen den Teller."
              />
            </div>
            <div className="duo__a-text" data-reveal="">
              <p className="lead">
                Auf unserer Karte stehen italienische Klassiker und Spezialitäten – von der Burrata di Andria über die
                Pasta aus eigener Produktion bis zur Bistecca alla Fiorentina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="haltung-title">
        <div className="container">
          <div className="section-head" data-reveal="">
            <span className="eyebrow">Unsere Haltung</span>
            <h2 id="haltung-title" className="t-h2">
              Was uns wichtig ist
            </h2>
          </div>
          <ul className="principles">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal="">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--foam" aria-labelledby="kueche-title">
        <div className="container">
          <div className="feature feature--portrait feature--flip">
            <div className="feature__media">
              <Figure name="lamm" ratio="4 / 5" sizes="(max-width: 899px) 100vw, 40vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Aus der Küche</span>
              <h2 id="kueche-title" className="t-h2">
                Vorbereitet in unserer Küche
              </h2>
              <p>
                Lammkoteletts, Rosmarin und Salbei, Gemüse und Kartoffeln: So sieht es in unserer Küche aus, bevor
                serviert wird. Die Herkunft von Fleisch und Fisch finden Sie auf der Speisekarte.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/kulinarik">Unsere Kulinarik</ArrowLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
