import Link from "next/link";
import { footerNav, site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/piazza-meilenstein.svg" alt="Piazza Meilenstein" width={180} height={94} loading="lazy" />
            <p>Hausgemachte Pizza und Pasta, Steaks vom Grill und eine grosse Weinkarte in {site.city}.</p>
          </div>

          <div className="footer-col">
            <h2>Besuch</h2>
            {site.address ? (
              <address>
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </address>
            ) : (
              <p>{site.city}</p>
            )}
            {site.hours ? (
              <ul style={{ marginTop: "1rem" }}>
                {site.hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                    {h.note ? ` (${h.note})` : ""}
                  </li>
                ))}
              </ul>
            ) : null}
            <p style={{ marginTop: "1rem" }}>
              <Link href="/kontakt">Kontakt &amp; Anreise</Link>
            </p>
          </div>

          <div className="footer-col">
            <h2>Seiten</h2>
            <ul>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2>Kontakt</h2>
            <ul>
              {site.phone ? (
                <li>
                  <a href={site.phone.href}>{site.phone.display}</a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              ) : null}
              <li>
                <Link href="/kontakt#nachricht">Nachricht schreiben</Link>
              </li>
              <li>
                <Link href="/anlaesse#anfrage">Anlass anfragen</Link>
              </li>
              <li>
                <Link href="/reservation">Tisch reservieren</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {site.name}
          </p>
          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
