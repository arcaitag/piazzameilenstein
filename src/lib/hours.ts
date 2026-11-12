/**
 * Öffnungszeiten einmal erfassen, zweimal verwenden:
 * als lesbare Zeilen für Footer und Kontaktseite und als strukturierte Daten für Google.
 */

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type OpeningHours = {
  days: Weekday[];
  /** 24-Stunden-Format, z. B. "06:30" */
  opens: string;
  closes: string;
};

export type HoursRow = { days: string; time: string; note?: string };

const WEEK: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DE: Record<Weekday, string> = {
  Monday: "Montag",
  Tuesday: "Dienstag",
  Wednesday: "Mittwoch",
  Thursday: "Donnerstag",
  Friday: "Freitag",
  Saturday: "Samstag",
  Sunday: "Sonntag",
};

function dayLabel(days: Weekday[]): string {
  const idx = [...new Set(days.map((d) => WEEK.indexOf(d)))].sort((a, b) => a - b);
  if (idx.length === 7) return "Täglich";
  const names = idx.map((i) => DE[WEEK[i]]);
  const consecutive = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (consecutive && idx.length >= 3) return `${names[0]}–${names[names.length - 1]}`;
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} und ${names[names.length - 1]}`;
}

/** "06:30" → "06.30" (Schweizer Schreibweise) */
const clock = (t: string) => t.replace(":", ".");

export function hoursRows(spec: OpeningHours[]): HoursRow[] {
  return spec.map((s) => ({ days: dayLabel(s.days), time: `${clock(s.opens)}–${clock(s.closes)} Uhr` }));
}

export function openingHoursSpecification(spec: OpeningHours[]) {
  return spec.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: s.days,
    opens: s.opens,
    closes: s.closes,
  }));
}
