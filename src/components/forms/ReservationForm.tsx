"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AREA_OPTIONS, MAX_PERSONS, formatDateCH, todayZurich } from "@/lib/forms";
import ContactFallback from "./ContactFallback";
import {
  Choices,
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

export default function ReservationForm() {
  const form = useAnfrage("reservation", {
    date: "",
    time: "",
    persons: "2",
    area: "egal",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: "",
  });
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  useEffect(() => setMinDate(todayZurich()), []);

  if (form.status === "success") {
    const v = form.values;
    return (
      <SuccessPanel title="Vielen Dank – Ihre Anfrage ist bei uns angekommen.">
        <p>
          Sie haben einen Tisch für <strong>{v.persons} {v.persons === "1" ? "Person" : "Personen"}</strong> am{" "}
          <strong>{formatDateCH(v.date)}</strong> um <strong>{v.time} Uhr</strong> angefragt.
        </p>
        <p>
          <strong>Bitte beachten Sie:</strong> Das ist noch keine Bestätigung. Wir prüfen die Verfügbarkeit und melden uns
          per E-Mail oder Telefon bei Ihnen. Erst mit unserer Bestätigung ist der Tisch für Sie reserviert.
        </p>
        <p>
          <Link href="/speisekarte" className="text-link">
            In der Zwischenzeit: Speisekarte ansehen
          </Link>
        </p>
      </SuccessPanel>
    );
  }

  const api = { values: form.values, errors: form.errors, onChange: form.onChange, onBlur: form.onBlur };

  return (
    <form ref={form.formRef} className="form" noValidate onSubmit={form.onSubmit} aria-describedby="reservation-hint">
      <ErrorSummary show={form.showSummary} errors={form.errors} />

      <fieldset className="form-section">
        <legend>Wann und wie viele?</legend>
        <div className="form-grid form-grid--3">
          <Field api={api} name="date" label="Datum" type="date" required min={minDate} autoComplete="off" />
          <Field api={api} name="time" label="Uhrzeit" type="time" required step={900} hint="z. B. 19:30" />
          <Field
            api={api}
            name="persons"
            label="Personen"
            type="number"
            required
            min={1}
            max={MAX_PERSONS}
            inputMode="numeric"
          />
        </div>
        <Choices api={api} name="area" legend="Wo möchten Sie sitzen?" options={AREA_OPTIONS} />
      </fieldset>

      <fieldset className="form-section">
        <legend>Ihre Angaben</legend>
        <div className="form-grid">
          <Field api={api} name="firstName" label="Vorname" required autoComplete="given-name" />
          <Field api={api} name="lastName" label="Nachname" required autoComplete="family-name" />
          <Field api={api} name="email" label="E-Mail" type="email" required autoComplete="email" inputMode="email" />
          <Field
            api={api}
            name="phone"
            label="Telefon"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            hint="Für Rückfragen zu Ihrer Reservation"
          />
          <TextArea
            api={api}
            name="message"
            label="Bemerkungen"
            className="field--full"
            rows={4}
            hint="Zum Beispiel Allergien, ein besonderer Anlass oder ein Kinderwagen"
          />
        </div>
      </fieldset>

      <p id="reservation-hint" className="form-note">
        <strong>Gut zu wissen:</strong> Ihre Anfrage ist noch keine verbindliche Reservation. Wir prüfen die Verfügbarkeit
        und bestätigen Ihnen den Tisch per E-Mail oder Telefon.
      </p>

      <Consent api={api} />
      <Honeypot value={form.honeypot} onChange={form.setHoneypot} />

      <SubmitError code={form.status === "error" ? form.errorCode : null} fallback={<ContactFallback />} />

      <div className="form-actions">
        <SubmitButton sending={form.status === "sending"}>Reservationsanfrage senden</SubmitButton>
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
