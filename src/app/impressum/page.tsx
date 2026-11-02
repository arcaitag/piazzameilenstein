import type { Metadata } from "next";
import Link from "next/link";
import { Pending } from "@/components/Blocks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name}.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  const op = site.operator;
  return (
    <div className="container container--narrow legal" style={{ paddingBlock: "clamp(3rem, 7vw, 6rem)" }}>
      <span className="eyebrow">Rechtliches</span>
      <h1 className="t-h1">Impressum</h1>

      <h2>Betreiberin der Website</h2>
      {op ? (
        <p>
          {op.company}
          <br />
          {op.street}
          <br />
          {op.zip} {op.city}
          <br />
          Schweiz
        </p>
      ) : (
        <p>
          {site.name}
          <br />
          <Pending>Firmenname, Rechtsform und Adresse der Betreiberin folgen in Kürze.</Pending>
        </p>
      )}

      <h2>Kontakt</h2>
      <p>
        {op?.phone || site.phone ? (
          <>
            Telefon: {op?.phone ?? site.phone?.display}
            <br />
          </>
        ) : null}
        {op?.email || site.email ? (
          <>
            E-Mail: <a href={`mailto:${op?.email ?? site.email}`}>{op?.email ?? site.email}</a>
            <br />
          </>
        ) : null}
        {!(op?.phone || site.phone || op?.email || site.email) ? <Pending>Telefon und E-Mail folgen in Kürze.</Pending> : null}
        <br />
        Kontaktformular:{" "}
        <Link href="/kontakt#nachricht" className="text-link">
          Nachricht schreiben
        </Link>
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>{op?.representative ?? <Pending />}</p>

      <h2>Handelsregister und UID</h2>
      <p>{op?.uid ?? <Pending />}</p>

      <h2>Haftungsausschluss</h2>
      <p>
        Wir prüfen die Inhalte dieser Website sorgfältig. Für die Richtigkeit, Vollständigkeit und Aktualität der Angaben
        können wir jedoch keine Gewähr übernehmen. Speisekarte, Preise und Angebote können sich ändern; massgebend ist die
        Karte im Restaurant.
      </p>
      <p>
        Für Inhalte externer Websites, auf die wir verlinken, sind ausschliesslich deren Betreiber verantwortlich.
      </p>

      <h2>Urheberrechte</h2>
      <p>
        Texte, Fotos, Logo und Gestaltung dieser Website sind urheberrechtlich geschützt. Eine Verwendung ausserhalb dieser
        Website ist nur mit schriftlicher Zustimmung erlaubt.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Wie wir mit Ihren Daten umgehen, lesen Sie in der{" "}
        <Link href="/datenschutz" className="text-link">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </div>
  );
}
