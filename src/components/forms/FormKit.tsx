"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { FIELDS, validate, type Errors, type FormKind, type Values } from "@/lib/forms";

type Status = "idle" | "sending" | "success" | "error";

export function useAnfrage(kind: FormKind, initial: Values) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function focusFirstError(errs: Errors) {
    const first = FIELDS[kind].find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  }

  function update(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) {
      const check = validate(kind, next);
      setErrors((e) => {
        const copy = { ...e };
        if (check[name]) copy[name] = check[name];
        else delete copy[name];
        return copy;
      });
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const t = e.target;
    const value = t instanceof HTMLInputElement && t.type === "checkbox" ? (t.checked ? "yes" : "") : t.value;
    update(t.name, value);
  }

  function onBlur(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    if (!value) return;
    const check = validate(kind, values);
    setErrors((prev) => {
      const copy = { ...prev };
      if (check[name]) copy[name] = check[name];
      else delete copy[name];
      return copy;
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(kind, values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setShowSummary(true);
      setStatus("idle");
      focusFirstError(errs);
      return;
    }
    setShowSummary(false);
    setStatus("sending");
    setErrorCode(null);
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; code?: string; errors?: Errors } | null;
      if (res.ok && json?.ok === true) {
        setStatus("success");
        return;
      }
      if (res.status === 422 && json?.errors) {
        setErrors(json.errors);
        setShowSummary(true);
        setStatus("idle");
        focusFirstError(json.errors);
        return;
      }
      setErrorCode(json?.code ?? `http_${res.status}`);
      setStatus("error");
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  }

  return { values, errors, status, errorCode, showSummary, onChange, onBlur, onSubmit, formRef, honeypot, setHoneypot };
}

export type FieldApi = Pick<ReturnType<typeof useAnfrage>, "values" | "errors" | "onChange" | "onBlur">;

type InputProps = {
  api: FieldApi;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
  min?: string | number;
  max?: string | number;
  step?: string | number;
  hint?: ReactNode;
  className?: string;
  placeholder?: string;
};

function describedBy(name: string, hint: boolean, error: boolean) {
  const ids = [hint ? `${name}-hint` : "", error ? `${name}-error` : ""].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function Field({ api, name, label, required, type = "text", hint, className, ...rest }: InputProps) {
  const error = api.errors[name];
  return (
    <div className={`field${className ? ` ${className}` : ""}`}>
      <label htmlFor={name}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={api.values[name] ?? ""}
        onChange={api.onChange}
        onBlur={api.onBlur}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, Boolean(hint), Boolean(error))}
        {...rest}
      />
      {hint ? (
        <span id={`${name}-hint`} className="field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${name}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function TextArea({
  api,
  name,
  label,
  required,
  hint,
  className,
  rows = 5,
  placeholder,
}: Omit<InputProps, "type"> & { rows?: number }) {
  const error = api.errors[name];
  return (
    <div className={`field${className ? ` ${className}` : ""}`}>
      <label htmlFor={name}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={api.values[name] ?? ""}
        onChange={api.onChange}
        onBlur={api.onBlur}
        required={required}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, Boolean(hint), Boolean(error))}
      />
      {hint ? (
        <span id={`${name}-hint`} className="field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${name}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Select({
  api,
  name,
  label,
  required,
  options,
  placeholder = "Bitte wählen",
  className,
}: Omit<InputProps, "type"> & { options: readonly string[] | readonly { value: string; label: string }[] }) {
  const error = api.errors[name];
  return (
    <div className={`field${className ? ` ${className}` : ""}`}>
      <label htmlFor={name}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <select
        id={name}
        name={name}
        value={api.values[name] ?? ""}
        onChange={api.onChange}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      {error ? (
        <span id={`${name}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Choices({
  api,
  name,
  legend,
  options,
  required,
  className,
}: {
  api: FieldApi;
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  className?: string;
}) {
  const error = api.errors[name];
  return (
    <fieldset
      className={`field${className ? ` ${className}` : ""}`}
      aria-describedby={error ? `${name}-error` : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="field__label">
        {legend}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div className="choices">
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={api.values[name] === o.value}
              onChange={api.onChange}
              required={required}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <span id={`${name}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

export function Consent({ api }: { api: FieldApi }) {
  const error = api.errors.consent;
  return (
    <div className="consent">
      <input
        id="consent"
        name="consent"
        type="checkbox"
        checked={api.values.consent === "yes"}
        onChange={api.onChange}
        required
        aria-required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "consent-error" : undefined}
      />
      <label htmlFor="consent">
        Ich habe die{" "}
        <Link href="/datenschutz" className="text-link" target="_blank">
          Datenschutzerklärung
        </Link>{" "}
        gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden.
        <span className="req" aria-hidden="true">
          *
        </span>
      </label>
      {error ? (
        <span id="consent-error" className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor="website-field">Bitte leer lassen</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function ErrorSummary({ show, errors }: { show: boolean; errors: Errors }) {
  const count = Object.keys(errors).length;
  if (!show || count === 0) return null;
  return (
    <p className="form-summary" role="alert">
      {count === 1
        ? "Bitte prüfen Sie das markierte Feld."
        : `Bitte prüfen Sie die ${count} markierten Felder.`}
    </p>
  );
}

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es in einigen Minuten noch einmal.",
  too_fast: "Das ging sehr schnell. Bitte prüfen Sie Ihre Angaben und senden Sie das Formular noch einmal.",
  network: "Es besteht offenbar keine Verbindung zum Internet. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es noch einmal.",
};

export function SubmitError({ code, fallback }: { code: string | null; fallback: ReactNode }) {
  if (!code) return null;
  const text = ERROR_TEXT[code];
  return (
    <div className="form-status form-status--error" role="alert">
      <h3>Ihre Anfrage wurde nicht gesendet.</h3>
      <p>{text ?? "Beim Übermitteln ist ein Fehler aufgetreten – Ihre Angaben sind nicht bei uns angekommen. Bitte versuchen Sie es später noch einmal."}</p>
      {!text ? <p>{fallback}</p> : null}
      <p className="small muted">Ihre Eingaben bleiben im Formular erhalten.</p>
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div className="form-status form-status--success" role="status" aria-live="polite">
      <h3 ref={ref} tabIndex={-1}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button type="submit" className="btn btn--primary" disabled={sending} aria-disabled={sending}>
      {sending ? (
        <>
          <span className="spinner" aria-hidden="true" /> Wird gesendet …
        </>
      ) : (
        children
      )}
    </button>
  );
}
