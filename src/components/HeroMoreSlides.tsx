"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { photos, type PhotoKey } from "@/content/images";

const HERO_SIZES = "(max-width: 639px) 170vw, (max-width: 899px) 110vw, 60vw";

/** Lädt die weiteren Hero-Bilder erst nach dem ersten Bild, damit die Seite schnell erscheint. */
export default function HeroMoreSlides({ slides }: { slides: PhotoKey[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const t = window.setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2000 });
      else start();
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      {slides.map((key) => {
        const p = photos[key];
        return (
          <div
            key={key}
            className="hero__slide"
            aria-hidden="true"
            style={{ "--focus": p.focus, "--focus-narrow": p.focusNarrow ?? p.focus } as CSSProperties}
          >
            <Image src={p.src} alt="" fill sizes={HERO_SIZES} placeholder="blur" />
          </div>
        );
      })}
    </>
  );
}
