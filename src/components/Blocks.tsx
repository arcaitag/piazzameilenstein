import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Icons";
import Figure from "./Figure";
import type { PhotoKey } from "@/content/images";

export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  image,
  layout = "plain",
  imageRatio,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: PhotoKey;
  layout?: "plain" | "split" | "wide";
  imageRatio?: string;
}) {
  const text = (
    <div className="page-intro__text">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="t-h1">{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </div>
  );

  if (layout === "split" && image) {
    return (
      <header className="page-intro page-intro--split container">
        <div className="page-intro__grid">
          {text}
          <Figure name={image} ratio={imageRatio ?? "4 / 5"} ratioNarrow="4 / 3" sizes="(max-width: 899px) 100vw, 42vw" priority />
        </div>
      </header>
    );
  }

  if (layout === "wide" && image) {
    return (
      <header className="page-intro page-intro--wide container">
        {text}
        <div className="page-intro__media">
          <Figure name={image} ratio={imageRatio ?? "21 / 9"} ratioNarrow="4 / 3" sizes="(max-width: 1400px) 100vw, 1320px" priority />
        </div>
      </header>
    );
  }

  return <header className="page-intro container">{text}</header>;
}

export function CtaBand({
  title = "Wir freuen uns auf Ihren Besuch.",
  text = "Reservieren Sie Ihren Tisch online – wir bestätigen Ihnen die Reservation persönlich.",
  secondary = { href: "/speisekarte", label: "Speisekarte ansehen" },
}: {
  title?: string;
  text?: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container" data-reveal="">
        <h2 id="cta-title" className="t-h2">
          {title}
        </h2>
        <p>{text}</p>
        <div className="btn-row">
          <Link href="/reservation" className="btn btn--primary">
            Tisch reservieren <Arrow />
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn btn--secondary">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link-arrow">
      {children} <Arrow />
    </Link>
  );
}

export function Pending({ children = "Angabe folgt in Kürze" }: { children?: ReactNode }) {
  return <span className="pending">{children}</span>;
}
