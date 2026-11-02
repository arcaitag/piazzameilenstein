import data from "./menu.json";

export type Variant = { label: string; price: string };
export type Dish = {
  name: string;
  desc?: string;
  price?: string;
  tag?: string;
  variants?: Variant[];
  variantStyle?: "stack" | "list";
};
export type Wine = {
  country: string | null;
  region: string | null;
  name: string;
  detail?: string;
  bio?: boolean;
  prices: string[];
};
export type BoxRow = { name?: string; text?: string; price?: string };

export type Block =
  | { type: "group"; title: string | null; note?: string; items: Dish[] }
  | { type: "box"; title: string; rows: BoxRow[] }
  | { type: "intro"; lead: string; paragraphs: string[] }
  | { type: "text"; title: string; text: string }
  | { type: "table"; title: string; columns: string[]; rows: { name: string; desc: string; prices: (string | null)[] }[] }
  | { type: "wines"; title: string; kicker: string; columns: string[]; items: Wine[] };

export type MenuSection = {
  id: string;
  nav: string;
  kicker: string;
  title: string;
  subtitle?: string;
  blocks: Block[];
};

export type Menu = {
  sections: MenuSection[];
  allergens: { de: string; it: string }[];
  origin: { label: string; value: string }[];
  ldv: string;
  allergyNote: string;
  priceNote: string;
  originCodes: Record<string, string>;
};

export const menu = data as unknown as Menu;

/** Anzahl Pizzen in allen drei Familien – für Texte, damit Zahlen nie veralten */
export const pizzaCount = menu.sections
  .find((s) => s.id === "pizze")!
  .blocks.reduce((n, b) => (b.type === "group" ? n + b.items.length : n), 0);
