/**
 * Gemeinsame Regeln für alle Formulare – gleich im Browser und auf dem Server.
 * Keine externen Abhängigkeiten, damit die Prüfung überall identisch läuft.
 */

export type FormKind = "reservation" | "anlass" | "kontakt";
export type Values = Record<string, string>;
export type Errors = Record<string, string>;

export const AREA_OPTIONS = [
  { value: "egal", label: "Keine Präferenz" },
  { value: "innen", label: "Innen" },
  { value: "terrasse", label: "Terrasse" },
] as const;

export const EVENT_TYPES = [
  { value: "privat", label: "Private Feier" },
  { value: "business", label: "Geschäftsanlass" },
] as const;

export const OCCASIONS = [
  "Geburtstag",
  "Hochzeit oder Verlobung",
  "Familienfest",
  "Jubiläum",
  "Geschäftsessen",
  "Firmenfeier oder Teamanlass",
  "Apéro",
  "Anderes",
] as const;

export const LIMITS = { name: 80, email: 160, phone: 40, company: 120, subject: 140, message: 3000, note: 1500 } as const;
export const MAX_PERSONS = 60;
export const MAX_GUESTS = 500;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const MSG = {
  required: "Bitte füllen Sie dieses Feld aus.",
  choose: "Bitte wählen Sie eine Option.",
  email: "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@beispiel.ch.",
  phone: "Bitte geben Sie eine gültige Telefonnummer ein.",
  date: "Bitte wählen Sie ein gültiges Datum.",
  past: "Das Datum darf nicht in der Vergangenheit liegen.",
  far: "Bitte wählen Sie ein Datum innerhalb der nächsten zwölf Monate.",
  time: "Bitte geben Sie eine gültige Uhrzeit an, z. B. 19:30.",
  consent: "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben.",
  tooLong: (n: number) => `Bitte kürzen Sie Ihren Text auf höchstens ${n} Zeichen.`,
  short: "Bitte schreiben Sie uns ein paar Worte mehr.",
};

/** Heutiges Datum in Zürcher Zeit als YYYY-MM-DD */
export function todayZurich(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + months, d));
  return dt.toISOString().slice(0, 10);
}

function isRealDate(iso: string): boolean {
  if (!DATE_RE.test(iso)) return false;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function formatDateCH(iso: string): string {
  if (!isRealDate(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

const clean = (v: unknown, max = 4000) =>
  typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max + 1) : "";

/** Felder je Formular (nur diese werden übernommen) */
export const FIELDS: Record<FormKind, string[]> = {
  reservation: ["date", "time", "persons", "area", "firstName", "lastName", "email", "phone", "message", "consent"],
  anlass: ["eventType", "occasion", "date", "altDate", "time", "guests", "firstName", "lastName", "company", "email", "phone", "message", "consent"],
  kontakt: ["name", "email", "phone", "subject", "message", "consent"],
};

export function pick(kind: FormKind, input: Record<string, unknown>): Values {
  const out: Values = {};
  for (const key of FIELDS[kind]) out[key] = clean(input[key]);
  return out;
}

function requireText(v: Values, e: Errors, key: string, max: number, min = 1) {
  const val = v[key] ?? "";
  if (!val) e[key] = MSG.required;
  else if (val.length > max) e[key] = MSG.tooLong(max);
  else if (val.length < min) e[key] = MSG.required;
}

function checkEmail(v: Values, e: Errors) {
  if (!v.email) e.email = MSG.required;
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) e.email = MSG.email;
}

function checkPhone(v: Values, e: Errors, required: boolean) {
  const raw = v.phone ?? "";
  if (!raw) {
    if (required) e.phone = MSG.required;
    return;
  }
  const digits = raw.replace(/\D/g, "");
  if (raw.length > LIMITS.phone || digits.length < 7 || /[^\d\s+()./-]/.test(raw)) e.phone = MSG.phone;
}

function checkFutureDate(v: Values, e: Errors, key: string, required: boolean, today: string) {
  const val = v[key] ?? "";
  if (!val) {
    if (required) e[key] = MSG.required;
    return;
  }
  if (!isRealDate(val)) e[key] = MSG.date;
  else if (val < today) e[key] = MSG.past;
  else if (val > addMonths(today, 12)) e[key] = MSG.far;
}

function checkInt(v: Values, e: Errors, key: string, min: number, max: number) {
  const val = v[key] ?? "";
  if (!val) {
    e[key] = MSG.required;
    return;
  }
  const n = Number(val);
  if (!Number.isInteger(n) || n < min || n > max) e[key] = `Bitte geben Sie eine Zahl zwischen ${min} und ${max} ein.`;
}

function checkOptionalText(v: Values, e: Errors, key: string, max: number) {
  if ((v[key] ?? "").length > max) e[key] = MSG.tooLong(max);
}

export function validate(kind: FormKind, v: Values, today = todayZurich()): Errors {
  const e: Errors = {};

  if (kind === "reservation") {
    checkFutureDate(v, e, "date", true, today);
    if (!v.time) e.time = MSG.required;
    else if (!TIME_RE.test(v.time)) e.time = MSG.time;
    checkInt(v, e, "persons", 1, MAX_PERSONS);
    if (v.area && !AREA_OPTIONS.some((o) => o.value === v.area)) e.area = MSG.choose;
    requireText(v, e, "firstName", LIMITS.name);
    requireText(v, e, "lastName", LIMITS.name);
    checkEmail(v, e);
    checkPhone(v, e, true);
    checkOptionalText(v, e, "message", LIMITS.note);
  }

  if (kind === "anlass") {
    if (!EVENT_TYPES.some((o) => o.value === v.eventType)) e.eventType = MSG.choose;
    if (v.occasion && !OCCASIONS.includes(v.occasion as (typeof OCCASIONS)[number])) e.occasion = MSG.choose;
    checkFutureDate(v, e, "date", true, today);
    checkFutureDate(v, e, "altDate", false, today);
    if (v.time && !TIME_RE.test(v.time)) e.time = MSG.time;
    checkInt(v, e, "guests", 1, MAX_GUESTS);
    requireText(v, e, "firstName", LIMITS.name);
    requireText(v, e, "lastName", LIMITS.name);
    checkOptionalText(v, e, "company", LIMITS.company);
    checkEmail(v, e);
    checkPhone(v, e, true);
    checkOptionalText(v, e, "message", LIMITS.message);
  }

  if (kind === "kontakt") {
    requireText(v, e, "name", LIMITS.name);
    checkEmail(v, e);
    checkPhone(v, e, false);
    checkOptionalText(v, e, "subject", LIMITS.subject);
    if (!v.message) e.message = MSG.required;
    else if (v.message.length > LIMITS.message) e.message = MSG.tooLong(LIMITS.message);
    else if (v.message.length < 10) e.message = MSG.short;
  }

  if (v.consent !== "yes") e.consent = MSG.consent;
  return e;
}

export const KIND_LABEL: Record<FormKind, string> = {
  reservation: "Reservationsanfrage",
  anlass: "Anlass-Anfrage",
  kontakt: "Kontaktanfrage",
};

export const FIELD_LABEL: Record<string, string> = {
  date: "Datum",
  time: "Uhrzeit",
  persons: "Personen",
  area: "Bereich",
  firstName: "Vorname",
  lastName: "Nachname",
  name: "Name",
  email: "E-Mail",
  phone: "Telefon",
  message: "Nachricht",
  eventType: "Art des Anlasses",
  occasion: "Anlass",
  altDate: "Ausweichdatum",
  guests: "Anzahl Gäste",
  company: "Firma",
  subject: "Betreff",
  consent: "Datenschutz",
};

export function optionLabel(key: string, value: string): string {
  if (key === "area") return AREA_OPTIONS.find((o) => o.value === value)?.label ?? value;
  if (key === "eventType") return EVENT_TYPES.find((o) => o.value === value)?.label ?? value;
  if (key === "date" || key === "altDate") return formatDateCH(value);
  if (key === "consent") return value === "yes" ? "Datenschutzerklärung bestätigt" : "nicht bestätigt";
  return value;
}
