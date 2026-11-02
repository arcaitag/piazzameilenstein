import type { Metadata } from "next";
import Link from "next/link";
import Figure from "@/components/Figure";
import { ArrowLink, CtaBand, PageIntro } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Restaurant & Erlebnisse",
  description:
    "Ein grosser Gastraum unter Bambus und Grün, eine Terrasse unter Sonnenschirmen und eine Bar für den Apéro – dazu Live-Cooking und Events bei Piazza Meilenstein.",
  alternates: { canonical: "/restaurant" },
};

export default function RestaurantPage() {
  return (
    <>
      <PageIntro
        layout="wide"
        image="ferrari"
        eyebrow="Restaurant & Erlebnisse"
        title="Ein grosser Raum, ein grüner Himmel."
        lead="Drinnen sitzen Sie zwischen Bambus und hängendem Grün, draussen unter grossen Sonnenschirmen. Dazu kommen die Bar für den Apéro, Live-Cooking und Events."
      />

      <section className="section" aria-labelledby="innen-title">
        <div className="container">
          <div className="feature">
            <div className="feature__media">
              <Figure
                name="innenraum"
                ratio="3 / 2"
                ratioNarrow="4 / 5"
                sizes="(max-width: 899px) 100vw, 56vw"
                caption="Kerzenlicht, Weinklimaschränke und geflochtene Leuchten im Gastraum."
              />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Der Gastraum</span>
              <h2 id="innen-title" className="t-h2">
                Unter einem Dach aus Grün
              </h2>
              <p>
                Zwischen Bambusstämmen spannt sich ein Dach aus Grünpflanzen, darunter hängen geflochtene Leuchten. An den Holztischen
                sitzen Sie zu zweit oder in grosser Runde, an langen Tafeln mit Bänken auch mit der ganzen Familie.
              </p>
              <p>Die Weine lagern gut sichtbar in den Klimaschränken, mitten im Raum.</p>
            </div>
          </div>

          <div className="feature feature--flip">
            <div className="feature__media">
              <Figure
                name="terrasse"
                ratio="3 / 2"
                ratioNarrow="4 / 5"
                sizes="(max-width: 899px) 100vw, 56vw"
              />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Die Terrasse</span>
              <h2 className="t-h2">Draussen unter Schirmen</h2>
              <p>
                Bei schönem Wetter stehen die Tische draussen unter grossen Sonnenschirmen, zwischen Pflanzen und einem
                Olivenbaum. Wer lieber an der frischen Luft isst, vermerkt das einfach bei der Reservation.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/reservation">Tisch reservieren</ArrowLink>
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature__media">
              <Figure name="bar" ratio="3 / 2" ratioNarrow="4 / 3" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Die Bar</span>
              <h2 className="t-h2">Ein Spritz zum Ankommen</h2>
              <p>
                Vor dem Essen ein Drink an der Bar, danach ein Glas aus der Weinkarte: Hier beginnt der Abend, und hier
                klingt er auch gerne aus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--latte" aria-labelledby="erlebnis-title">
        <div className="container">
          <div className="section-head" data-reveal="">
            <span className="eyebrow">Mehr als ein Abendessen</span>
            <h2 id="erlebnis-title" className="t-h2">
              Live-Cooking und Events
            </h2>
            <p className="lead">
              Hausgemachte Pizza und Pasta, Live-Cooking und Events gehören zur Piazza. Was gerade geplant ist, erfahren
              Sie bei uns im Restaurant – und für Ihren eigenen Anlass sind wir gerne da.
            </p>
          </div>
          <ul className="principles">
            <li data-reveal="">
              <span className="num">01</span>
              <h3>Live-Cooking</h3>
              <p>Kochen, das man sieht und riecht – ein Teil des Abends spielt sich direkt vor den Gästen ab.</p>
            </li>
            <li data-reveal="">
              <span className="num">02</span>
              <h3>Events</h3>
              <p>
                Die Piazza ist auch ein Ort für Events. Welche als Nächstes anstehen, erfahren Sie direkt bei uns im
                Restaurant.
              </p>
            </li>
            <li data-reveal="">
              <span className="num">03</span>
              <h3>Ihr eigener Anlass</h3>
              <p>
                Geburtstag, Familienfest oder Firmenessen: Wir richten Ihren Anlass bei uns aus.{" "}
                <Link href="/anlaesse" className="text-link">
                  Mehr zu Anlässen
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="details-title">
        <div className="container">
          <h2 id="details-title" className="visually-hidden">
            Eindrücke
          </h2>
          <div className="duo">
            <div className="duo__a">
              <Figure name="tisch" ratio="3 / 2" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="duo__a-text" data-reveal="">
              <p className="t-h3 t-italic" style={{ fontFamily: "var(--font-serif)", color: "var(--espresso)" }}>
                Gedeckte Tische, rote Servietten, warmes Licht.
              </p>
            </div>
            <div className="duo__b-text" data-reveal="">
              <p className="t-h3 t-italic" style={{ fontFamily: "var(--font-serif)", color: "var(--espresso)" }}>
                Und frisch aus der Küche an den Tisch.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <Link href="/speisekarte" className="btn btn--secondary">
                  Speisekarte ansehen <Arrow />
                </Link>
              </p>
            </div>
            <div className="duo__b">
              <Figure name="serviceCaprese" ratio="4 / 5" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
