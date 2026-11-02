"use client";

import ContactFallback from "./ContactFallback";
import {
  Consent,
  ErrorSummary,
  Field,
  Honeypot,
  SubmitButton,
  SubmitError,
  SuccessPanel,
  TextArea,
  useAnfrage,
} from "./FormKit";

export default function ContactForm() {
  const form = useAnfrage("kontakt", { name: "", email: "", phone: "", subject: "", message: "", consent: "" });

  if (form.status === "success") {
    return (
      <SuccessPanel title="Vielen Dank für Ihre Nachricht.">
        <p>Ihre Nachricht ist bei uns angekommen. Wir melden uns so bald wie möglich bei Ihnen.</p>
      </SuccessPanel>
    );
  }

  const api = { values: form.values, errors: form.errors, onChange: form.onChange, onBlur: form.onBlur };

  return (
    <form ref={form.formRef} className="form" noValidate onSubmit={form.onSubmit}>
      <ErrorSummary show={form.showSummary} errors={form.errors} />
      <div className="form-grid">
        <Field api={api} name="name" label="Name" required autoComplete="name" />
        <Field api={api} name="email" label="E-Mail" type="email" required autoComplete="email" inputMode="email" />
        <Field api={api} name="phone" label="Telefon" type="tel" autoComplete="tel" inputMode="tel" hint="Optional" />
        <Field api={api} name="subject" label="Betreff" hint="Optional" />
        <TextArea api={api} name="message" label="Nachricht" required className="field--full" rows={6} />
      </div>
      <p className="form-note">
        Für Tischreservationen nutzen Sie bitte das{" "}
        <a className="text-link" href="/reservation">
          Reservationsformular
        </a>
        , für Feiern und Firmenanlässe die{" "}
        <a className="text-link" href="/anlaesse#anfrage">
          Anlass-Anfrage
        </a>
        .
      </p>
      <Consent api={api} />
      <Honeypot value={form.honeypot} onChange={form.setHoneypot} />
      <SubmitError code={form.status === "error" ? form.errorCode : null} fallback={<ContactFallback />} />
      <div className="form-actions">
        <SubmitButton sending={form.status === "sending"}>Nachricht senden</SubmitButton>
        <span className="small muted">
          <span className="req" aria-hidden="true">
            *
          </span>{" "}
          Pflichtfeld
        </span>
      </div>
    </form>
  );
}
