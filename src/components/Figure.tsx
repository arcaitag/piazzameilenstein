import Image from "next/image";
import type { CSSProperties } from "react";
import { photos, type PhotoKey } from "@/content/images";

type Props = {
  name: PhotoKey;
  sizes: string;
  ratio?: string;
  ratioNarrow?: string;
  focus?: string;
  className?: string;
  caption?: string;
  priority?: boolean;
  reveal?: boolean;
  delay?: number;
  decorative?: boolean;
};

export default function Figure({
  name,
  sizes,
  ratio = "4 / 3",
  ratioNarrow,
  focus,
  className,
  caption,
  priority,
  reveal = true,
  delay,
  decorative,
}: Props) {
  const p = photos[name];
  const style = {
    "--ratio": ratio,
    ...(ratioNarrow ? { "--ratio-narrow": ratioNarrow } : {}),
    "--focus": focus ?? p.focus,
    "--focus-narrow": p.focusNarrow ?? focus ?? p.focus,
  } as CSSProperties;

  return (
    <figure
      className={`figure${className ? ` ${className}` : ""}`}
      data-reveal={reveal && !priority ? "media" : undefined}
      style={delay ? ({ "--delay": `${delay}s` } as CSSProperties) : undefined}
    >
      <div className="figure__frame" style={style}>
        <Image
          src={p.src}
          alt={decorative ? "" : p.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className="figure__img"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
