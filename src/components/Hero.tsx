"use client";

import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { photos, type PhotoKey } from "@/content/images";
import { HERO_QUALITY, HERO_SIZES, PORTRAIT_MEDIA } from "@/lib/hero";

const SLIDE_MS = 8000; // Standzeit pro Bild
const FADE_MS = 1800; // Überblendung
const SLATS = 12; // Lamellen der Eröffnungsanimation

// Ausgangspunkt der langsamen Kamerafahrt je Bild (Richtung siehe globals.css, hero-drift-1…4)
const ORIGINS = ["40% 60%", "60% 45%", "50% 40%", "35% 55%"];



type Props = {
  slides: PhotoKey[];
  info: ReactNode;
  children: ReactNode;
};

/**
 * Startseiten-Bild über die ganze Fläche mit Text im Bild.
 * - Eröffnung: Lamellen öffnen sich von der Mitte her (nur beim ersten Aufruf pro Sitzung,
 *   gesteuert über die Klasse «intro» auf <html>, siehe HeroIntroScript)
 * - danach ruhiger Bildwechsel mit Punkten und Pause-Schalter
 * - bei «weniger Bewegung» kein automatischer Wechsel und keine Animation
 */
export default function Hero({ slides, info, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [slatsDone, setSlatsDone] = useState(false);

  const many = slides.length > 1;

  const go = useCallback((next: number) => {
    const cur = activeRef.current;
    if (cur === next) return;
    activeRef.current = next;
    setLeaving(cur);
    setActive(next);
  }, []);

  // Eröffnung aufräumen, damit sie beim Zurückkehren auf die Startseite nicht erneut läuft
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) {
      setSlatsDone(true);
      return;
    }
    const t = window.setTimeout(() => {
      root.classList.remove("intro");
      setSlatsDone(true);
    }, 3200);
    return () => window.clearTimeout(t);
  }, []);

  // Weitere Bilder erst nach dem Laden der Seite
  useEffect(() => {
    if (!many) return;
    let t = 0;
    const start = () => {
      t = window.setTimeout(() => setStarted(true), 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(t);
    };
  }, [many]);

  // «Weniger Bewegung», Sichtbarkeit von Bild und Tab
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    const onVis = () => setPageVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);

    let io: IntersectionObserver | undefined;
    if (ref.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.2), {
        threshold: [0, 0.2, 0.5],
      });
      io.observe(ref.current);
    }
    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  const running = many && started && !paused && !reduced && inView && pageVisible;

  // Automatischer Wechsel
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go((activeRef.current + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [running, active, go, slides.length]);

  // Ausgeblendetes Bild nach der Überblendung zur Ruhe bringen
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), FADE_MS + 100);
    return () => window.clearTimeout(t);
  }, [leaving]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        {slides.map((key, i) => {
          if (i > 0 && !started) return null;
          const p = photos[key];
          const state = i === active ? "active" : i === leaving ? "leaving" : "idle";
          const style = {
            "--origin": ORIGINS[i % ORIGINS.length],
            "--focus": p.focus,
            "--focus-narrow": p.focusNarrow ?? p.focus,
          } as CSSProperties;
          return (
            <div
              key={key}
              className="hero__slide"
              data-state={state}
              data-portrait={"portrait" in p && p.portrait ? "true" : undefined}
              style={style}
              aria-hidden={i !== active}
            >
              <SlideImage photo={key} alt={i === active ? p.alt : ""} first={i === 0} />
            </div>
          );
        })}
      </div>

      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__slats" aria-hidden="true" data-done={slatsDone ? "true" : undefined}>
        {Array.from({ length: SLATS }, (_, i) => (
          <span key={i} style={{ "--i": Math.abs(i - (SLATS - 1) / 2) } as CSSProperties} />
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__content">{children}</div>

        <div className="hero__info hero-reveal" style={{ "--d": "520ms" } as CSSProperties}>
          <p className="hero__where">{info}</p>

          {many ? (
            <div className="hero__controls">
              <div className="hero__dots">
                {slides.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    className="hero__dot"
                    aria-label={`Bild ${i + 1} von ${slides.length}`}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => {
                      if (!started) setStarted(true);
                      go(i);
                    }}
                  >
                    <span>
                      <i key={`${active}-${running}`} data-running={i === active && running ? "true" : undefined} />
                    </span>
                  </button>
                ))}
              </div>
              {!reduced ? (
                <button type="button" className="hero__toggle" onClick={() => setPaused((v) => !v)}>
                  {paused ? "Diashow fortsetzen" : "Diashow anhalten"}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Bild mit eigenem Hochformat-Ausschnitt für Smartphones (falls vorhanden) */
function SlideImage({ photo, alt, first }: { photo: PhotoKey; alt: string; first: boolean }) {
  const p = photos[photo];
  const common = { fill: true, quality: HERO_QUALITY } as const;
  const { props: img } = getImageProps({ ...common, src: p.src, alt, sizes: HERO_SIZES, placeholder: "blur" });
  const portrait = "portrait" in p && p.portrait ? getImageProps({ ...common, src: p.portrait, alt, sizes: "100vw" }).props : null;
  return (
    <picture>
      {portrait ? <source media={PORTRAIT_MEDIA} srcSet={portrait.srcSet} sizes="100vw" /> : null}
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img {...img} alt={alt} fetchPriority={first ? "high" : undefined} loading={first ? "eager" : "lazy"} />
    </picture>
  );
}
