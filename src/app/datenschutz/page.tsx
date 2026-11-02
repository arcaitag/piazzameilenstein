import type { Metadata } from "next";
import Link from "next/link";
import { Pending } from "@/components/Blocks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${site.name}: welche Daten wir bei Besuch der Website und bei Anfragen bearbeiten und welche Rechte Sie haben.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  const op = site.operator;
  const contactEmail = op?.email ?? site.email;
  return (
    <div className="container container--narrow legal" style={{ paddingBlock: "clamp(3rem, 7vw, 6rem)" }}>
      <span className="eyebrow">Rechtliches</span>
      <h1 className="t-h1">Datenschutz&shy;erklärung</h1>
      <p className="lead" style={{ marginTop: "1.5rem" }}>
        Wir bearbeiten Personendaten nur, soweit es für den Betrieb dieser Website und für Ihre Anfragen nötig ist. Diese
        Erklärung richtet sich nach dem Schweizer Datenschutzgesetz (DSG).
      </p>

      <h2>1. Verantwortlich</h2>
      {op ? (
        <p>
          {op.company}, {op.street}, {op.zip} {op.city}, Schweiz
          {contactEmail ? (
            <>
              <br />
              E-Mail: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </>
          ) : null}
        </p>
      ) : (
        <p>
          {site.name}
          <br />
          <Pending>Name und Adresse der verantwortlichen Betreiberin folgen in Kürze.</Pending>
        </p>
      )}

      <h2>2. Besuch der Website und Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc. (USA) betrieben. Beim Aufruf einer Seite verarbeitet der Hosting-Anbieter
        technisch notwendige Daten in Server-Logfiles, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
        Referrer sowie Browser und Betriebssystem. Diese Daten dienen dem sicheren und stabilen Betrieb der Website und
        werden nicht mit anderen Daten zusammengeführt.
      </p>
      <p>
        Dabei können Daten in die USA übermittelt werden. Wir stützen uns hierfür auf die vom Anbieter bereitgestellten
        Garantien, etwa Standardvertragsklauseln oder eine Zertifizierung nach dem Data Privacy Framework.
      </p>
      <p>
        Bilder werden über den Bildoptimierungsdienst des Hostings in passender Grösse ausgeliefert. Schriften sind direkt auf
        dieser Website eingebunden; es werden keine Verbindungen zu Google Fonts oder anderen Schriftdiensten aufgebaut.
      </p>

      <h2>3. Reservations-, Anlass- und Kontaktformular</h2>
      <p>
        Wenn Sie uns über ein Formular schreiben, bearbeiten wir die Angaben, die Sie eingeben – etwa Name, E-Mail-Adresse,
        Telefonnummer, Datum, Uhrzeit, Anzahl Personen und Ihre Nachricht. Wir verwenden sie ausschliesslich, um Ihre
        Reservation, Ihren Anlass oder Ihre Anfrage zu bearbeiten und mit Ihnen in Kontakt zu treten.
      </p>
      <p>
        Die Angaben werden per E-Mail an uns übermittelt.{" "}
        {site.emailService ? (
          <>
            Für den Versand setzen wir {site.emailService.name} ({site.emailService.location}) ein.
          </>
        ) : (
          <Pending>Der eingesetzte E-Mail-Versanddienst wird hier ergänzt.</Pending>
        )}{" "}
        Wir bewahren die Anfragen nur so lange auf, wie es für die Bearbeitung und allfällige gesetzliche
        Aufbewahrungspflichten nötig ist.
      </p>
      <p>
        Zum Schutz vor Missbrauch prüfen wir beim Absenden technisch, ob das Formular von einem Menschen ausgefüllt wurde. Dafür
        werden keine Cookies gesetzt und keine Drittdienste eingebunden.
      </p>

      <h2>4. Cookies, Analyse und Tracking</h2>
      <p>
        Diese Website setzt keine Cookies, verwendet keine Analyse- oder Trackingdienste und bindet keine Social-Media-Plugins
        ein.
      </p>

      <h2>5. Weitergabe von Daten</h2>
      <p>
        Wir geben Ihre Daten nicht an Dritte weiter, ausser an die oben genannten Dienstleister, soweit dies für den Betrieb der
        Website und die Bearbeitung Ihrer Anfrage nötig ist, oder wenn wir gesetzlich dazu verpflichtet sind.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>Sie haben im Rahmen des Datenschutzgesetzes insbesondere das Recht,</p>
      <ul>
        <li>Auskunft darüber zu verlangen, ob und welche Personendaten wir über Sie bearbeiten,</li>
        <li>unrichtige Daten berichtigen zu lassen,</li>
        <li>die Löschung Ihrer Daten zu verlangen, soweit keine Aufbewahrungspflicht besteht,</li>
        <li>der Bearbeitung zu widersprechen und die Herausgabe Ihrer Daten zu verlangen.</li>
      </ul>
      <p>
        Wenden Sie sich dafür an{" "}
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        ) : (
          <>
            uns über das{" "}
            <Link href="/kontakt#nachricht" className="text-link">
              Kontaktformular
            </Link>
          </>
        )}
        . Zudem können Sie sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren.
      </p>

      <h2>7. Änderungen</h2>
      <p>
        Wir passen diese Erklärung an, wenn sich unsere Website oder die eingesetzten Dienste ändern. Es gilt die jeweils hier
        veröffentlichte Fassung.
      </p>
      <p className="muted small">Stand: November 2026</p>
    </div>
  );
}
