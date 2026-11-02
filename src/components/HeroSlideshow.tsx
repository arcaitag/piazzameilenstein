import Image from "next/image";
import type { CSSProperties } from "react";
import { photos, type PhotoKey } from "@/content/images";
import HeroMoreSlides from "./HeroMoreSlides";

export const HERO_SIZES = "(max-width: 639px) 170vw, (max-width: 899px) 110vw, 60vw";

/**
 * Ruhiger Bildwechsel: Das erste Bild wird sofort geladen (schnelle Darstellung),
 * die weiteren erst, wenn die Seite steht. Die Überblendung selbst ist reines CSS
 * und entfällt bei «weniger Bewegung».
 */
export default function HeroSlideshow({ slides }: { slides: PhotoKey[] }) {
  const [first, ...rest] = slides;
  const p = photos[first];
  return (
    <div className="hero__media">
      <div className="hero__slide" style={{ "--focus": p.focus, "--focus-narrow": p.focusNarrow ?? p.focus } as CSSProperties}>
        <Image src={p.src} alt={p.alt} fill priority fetchPriority="high" placeholder="blur" sizes={HERO_SIZES} />
      </div>
      {rest.length > 0 ? <HeroMoreSlides slides={rest} /> : null}
    </div>
  );
}
