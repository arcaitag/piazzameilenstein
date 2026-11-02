"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EVENT_TYPES, MAX_GUESTS, OCCASIONS, todayZurich } from "@/lib/forms";
import ContactFallback from "./ContactFallback";
import {
  Choices,
  Consent,
  ErrorSummary,
  Field,
  Honeypot,
  Select,
  SubmitButton,
  SubmitError,
  SuccessPanel,
  TextArea,
  useAnfrage,
} from "./FormKit";

export default function EventForm() {
  const form = useAnfrage("anlass", {
    eventType: "",
    occasion: "",
    date: "",
    altDate: "",
    time: "",
    guests: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    consent: "",
  });
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  useEffect(() => setMinDate(todayZurich()), []);

  if (form.status === "success") {
    return (
      <SuccessPanel title="Vielen Dank für Ihre Anfrage.">
        <p>
          Ihre Anfrage ist bei uns angekommen. Wir melden uns persönlich bei Ihnen, um Ablauf, Essen und Getränke zu
          besprechen. Ihr Anlass ist damit noch nicht fest gebucht – das bestätigen wir Ihnen separat.
        </p>
        <p>
          <Link href="/speisekarte" className="text-link">
            Zur Speisekarte
          </Link>
        </p>
      </SuccessPanel>
    );
  }

  const api = { values: form.values, errors: form.errors, onChange: form.onChange, onBlur: form.onBlur };
  const business = form.values.eventType === "business";

  return (
    <form ref={form.formRef} className="form" noValidate onSubmit={form.onSubmit}>
      <ErrorSummary show={form.showSummary} errors={form.errors} />

      <fieldset className="form-section">
        <legend>Ihr Anlass</legend>
        <Choices api={api} name="eventType" legend="Art des Anlasses" options={EVENT_TYPES} required />
        <div className="form-grid">
          <Select api={api} name="occasion" label="Was planen Sie?" options={OCCASIONS} />
          <Field
            api={api}
            name="guests"
            label="Anzahl Gäste"
            type="number"
            required
            min={1}
            max={MAX_GUESTS}
            inputMode="numeric"
          />
          <Field api={api} name="date" label="Wunschdatum" type="date" required min={minDate} />
          <Field api={api} name="altDate" label="Ausweichdatum" type="date" min={minDate} hint="Optional" />
          <Field api={api} name="time" label="Beginn" type="time" step={900} hint="Optional, z. B. 18:30" />
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Ihre Angaben</legend>
        <div className="form-grid">
          <Field api={api} name="firstName" label="Vorname" required autoComplete="given-name" />
          <Field api={api} name="lastName" label="Nachname" required autoComplete="family-name" />
          <Field
            api={api}
            name="company"
            label={business ? "Firma" : "Firma (falls geschäftlich)"}
            autoComplete="organization"
            className="field--full"
          />
          <Field api={api} name="email" label="E-Mail" type="email" required autoComplete="email" inputMode="email" />
          <Field api={api} name="phone" label="Telefon" type="tel" required autoComplete="tel" inputMode="tel" />
          <TextArea
            api={api}
            name="message"
            label="Ihre Wünsche"
            className="field--full"
            rows={6}
            hint="Erzählen Sie uns, was Sie vorhaben: Apéro, Essen, Getränke, Ablauf, Allergien oder besondere Wünsche."
          />
        </div>
      </fieldset>

      <Consent api={api} />
      <Honeypot value={form.honeypot} onChange={form.setHoneypot} />

      <SubmitError code={form.status === "error" ? form.errorCode : null} fallback={<ContactFallback />} />

      <div className="form-actions">
        <SubmitButton sending={form.status === "sending"}>Anfrage senden</SubmitButton>
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
