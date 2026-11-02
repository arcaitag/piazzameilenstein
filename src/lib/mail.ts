import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Mailversand für die Formulare. Läuft ausschliesslich auf dem Server.
 * Zugangsdaten kommen nur aus Umgebungsvariablen (Vercel → Settings → Environment Variables).
 *
 *   MAIL_TO          Empfänger der Anfragen
 *   MAIL_FROM        Absender (bei Resend: verifizierte Domain)
 *   RESEND_API_KEY   Variante A: Versand über Resend
 *   SMTP_HOST/PORT/USER/PASS/SECURE   Variante B: Versand über SMTP
 */

export type OutgoingMail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type Provider = "resend" | "smtp";

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

export function mailProvider(): Provider | null {
  if (!env("MAIL_TO") || !env("MAIL_FROM")) return null;
  if (env("RESEND_API_KEY")) return "resend";
  if (env("SMTP_HOST")) return "smtp";
  return null;
}

export function recipient(): string {
  return env("MAIL_TO");
}

export class MailError extends Error {
  constructor(message: string, public detail?: string) {
    super(message);
  }
}

async function sendViaResend(mail: OutgoingMail) {
  const base = env("RESEND_API_URL") || "https://api.resend.com";
  const res = await fetch(`${base}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env("MAIL_FROM"),
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new MailError(`Resend antwortete mit ${res.status}`, body.slice(0, 500));
  }
  const json = (await res.json().catch(() => null)) as { id?: string } | null;
  if (!json?.id) throw new MailError("Resend lieferte keine Nachrichten-ID");
}

let transporter: Transporter | null = null;

async function sendViaSmtp(mail: OutgoingMail) {
  if (!transporter) {
    const port = Number(env("SMTP_PORT") || 587);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: env("SMTP_SECURE") === "true" || port === 465,
      auth: env("SMTP_USER") ? { user: env("SMTP_USER"), pass: env("SMTP_PASS") } : undefined,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  const info = await transporter.sendMail({
    from: env("MAIL_FROM"),
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: mail.replyTo,
  });
  if (!info.accepted || info.accepted.length === 0) {
    throw new MailError("SMTP-Server hat die Nachricht nicht angenommen", JSON.stringify(info.rejected ?? []));
  }
}

export async function sendMail(mail: OutgoingMail): Promise<void> {
  const provider = mailProvider();
  if (!provider) throw new MailError("Mailversand ist nicht konfiguriert");
  if (provider === "resend") return sendViaResend(mail);
  return sendViaSmtp(mail);
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
