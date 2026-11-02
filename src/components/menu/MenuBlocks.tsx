import type { Block, Dish, MenuSection, Wine } from "@/content/menu";
import MenuText, { typo } from "./MenuText";

function Price({ value }: { value: string }) {
  return (
    <span className="price">
      <span className="visually-hidden">CHF </span>
      {value}
    </span>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  const listStyle = dish.variantStyle === "list";
  return (
    <li className="dish">
      <p className="dish__name">
        <MenuText text={dish.name} />
        {dish.tag ? <span className="dish__tag">{dish.tag}</span> : null}
      </p>
      {dish.variants && !listStyle ? (
        <ul className="dish__variants">
          {dish.variants.map((v) => (
            <li key={v.label}>
              <span className="label">{v.label}</span>
              <Price value={v.price} />
            </li>
          ))}
        </ul>
      ) : dish.price ? (
        <Price value={dish.price} />
      ) : (
        <span />
      )}
      {dish.desc ? (
        <p className="dish__desc">
          <MenuText text={dish.desc} />
        </p>
      ) : null}
      {dish.variants && listStyle ? (
        <ul className="dish__variants dish__variants--list">
          {dish.variants.map((v) => (
            <li key={v.label}>
              <span className="label">
                <MenuText text={v.label} />
              </span>
              <Price value={v.price} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function regionLabel(w: Wine) {
  return [w.country, w.region].filter(Boolean).join(" · ");
}

function WineList({ block }: { block: Extract<Block, { type: "wines" }> }) {
  const rows: { region: string; wines: Wine[] }[] = [];
  for (const w of block.items) {
    const label = regionLabel(w);
    const last = rows[rows.length - 1];
    if (last && last.region === label) last.wines.push(w);
    else rows.push({ region: label, wines: [w] });
  }
  const headingId = `wein-${block.title.toLowerCase().replace(/[^a-zäöü]+/g, "-")}`;
  return (
    <div className="menu-wines">
      <div className="menu-wines__head">
        <div>
          <span className="eyebrow">{block.kicker}</span>
          <h3 id={headingId}>{block.title}</h3>
        </div>
        <div className="wine-cols" aria-hidden="true">
          {block.columns.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
      <ul className="wine-list" aria-labelledby={headingId}>
        {rows.map((group) => (
          <li key={group.region + group.wines[0].name}>
            <p className="wine-region">{group.region}</p>
            <ul className="wine-list">
              {group.wines.map((w) => (
                <li key={w.name + (w.detail ?? "")} className="wine">
                  <span>
                    <span className="wine__name">
                      {typo(w.name)}
                      {w.bio ? (
                        <span className="bio" title="Biologischer Anbau">
                          Bio
                        </span>
                      ) : null}
                    </span>
                    {w.detail ? <span className="wine__detail">{typo(w.detail)}</span> : null}
                  </span>
                  <span className="wine__prices">
                    {w.prices.map((p, i) =>
                      p ? (
                        <span key={i} className="price">
                          <span className="visually-hidden">
                            {block.columns[i]}: CHF{" "}
                          </span>
                          {p}
                        </span>
                      ) : (
                        <span key={i} className="na">
                          <span aria-hidden="true">–</span>
                          <span className="visually-hidden">{block.columns[i]}: nicht erhältlich</span>
                        </span>
                      ),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "group":
      return (
        <div className="menu-group">
          {block.title ? (
            <h3 className="menu-group__title">
              <MenuText text={block.title} />
            </h3>
          ) : null}
          {block.note ? <p className="menu-group__note">{block.note}</p> : null}
          <ul className="dishes">
            {block.items.map((d) => (
              <DishRow key={d.name} dish={d} />
            ))}
          </ul>
        </div>
      );
    case "box":
      return (
        <aside className="menu-box">
          <p className="menu-box__title">{block.title}</p>
          <ul className="menu-box__rows">
            {block.rows.map((r, i) => (
              <li key={i}>
                <span>
                  {r.name ? <span className="name">{r.name}</span> : null}
                  {r.name && r.text ? (
                    <>
                      {"\u00A0"}
                      <span className="sep" aria-hidden="true">
                        ·
                      </span>{" "}
                    </>
                  ) : null}
                  {r.text ? <MenuText text={r.text} /> : null}
                </span>
                {r.price ? <Price value={r.price} /> : null}
              </li>
            ))}
          </ul>
        </aside>
      );
    case "intro":
      return (
        <div className="menu-intro">
          <p className="lead">{typo(block.lead)}</p>
          <div className="menu-intro__cols">
            {block.paragraphs.map((p, i) => (
              <p key={i}>{typo(p)}</p>
            ))}
          </div>
        </div>
      );
    case "text":
      return (
        <div className="menu-text">
          <h3>{block.title}</h3>
          <p>{typo(block.text)}</p>
        </div>
      );
    case "table":
      return (
        <div className="menu-group">
          <h3 className="menu-group__title">{block.title}</h3>
          <ul className="menu-steaks">
            {block.rows.map((r) => (
              <li key={r.name}>
                <div>
                  <p className="dish__name">{r.name}</p>
                  <p className="dish__desc">{r.desc}</p>
                </div>
                <ul className="weights" aria-label={`Gewichte und Preise ${r.name}`}>
                  {block.columns.map((c, i) => (
                    <li key={c}>
                      <span className="w">{c}</span>
                      {r.prices[i] ? (
                        <Price value={r.prices[i]!} />
                      ) : (
                        <span className="price na">
                          <span aria-hidden="true">–</span>
                          <span className="visually-hidden">nicht erhältlich</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    case "wines":
      return <WineList block={block} />;
  }
}

export function MenuSectionView({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="menu-section" aria-labelledby={`${section.id}-title`}>
      <header className="menu-section__head">
        <span className="eyebrow">{section.kicker}</span>
        <h2 id={`${section.id}-title`} className="t-h2">
          {section.title}
        </h2>
        {section.subtitle ? <p className="menu-section__sub">{section.subtitle}</p> : null}
      </header>
      {section.blocks.map((b, i) => (
        <MenuBlock key={i} block={b} />
      ))}
    </section>
  );
}
