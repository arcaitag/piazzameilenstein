export type FaqItem = { q: string; a: string; link?: { href: string; label: string } };
export type FaqGroup = { title: string; items: FaqItem[] };

export const faq: FaqGroup[] = [
  {
    title: "Reservation & Besuch",
    items: [
      {
        q: "Wie reserviere ich einen Tisch?",
        a: "Über unser Reservationsformular. Geben Sie Datum, Uhrzeit und Anzahl Personen an – wir prüfen die Verfügbarkeit und melden uns per E-Mail oder Telefon bei Ihnen.",
        link: { href: "/reservation", label: "Zur Reservation" },
      },
      {
        q: "Ab wann ist meine Reservation verbindlich?",
        a: "Ihre Anfrage über das Formular ist noch keine feste Buchung. Verbindlich ist die Reservation erst, wenn wir sie Ihnen bestätigt haben.",
      },
      {
        q: "Kann ich auf der Terrasse sitzen?",
        a: "Ja, unsere Terrasse liegt unter grossen Sonnenschirmen. Vermerken Sie bei der Reservation einfach, dass Sie gerne draussen sitzen möchten – je nach Wetter richten wir uns danach.",
      },
      {
        q: "Wir sind eine grössere Gruppe. Wie gehen wir vor?",
        a: "Für Feiern, Firmenessen und andere Anlässe nutzen Sie am besten unsere Anlass-Anfrage. So können wir Datum, Gästezahl und Ihre Wünsche gemeinsam mit Ihnen besprechen.",
        link: { href: "/anlaesse#anfrage", label: "Anlass anfragen" },
      },
    ],
  },
  {
    title: "Essen & Allergien",
    items: [
      {
        q: "Ich habe eine Allergie oder Unverträglichkeit. Was muss ich tun?",
        a: "Bitte sagen Sie es unserem Servicepersonal vor der Bestellung. Wir informieren Sie gerne über Zutaten und Zubereitung. Bei einer Reservation können Sie es bereits im Bemerkungsfeld angeben.",
      },
      {
        q: "Gibt es glutenfreie Pizza?",
        a: "Ja. Glutenfreie Pizza bieten wir gegen einen Aufpreis von CHF 5.– an.",
      },
      {
        q: "Gibt es Gerichte ohne Fleisch und Fisch?",
        a: "Ja, zum Beispiel Spaghetti al Pomodoro Fresco e Basilico oder die Pizzen Margherita, Ai Funghi und Dell’Orto. Wenn Sie streng vegetarisch oder vegan essen, fragen Sie bitte unser Team – es weiss, was in den einzelnen Gerichten steckt.",
        link: { href: "/speisekarte", label: "Zur Speisekarte" },
      },
      {
        q: "Woher stammen Fleisch und Fisch?",
        a: "Die Herkunft deklarieren wir auf der Speisekarte. Kalb kommt aus der Schweiz, Rind aus Argentinien und den USA, Lamm aus Australien – die vollständige Liste finden Sie bei den Allergenen und Herkunftsangaben.",
        link: { href: "/speisekarte#allergene", label: "Herkunft & Allergene" },
      },
      {
        q: "Was bedeutet «Dry Aged»?",
        a: "Bei der traditionellen Trockenreifung reift das Rindfleisch am Knochen – bei uns gut sichtbar in der Show-Kühlvitrine. Dabei wird es mürbe, besonders zart und entwickelt ein typisches, vorzügliches Aroma.",
        link: { href: "/speisekarte#bisteccheria", label: "Zur Bisteccheria" },
      },
      {
        q: "Kann ich die Speisekarte herunterladen?",
        a: "Ja, die ganze Karte gibt es auch als PDF – auf der Seite Speisekarte ganz oben.",
        link: { href: "/speisekarte", label: "Zur Speisekarte" },
      },
    ],
  },
  {
    title: "Anlässe",
    items: [
      {
        q: "Können wir bei Ihnen feiern oder einen Firmenanlass durchführen?",
        a: "Gerne. Schicken Sie uns über die Anlass-Anfrage Datum, Gästezahl und Ihre Vorstellungen. Wir melden uns persönlich und besprechen die Details mit Ihnen.",
        link: { href: "/anlaesse#anfrage", label: "Anlass anfragen" },
      },
      {
        q: "Sind die Preise inklusive Mehrwertsteuer?",
        a: "Ja, alle Preise auf unserer Karte verstehen sich in Schweizer Franken inklusive der gesetzlichen Mehrwertsteuer.",
      },
    ],
  },
];
