import { site } from "@/content/site";

/** Alternative Kontaktwege – erscheinen nur, wenn sie in site.ts hinterlegt sind. */
export default function ContactFallback() {
  if (site.phone && site.email) {
    return (
      <>
        Rufen Sie uns an unter <a href={site.phone.href}>{site.phone.display}</a> oder schreiben Sie an{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </>
    );
  }
  if (site.phone) {
    return (
      <>
        Rufen Sie uns gerne an: <a href={site.phone.href}>{site.phone.display}</a>.
      </>
    );
  }
  if (site.email) {
    return (
      <>
        Schreiben Sie uns gerne an <a href={`mailto:${site.email}`}>{site.email}</a>.
      </>
    );
  }
  return <>Gerne nehmen wir Ihr Anliegen auch direkt im Restaurant entgegen.</>;
}
