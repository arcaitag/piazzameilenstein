import { NextResponse } from "next/server";
import { FIELD_LABEL, KIND_LABEL, optionLabel, pick, validate, formatDateCH, type FormKind, type Values } from "@/lib/forms";
import { escapeHtml, mailProvider, recipient, sendMail, MailError } from "@/lib/mail";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS: FormKind[] = ["reservation", "anlass", "kontakt"];
const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 2000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

function fail(status: number, code: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, code, ...extra }, { status, headers: { "Cache-Control": "no-store" } });
}

function subjectFor(kind: FormKind, v: Values): string {
  const who = kind === "kontakt" ? v.name : `${v.firstName} ${v.lastName}`;
  if (kind === "reservation") return `Reservationsanfrage ${formatDateCH(v.date)}, ${v.time} Uhr, ${v.persons} Pers. – ${who}`;
  if (kind === "anlass") {
    const type = optionLabel("eventType", v.eventType);
    return `Anlass-Anfrage (${type}) ${formatDateCH(v.date)}, ${v.guests} Gäste – ${who}`;
  }
  return `Kontaktanfrage${v.subject ? `: ${v.subject}` : ""} – ${who}`;
}

function rows(kind: FormKind, v: Values): [string, string][] {
  const order: Record<FormKind, string[]> = {
    reservation: ["date", "time", "persons", "area", "firstName", "lastName", "email", "phone", "message"],
    anlass: ["eventType", "occasion", "date", "altDate", "time", "guests", "firstName", "lastName", "company", "email", "phone", "message"],
    kontakt: ["name", "email", "phone", "subject", "message"],
  };
  return order[kind].filter((k) => v[k]).map((k) => [FIELD_LABEL[k] ?? k, optionLabel(k, v[k])]);
}

function staffMail(kind: FormKind, v: Values) {
  const list = rows(kind, v);
  const intro =
    kind === "reservation"
      ? "Neue Reservationsanfrage über die Website. Die Anfrage ist noch NICHT bestätigt – bitte dem Gast die Reservation bestätigen oder absagen."
      : kind === "anlass"
        ? "Neue Anlass-Anfrage über die Website. Bitte mit dem Gast Kontakt aufnehmen."
        : "Neue Nachricht über das Kontaktformular der Website.";
  const text = `${intro}\n\n${list.map(([k, val]) => `${k}: ${val}`).join("\n")}\n\nAntworten Sie direkt auf diese E-Mail, um dem Gast zu schreiben.`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#2E2119">
<p style="margin:0 0 16px">${escapeHtml(intro)}</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;border:1px solid #E4D6C6">
${list
  .map(
    ([k, val]) =>
      `<tr><th align="left" valign="top" style="background:#F8F4EF;border:1px solid #E4D6C6;font-weight:600;white-space:nowrap">${escapeHtml(k)}</th><td style="border:1px solid #E4D6C6">${escapeHtml(val).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:16px 0 0;color:#6B5B50">Antworten Sie direkt auf diese E-Mail, um dem Gast zu schreiben.</p></div>`;
  return { subject: subjectFor(kind, v), text, html };
}

function guestMail(kind: FormKind, v: Values) {
  const name = kind === "kontakt" ? v.name : v.firstName;
  const what =
    kind === "reservation"
      ? `Ihre Reservationsanfrage für ${formatDateCH(v.date)} um ${v.time} Uhr (${v.persons} Personen) ist bei uns eingegangen. Bitte beachten Sie: Das ist noch keine Bestätigung. Wir prüfen die Verfügbarkeit und melden uns bei Ihnen.`
      : kind === "anlass"
        ? "Ihre Anlass-Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei Ihnen, um die Details zu besprechen."
        : "Ihre Nachricht ist bei uns eingegangen. Wir melden uns so bald wie möglich bei Ihnen.";
  const text = `Grüezi ${name}\n\n${what}\n\nFreundliche Grüsse\n${site.name}`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2E2119"><p>Grüezi ${escapeHtml(name)}</p><p>${escapeHtml(what)}</p><p>Freundliche Grüsse<br>${escapeHtml(site.name)}</p></div>`;
  return { subject: `${KIND_LABEL[kind]} bei ${site.name}`, text, html };
}

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20000) return fail(413, "too_large");

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "bad_request");
  }

  const kind = body.kind as FormKind;
  if (!KINDS.includes(kind)) return fail(400, "bad_request");

  // Spam-Schutz: verstecktes Feld und Mindest-Ausfüllzeit
  if (typeof body.website === "string" && body.website.trim() !== "") return fail(400, "rejected");
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return fail(400, "too_fast");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  const values = pick(kind, body);
  const errors = validate(kind, values);
  if (Object.keys(errors).length > 0) return fail(422, "invalid", { errors });

  if (!mailProvider()) {
    console.error("[anfrage] Mailversand nicht konfiguriert: MAIL_TO, MAIL_FROM und RESEND_API_KEY oder SMTP_HOST setzen.");
    return fail(503, "not_configured");
  }

  try {
    const m = staffMail(kind, values);
    await sendMail({ to: recipient(), replyTo: values.email, ...m });
  } catch (err) {
    const e = err as MailError;
    console.error("[anfrage] Versand fehlgeschlagen:", e.message, e.detail ?? "");
    return fail(502, "send_failed");
  }

  // Optionale Eingangsbestätigung an den Gast – ein Fehler hier ändert nichts daran,
  // dass die Anfrage beim Restaurant angekommen ist.
  if (process.env.SEND_GUEST_COPY === "true") {
    try {
      await sendMail({ to: values.email, ...guestMail(kind, values) });
    } catch (err) {
      console.warn("[anfrage] Eingangsbestätigung an Gast fehlgeschlagen:", (err as Error).message);
    }
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
