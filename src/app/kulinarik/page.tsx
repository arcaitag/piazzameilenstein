import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { ArrowLink, CtaBand, PageIntro } from "@/components/Blocks";
import { Arrow, Download } from "@/components/Icons";
import { pizzaCount } from "@/content/menu";
import { menuPdf } from "@/content/site";

export const metadata: Metadata = {
  title: "Kulinarik",
  description:
    "Antipasti, hausgemachte Pasta, Pizza in über dreissig Varianten, Dry Aged Beef und Bife Argentino vom Grill sowie eine Weinkarte mit Klassikern aus Italien und der Schweiz.",
  alternates: { canonical: "/kulinarik" },
};

export default function KulinarikPage() {
  return (
    <>
      <PageIntro
        layout="split"
        image="lamm"
        eyebrow="Kulinarik"
        title="Italienisch, vom Ofen bis zum Grill."
        lead={`Antipasti und hausgemachte Pasta, ${pizzaCount} Pizzen, Fleisch vom Grill und eine Weinkarte mit Klassikern aus Italien, der Schweiz, Frankreich und Spanien.`}
      >
        <div className="btn-row">
          <Link href="/speisekarte" className="btn btn--primary">
            Zur Speisekarte <Arrow />
          </Link>
          <a href={menuPdf.href} className="btn btn--secondary" download>
            PDF laden <Download />
          </a>
        </div>
      </PageIntro>

      <section className="section" aria-label="Unsere Küche im Überblick">
        <div className="container">
          <article className="feature" aria-labelledby="cucina-title">
            <div className="feature__media">
              <Figure name="capreseOel" ratio="4 / 3" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">La Cucina</span>
              <h2 id="cucina-title" className="t-h2">
                Antipasti, Pasta und Secondi
              </h2>
              <p>
                Zum Auftakt Burrata di Andria mit Parmaschinken, Vitello Tonnato oder Carpaccio di Manzo. Danach die
                Klassiker wie Spaghetti alla Carbonara mit Guanciale – und für Kenner die Pasta aus eigener Produktion:
                Paccheri del Calabrese Incazzato, Lasagne al Forno, Spaghetti ai Frutti di Mare.
              </p>
              <p>
                Bei den Hauptgängen stehen Saltimbocca alla Romana, Lammkoteletts mit Rosmarin und Riesencrevetten auf der
                Karte. Jedes Hauptgericht wird mit einer Beilage serviert.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/speisekarte#antipasti">Antipasti, Primi &amp; Secondi</ArrowLink>
              </p>
            </div>
          </article>

          <article className="feature feature--flip" aria-labelledby="pizze-title">
            <div className="feature__media">
              <Figure name="pizza" ratio="4 / 3" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Le Pizze</span>
              <h2 id="pizze-title" className="t-h2">
                Drei Familien, {pizzaCount} Pizzen
              </h2>
              <p>
                <em>Le Solite</em> sind die Klassiker von Margherita bis Quattro Stagioni. <em>Le Gustose</em> die
                Spezialitäten – etwa Gran Ducato mit Bresaola und Trüffel oder Diva mit Crevetten und schwarzem Trüffel.
                Und <em>Le Bianche</em> kommen ohne Tomatensauce, zum Beispiel La Mortazza mit Mortadella, Burrata und
                Pistazien.
              </p>
              <p>Glutenfreie Pizza bereiten wir auf Wunsch gegen Aufpreis zu.</p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/speisekarte#pizze">Alle Pizzen</ArrowLink>
              </p>
            </div>
          </article>

          <article className="feature feature--portrait" aria-labelledby="bistecca-title">
            <div className="feature__media">
              <Figure name="steak" ratio="4 / 5" ratioNarrow="4 / 5" sizes="(max-width: 899px) 100vw, 40vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Bisteccheria</span>
              <h2 id="bistecca-title" className="t-h2">
                Das besondere Fleisch
              </h2>
              <p>
                Unser Dry Aged Beef reifen wir selbst – am Knochen, in der Show-Kühlvitrine. Dabei wird das Fleisch mürbe,
                besonders zart und entwickelt sein typisches Aroma.
              </p>
              <p>
                Dazu die «Finest Argentine»-Steaks von jungen Stieren aus der argentinischen Pampa: à la minute
                geschnitten, leicht gesalzen, mit Chimichurri-Öl bestrichen und auf dem heissen Grill zubereitet. Für
                Runden gibt es Platten zum Teilen.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/speisekarte#bisteccheria">Zur Bisteccheria</ArrowLink>
              </p>
            </div>
          </article>

          <article className="feature feature--flip" aria-labelledby="vini-title">
            <div className="feature__media">
              <Figure name="innenraum" ratio="4 / 3" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Selezione dei Vini</span>
              <h2 id="vini-title" className="t-h2">
                Von Prosecco bis Sassicaia
              </h2>
              <p>
                Prosecco, Franciacorta und Champagner, Weine aus dem Wallis, der Waadt, dem Tessin und der Bündner
                Herrschaft. Aus Italien Amarone, Barolo, Tignanello, Ornellaia und Sassicaia, dazu Burgund, Bordeaux und
                Rioja.
              </p>
              <p>Viele Weine schenken wir auch offen aus, einige gibt es als Grossflasche.</p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/speisekarte#vini">Zur Weinkarte</ArrowLink>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--foam" aria-labelledby="allergie-title">
        <div className="container container--narrow" data-reveal="">
          <span className="eyebrow">Allergien &amp; Herkunft</span>
          <h2 id="allergie-title" className="t-h3">
            Sagen Sie uns, was Sie nicht vertragen.
          </h2>
          <p style={{ marginTop: "1.2rem" }}>
            Bitte teilen Sie Allergien und Unverträglichkeiten unserem Servicepersonal vor der Bestellung mit – wir
            informieren Sie gerne über Zutaten und Zubereitung. Die Herkunft von Fleisch und Fisch deklarieren wir auf der
            Speisekarte.
          </p>
          <p style={{ marginTop: "1.4rem" }}>
            <ArrowLink href="/speisekarte#allergene">Allergene &amp; Herkunft</ArrowLink>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
