"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "../Icons";

type Item = { id: string; label: string };

export default function MenuNav({ items, pdf }: { items: Item[]; pdf: { href: string; label: string; size: string } }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = items.find((i) => visible.get(i.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Aktiven Eintrag in der horizontalen Leiste (Smartphone) sichtbar halten
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;
    const target = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <nav className="menu-nav" aria-label="Kategorien der Speisekarte">
      <ol ref={listRef}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined} onClick={() => setActive(item.id)}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <div className="menu-nav__pdf">
        <a className="link-arrow" href={pdf.href} download>
          PDF laden <Download />
        </a>
      </div>
    </nav>
  );
}
