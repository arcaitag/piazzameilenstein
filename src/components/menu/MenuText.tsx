import { Fragment } from "react";
import { menu } from "@/content/menu";

const TOKEN = /(\[[^\]]+\]| · )/g;

/** Typografischer Apostroph statt Schreibmaschinen-Apostroph */
export function typo(s: string): string {
  return s.replace(/'/g, "’");
}

/**
 * Wandelt Herkunftskürzel wie [CH] in hochgestellte Abkürzungen um und
 * setzt Trennpunkte typografisch – Inhalte bleiben unverändert.
 */
export default function MenuText({ text }: { text: string }) {
  const parts = typo(text).split(TOKEN).filter((p) => p !== "");
  return (
    <>
      {parts.map((part, i) => {
        if (part === " · ") {
          // geschütztes Leerzeichen vor dem Punkt, normales danach: Zeilenumbruch nur nach dem Punkt
          return (
            <Fragment key={i}>
              {"\u00A0"}
              <span className="sep" aria-hidden="true">
                ·
              </span>
              <span className="visually-hidden">,</span>{" "}
            </Fragment>
          );
        }
        const m = part.match(/^\[([^\]]+)\]$/);
        if (m) {
          const code = m[1];
          const title = menu.originCodes[code] ?? code;
          return (
            <sup key={i}>
              <abbr title={`Herkunft: ${title}`}>{code}</abbr>
            </sup>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
