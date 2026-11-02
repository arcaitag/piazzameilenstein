"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schliessen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);
    if (!open) return;

    const menu = menuRef.current;
    const first = menu?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menu) return;
      const items = [toggleRef.current, ...Array.from(menu.querySelectorAll<HTMLElement>("a, button"))].filter(
        Boolean,
      ) as HTMLElement[];
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      root.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled || open ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Piazza Meilenstein – zur Startseite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/piazza-meilenstein.svg" alt="" width={156} height={82} />
          </Link>

          <nav className="main-nav" aria-label="Hauptnavigation">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link
              href="/speisekarte"
              className="btn btn--secondary btn--menu"
              aria-current={isActive(pathname, "/speisekarte") ? "page" : undefined}
            >
              Speisekarte
            </Link>
            <Link href="/reservation" className="btn btn--primary btn--reserve">
              Tisch reservieren
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span>{open ? "Schliessen" : "Menü"}</span>
              <span className="menu-toggle__bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu__inner">
          <nav aria-label="Hauptnavigation mobil">
            <ul className="mobile-menu__primary">
              {[{ href: "/speisekarte", label: "Speisekarte" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mobile-menu__secondary">
            <li>
              <Link href="/faq">Häufige Fragen</Link>
            </li>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
          </ul>
          <div className="mobile-menu__actions">
            <Link href="/reservation" className="btn btn--primary">
              Tisch reservieren
            </Link>
            <Link href="/anlaesse#anfrage" className="btn btn--secondary">
              Anlass anfragen
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
