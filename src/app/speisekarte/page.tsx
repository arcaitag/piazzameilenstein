import type { Metadata } from "next";
import Link from "next/link";
import MenuNav from "@/components/menu/MenuNav";
import { MenuSectionView } from "@/components/menu/MenuBlocks";
import { Arrow, Download } from "@/components/Icons";
import { menu } from "@/content/menu";
import { menuPdf } from "@/content/site";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Die ganze Karte von Piazza Meilenstein: Antipasti, Insalate, Pasta und Risotto, Secondi, Pizze, Bisteccheria mit Dry Aged Beef sowie die Weinkarte – mit Preisen, Allergenen und Herkunft.",
  alternates: { canonical: "/speisekarte" },
};

export default function SpeisekartePage() {
  const navItems = [...menu.sections.map((s) => ({ id: s.id, label: s.nav })), { id: "allergene", label: "Allergene" }];
  const codes = Object.entries(menu.originCodes).filter(([k]) => !k.includes("&"));

  return (
    <div className="container menu-page">
      <header className="menu-head">
        <div>
          <span className="eyebrow">La Carta</span>
          <h1 className="t-h1">Speisekarte</h1>
          <p className="lead" style={{ marginTop: "1.3rem" }}>
            Alle Preise in Schweizer Franken inklusive Mehrwertsteuer. Bei Allergien und Unverträglichkeiten beraten wir
            Sie gerne.
          </p>
        </div>
        <div className="menu-head__actions">
          <a href={menuPdf.href} className="btn btn--secondary" download>
            {menuPdf.label} <Download />
          </a>
          <p className="small muted">PDF, {menuPdf.size}</p>
        </div>
      </header>

      <div className="menu-layout">
        <MenuNav items={navItems} pdf={menuPdf} />

        <div className="menu-content">
          {menu.sections.map((section) => (
            <MenuSectionView key={section.id} section={section} />
          ))}

          <section id="allergene" className="menu-section" aria-labelledby="allergene-title">
            <header className="menu-section__head">
              <span className="eyebrow">Gut zu wissen</span>
              <h2 id="allergene-title" className="t-h2">
                Allergene &amp; Herkunft
              </h2>
            </header>
            <p>{menu.allergyNote}</p>

            <div className="menu-group" style={{ marginTop: "2.5rem" }}>
              <h3 className="menu-group__title">Allergen-Legende · Legenda allergeni</h3>
              <ul className="allergen-grid">
                {menu.allergens.map((a) => (
                  <li key={a.de}>
                    {a.de}
                    <span className="it" lang="it">
                      {a.it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-group" style={{ marginTop: "2.5rem" }}>
              <h3 className="menu-group__title">Herkunft unseres Fleisches und Fisches</h3>
              <dl className="origin-list">
                {menu.origin.map((o) => (
                  <div key={o.label}>
                    <dt>{o.label}</dt>
                    <dd>{o.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="code-legend">
                Kürzel auf der Karte:{" "}
                {codes.map(([code, label], i) => (
                  <span key={code}>
                    <abbr title={label}>{code}</abbr> {label}
                    {i < codes.length - 1 ? " · " : ""}
                  </span>
                ))}{" "}
                · <abbr title="FAO-Fanggebiet 71">FAO 71</abbr> Westlicher Zentralpazifik
              </p>
            </div>

            <div className="menu-group" style={{ marginTop: "2.5rem" }}>
              <h3 className="menu-group__title">LDV-Deklaration</h3>
              <p>{menu.ldv}</p>
              <p className="muted" style={{ marginTop: "1rem" }}>
                {menu.priceNote}
              </p>
            </div>
          </section>

          <div className="menu-section" style={{ paddingTop: "4rem" }}>
            <div className="panel">
              <div>
                <span className="eyebrow">Appetit bekommen?</span>
                <h2 className="t-h3">Reservieren Sie Ihren Tisch – wir bestätigen ihn persönlich.</h2>
              </div>
              <div className="panel__aside">
                <Link href="/reservation" className="btn btn--primary">
                  Tisch reservieren <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
