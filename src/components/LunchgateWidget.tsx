"use client";

import { useEffect, useRef, useState } from "react";
import { reservation } from "@/content/site";

type Status = "loading" | "ready" | "failed";

/**
 * Reservationssystem von Lunchgate (foratable), direkt in die Seite eingebunden.
 * Das Skript von Lunchgate sucht nach dem Platzhalter mit «data-lunchgate-inline-url»
 * und setzt dort das Buchungsfenster ein. Damit das auch nach einem Seitenwechsel
 * innerhalb der Website klappt, wird der Platzhalter hier selbst angelegt und das
 * Skript bei jedem Aufruf neu eingebunden. Lädt es nicht, erscheint ein direkter Link.
 */
export default function LunchgateWidget() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const box = host.current;
    if (!box) return;

    const slot = document.createElement("div");
    slot.setAttribute("data-lunchgate-inline-url", reservation.embedUrl);
    box.appendChild(slot);

    document.querySelectorAll("script[data-lunchgate-loader]").forEach((s) => s.remove());
    const script = document.createElement("script");
    script.src = reservation.scriptSrc;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-lunchgate-loader", "");
    script.onerror = () => setStatus("failed");
    document.body.appendChild(script);

    const poll = window.setInterval(() => {
      if (box.querySelector("iframe")) {
        setStatus("ready");
        window.clearInterval(poll);
      }
    }, 250);
    const giveUp = window.setTimeout(() => {
      window.clearInterval(poll);
      if (!box.querySelector("iframe")) setStatus("failed");
    }, 10000);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(giveUp);
      slot.remove();
    };
  }, []);

  return (
    <div className="booking" data-status={status}>
      <div ref={host} className="booking__frame" />

      {status === "loading" ? (
        <p className="booking__note" role="status">
          Das Reservationssystem wird geladen …
        </p>
      ) : null}

      {status === "failed" ? (
        <p className="booking__note" role="status">
          Das Reservationssystem konnte hier nicht angezeigt werden.{" "}
          <a className="text-link" href={reservation.url} target="_blank" rel="noopener">
            Reservation bei {reservation.provider} öffnen
            <span className="visually-hidden"> (neues Fenster)</span>
          </a>
        </p>
      ) : null}

      <noscript>
        <p className="booking__note">
          <a className="text-link" href={reservation.url}>
            Reservation bei {reservation.provider} öffnen
          </a>
        </p>
      </noscript>
    </div>
  );
}
