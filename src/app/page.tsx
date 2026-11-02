import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import Figure from "@/components/Figure";
import { ArrowLink, CtaBand } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { pizzaCount } from "@/content/menu";
import { site } from "@/content/site";
import type { PhotoKey } from "@/content/images";

const chapters: { num: string; title: string; text: string; href: string; image: PhotoKey }[] = [
  {
    num: "01",
    title: "Antipasti & Pasta",
    text: "Burrata di Andria mit Parmaschinken, Vitello Tonnato, Carpaccio – und Pasta von der Carbonara mit Guanciale bis zu den Paccheri aus eigener Produktion.",
    href: "/speisekarte#antipasti",
    image: "capreseOel",
  },
  {
    num: "02",
    title: "Pizze",
    text: `${pizzaCount} Pizzen in drei Familien: die Klassiker, die Spezialitäten und die Bianche ohne Tomatensauce. Glutenfreie Pizza auf Wunsch.`,
    href: "/speisekarte#pizze",
    image: "pizza",
  },
  {
    num: "03",
    title: "Bisteccheria",
    text: "Dry Aged Beef, Bife Argentino à la minute vom heissen Grill und Platten zum Teilen für bis zu vier Personen.",
    href: "/speisekarte#bisteccheria",
    image: "steak",
  },
  {
    num: "04",
    title: "Weinkarte",
    text: "Weine aus dem Wallis, dem Tessin und der Bündner Herrschaft, grosse Namen aus Italien und Champagner – viele auch im Offenausschank.",
    href: "/speisekarte#vini",
    image: "tisch",
  },
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    servesCuisine: ["Italienisch", "Pizza", "Pasta", "Steaks"],
    hasMenu: `${site.url}/speisekarte`,
    acceptsReservations: true,
    address: site.address
      ? {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.zip,
          addressLocality: site.address.city,
          addressCountry: "CH",
        }
      : { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "CH" },
    ...(site.phone ? { telephone: site.phone.display } : {}),
    ...(site.email ? { email: site.email } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function HomePage() {
  return (
    <>
      <JsonLd />

      <section className="hero" aria-labelledby="hero-title">
        <HeroSlideshow slides={["innenraum", "terrasse", "ferrari"]} />
        <div className="hero__content">
          <span className="eyebrow">{site.tagline}</span>
          <h1 id="hero-title" className="t-display">
            Willkommen auf der Piazza.
          </h1>
          <p className="hero__text">
            Hausgemachte Pizza und Pasta, Steaks vom Grill und eine Weinkarte von Prosecco bis Sassicaia – drinnen unter
            einem Dach aus Grün, draussen unter grossen Sonnenschirmen.
          </p>
          <div className="btn-row">
            <Link href="/reservation" className="btn btn--primary">
              Tisch reservieren <Arrow />
            </Link>
            <Link href="/speisekarte" className="btn btn--secondary">
              Speisekarte ansehen
            </Link>
          </div>
          <p className="hero__note">
            Feier oder Firmenessen geplant?{" "}
            <Link href="/anlaesse" className="text-link">
              Anlass anfragen
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="intro-title">
        <div className="container intro-split">
          <div className="intro-split__media">
            <Figure name="serviceCaprese" ratio="4 / 5" sizes="(max-width: 899px) 100vw, 40vw" />
          </div>
          <div className="intro-split__text">
            <div data-reveal="">
              <span className="eyebrow">Die Piazza</span>
              <h2 id="intro-title" className="t-h2">
                Ein Platz, an dem man sich trifft.
              </h2>
              <div className="prose" style={{ marginTop: "1.6rem" }}>
                <p className="lead">
                  Auf einer italienischen Piazza kommt man zusammen – zum Essen, zum Reden, zum Bleiben. Genau so verstehen
                  wir unser Restaurant.
                </p>
                <p>
                  Auf den Tisch kommen Antipasti zum Teilen, Pizza aus dem Ofen, Pasta aus eigener Produktion und
                  Rindfleisch, das am Knochen in unserer Show-Kühlvitrine reift. Und wenn Sie wissen möchten, welches
                  Steak zu Ihnen passt: Unser Service erklärt es Ihnen gerne.
                </p>
              </div>
              <p style={{ marginTop: "1.8rem" }}>
                <ArrowLink href="/kulinarik">Mehr über unsere Küche</ArrowLink>
              </p>
            </div>
            <div className="intro-split__aside">
              <Figure name="lamm" ratio="4 / 3" sizes="340px" delay={0.1} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--foam" aria-labelledby="kueche-title">
        <div className="container">
          <div className="section-head" data-reveal="">
            <span className="eyebrow">Aus der Küche</span>
            <h2 id="kueche-title" className="t-h2">
              Was auf den Tisch kommt
            </h2>
          </div>
          <ol className="chapters">
            {chapters.map((c, i) => (
              <li key={c.num} className="chapter" data-reveal="" style={{ ["--delay" as string]: `${i * 0.06}s` }}>
                <Link href={c.href}>
                  <div className="chapter__num" aria-hidden="true">
                    {c.num}
                  </div>
                  <h3 className="chapter__title">{c.title}</h3>
                  <div>
                    <p className="chapter__text">{c.text}</p>
                    <div className="chapter__more link-arrow" style={{ display: "flex", width: "fit-content" }}>
                      Zur Karte <Arrow />
                    </div>
                  </div>
                  <div className="chapter__media">
                    <Figure name={c.image} ratio="4 / 3" ratioNarrow="16 / 10" sizes="(max-width: 899px) 100vw, 240px" reveal={false} decorative />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="bar-title">
        <div className="container">
          <div className="feature">
            <div className="feature__media">
              <Figure name="bar" ratio="3 / 2" ratioNarrow="4 / 3" sizes="(max-width: 899px) 100vw, 56vw" />
            </div>
            <div className="feature__text" data-reveal="">
              <span className="eyebrow">Restaurant &amp; Bar</span>
              <h2 id="bar-title" className="t-h2">
                Erst an die Bar, dann an den Tisch.
              </h2>
              <p>
                Ein Spritz zum Ankommen, danach Platz nehmen im grossen Gastraum unter Bambus und Grünpflanzen – oder
                draussen auf der Terrasse. Live-Cooking und Events gehören bei uns ebenfalls dazu.
              </p>
              <p style={{ marginTop: "1.6rem" }}>
                <ArrowLink href="/restaurant">Restaurant entdecken</ArrowLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="anlass-title">
        <div className="container">
          <div className="panel" data-reveal="">
            <div>
              <span className="eyebrow">Feiern &amp; Firmenanlässe</span>
              <h2 id="anlass-title" className="t-h2">
                Sie planen ein Fest oder ein Geschäftsessen?
              </h2>
            </div>
            <div className="panel__aside">
              <p>
                Geburtstag, Familienfest, Firmenessen oder Teamabend: Schicken Sie uns Datum, Gästezahl und Ihre Wünsche.
                Wir melden uns persönlich und besprechen alles Weitere mit Ihnen.
              </p>
              <div className="btn-row" style={{ marginTop: "0.75rem" }}>
                <Link href="/anlaesse#anfrage" className="btn btn--primary">
                  Anlass anfragen <Arrow />
                </Link>
                <Link href="/anlaesse" className="btn btn--light">
                  Mehr erfahren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
