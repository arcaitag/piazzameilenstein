# Piazza Meilenstein – Website

Next.js 16 (App Router), React 19, TypeScript. Alle Seiten werden statisch vorgerendert, nur die Formulare laufen über eine Serverfunktion (`/api/anfrage`).

## Lokal starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Inhalte pflegen

| Was | Wo |
|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Anreise, Betreiberin (Impressum/Datenschutz) | `src/content/site.ts` – Öffnungszeiten nur in `openingHours` ändern (Footer, Kontaktseite und Google-Daten übernehmen sie). Felder mit `null` sind noch offen. |
| Speisekarte (Gerichte, Preise, Weine, Allergene, Herkunft) | `src/content/menu.json` – identisch mit der PDF-Karte |
| PDF der Speisekarte | `public/downloads/speisekarte-piazza-meilenstein.pdf` |
| Häufige Fragen | `src/content/faq.ts` |
| Fotos inkl. Alternativtexte und Bildausschnitt | `src/assets/photos/`, `src/content/images.ts` |

## Formulare und E-Mail-Versand

Reservation, Anlass-Anfrage und Kontakt senden an eine Serverfunktion. Diese prüft die Eingaben erneut, filtert Spam (verstecktes Feld, Mindest-Ausfüllzeit, Ratenlimit) und verschickt die Anfrage per E-Mail. **Eine Erfolgsmeldung erscheint nur, wenn der Mailversand tatsächlich geklappt hat.** Ohne Konfiguration antwortet die Funktion mit einem Fehler und das Formular zeigt das an.

Umgebungsvariablen in Vercel (*Settings → Environment Variables*), siehe `.env.example`:

- `MAIL_TO` – Empfängeradresse des Restaurants
- `MAIL_FROM` – Absender, z. B. `Piazza Meilenstein <anfragen@domain.ch>`
- **Entweder** `RESEND_API_KEY` (Resend, Absenderdomain dort verifizieren)
- **oder** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- optional `SEND_GUEST_COPY=true` – Gäste erhalten eine Eingangsbestätigung (ausdrücklich keine Reservationsbestätigung)

Nach dem Setzen der Variablen neu deployen. In der Datenschutzerklärung den Versanddienst in `site.emailService` eintragen.

## Suchmaschinen

- **Indexierung:** Auf der Produktionsumgebung (`VERCEL_ENV=production`) ist die Website für Google freigegeben. Vorschau-Deployments und lokale Builds tragen `noindex` und `robots.txt` sperrt sie.
- **Hauptadresse:** https://www.piazza-meilenstein.ch (fest in `site.ts`, bei einem Domainwechsel dort und in `next.config.ts` anpassen). Canonical-Links, Sitemap, Vorschaubilder und strukturierte Daten verwenden sie. `piazza-meilenstein.vercel.app` leitet dauerhaft dorthin um (`next.config.ts`).
- **Sitemap:** https://www.piazza-meilenstein.ch/sitemap.xml
- **Strukturierte Daten** (Startseite): `Restaurant` mit Adresse, Telefon, Öffnungszeiten, Speisekarte, Reservation und Preisspanne sowie `WebSite` für den Namen in den Suchergebnissen.
- **Google Search Console:** Domain bestätigen (DNS-Eintrag) oder den Code der Methode «HTML-Tag» als `GOOGLE_SITE_VERIFICATION` in Vercel eintragen und neu deployen. Danach die Sitemap einreichen.

## Veröffentlichen

Dieses Repository ist mit dem Vercel-Projekt **piazza-meilenstein** (Team «Beni's projects») verbunden. Jeder Push auf `main` wird automatisch gebaut (Node 24) und unter https://www.piazza-meilenstein.ch veröffentlicht. Pushes auf andere Branches ergeben eine Vorschau-Adresse.

Von Hand geht es auch:

```bash
npx vercel link    # einmalig, mit dem Vercel-Konto des Teams
npx vercel --prod
```

**Zugriffsschutz:** In Vercel ist «Standard Protection» eingestellt. Die Produktionsadresse ist öffentlich; Vorschau- und einzelne Deployment-Adressen verlangen ein Vercel-Login. Eine eigene Domain wird unter *Project → Settings → Domains* verbunden.
