import type { StaticImageData } from "next/image";
import innenraumWeinklima from "@/assets/photos/innenraum-weinklima.jpg";
import innenraumFerrari from "@/assets/photos/innenraum-ferrari.jpg";
import terrasse from "@/assets/photos/terrasse.jpg";
import terrasseSchirme from "@/assets/photos/terrasse-schirme.jpg";
import pizza from "@/assets/photos/pizza-meeresfruechte.jpg";
import steak from "@/assets/photos/steak-bearnaise.jpg";
import serviceCaprese from "@/assets/photos/service-caprese.jpg";
import capreseOel from "@/assets/photos/caprese-olivenoel.jpg";
import lamm from "@/assets/photos/lammkoteletts.jpg";
import tisch from "@/assets/photos/tisch-gedeckt.jpg";
import bar from "@/assets/photos/bar-cocktails.jpg";
// Hochformat-Ausschnitte für das Startbild auf dem Smartphone
import innenraumWeinklimaHoch from "@/assets/photos/hoch/innenraum-weinklima-hoch.jpg";
import innenraumFerrariHoch from "@/assets/photos/hoch/innenraum-ferrari-hoch.jpg";
import terrasseHoch from "@/assets/photos/hoch/terrasse-hoch.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** Bildausschnitt für object-position (Fokuspunkt) */
  focus: string;
  /** Fokuspunkt für schmale Hochformat-Ausschnitte (Smartphone) */
  focusNarrow?: string;
  /** eigener Hochformat-Ausschnitt (2:3) für das Startbild auf schmalen Bildschirmen */
  portrait?: StaticImageData;
};

export const photos = {
  innenraum: {
    src: innenraumWeinklima,
    portrait: innenraumWeinklimaHoch,
    alt: "Gedeckte Tische mit roten Servietten und Kerzen vor beleuchteten Weinklimaschränken, darüber hängendes Grün und geflochtene Leuchten",
    focus: "50% 50%",
    focusNarrow: "40% 55%",
  },
  ferrari: {
    src: innenraumFerrari,
    portrait: innenraumFerrariHoch,
    alt: "Der grosse Gastraum mit Bambusstämmen und begrünter Decke, vorne ein roter Ferrari F40 auf rotem Teppich",
    focus: "50% 55%",
    focusNarrow: "36% 58%",
  },
  terrasse: {
    src: terrasse,
    portrait: terrasseHoch,
    alt: "Terrasse mit gedeckten Tischen unter grossen hellen Sonnenschirmen, im Vordergrund die Zweige eines Olivenbaums",
    focus: "45% 60%",
    focusNarrow: "34% 62%",
  },
  terrasseSchirme: {
    src: terrasseSchirme,
    alt: "Gedeckte Tische mit roten Servietten auf der Terrasse unter Sonnenschirmen vor der Glasfassade",
    focus: "50% 62%",
    focusNarrow: "60% 70%",
  },
  pizza: {
    src: pizza,
    alt: "Pizza mit Meeresfrüchten von oben, daneben Besteck, Rotwein und ein Glas Wasser",
    focus: "64% 58%",
    focusNarrow: "64% 58%",
  },
  steak: {
    src: steak,
    alt: "Aufgeschnittenes Steak auf dunklem Teller, dazu Pommes frites, Sauce Béarnaise und ein Glas Rotwein",
    focus: "50% 64%",
    focusNarrow: "50% 64%",
  },
  serviceCaprese: {
    src: serviceCaprese,
    alt: "Ein Teller mit Mozzarella, Tomaten und frischen Kräutern wird an den Tisch gebracht",
    focus: "58% 70%",
    focusNarrow: "58% 72%",
  },
  capreseOel: {
    src: capreseOel,
    alt: "Mozzarella auf Tomatenscheiben mit Kräutern wird mit Olivenöl beträufelt",
    focus: "58% 52%",
    focusNarrow: "58% 52%",
  },
  lamm: {
    src: lamm,
    alt: "Lammkoteletts in der Küche, bereit für den Grill, dahinter Rosmarin, Salbei, Gemüse und Kartoffeln",
    focus: "52% 66%",
    focusNarrow: "52% 66%",
  },
  tisch: {
    src: tisch,
    alt: "Gedeckter Holztisch mit Weingläsern, roter Serviette und Pfeffermühlen im warmen Licht des Restaurants",
    focus: "45% 58%",
    focusNarrow: "44% 60%",
  },
  bar: {
    src: bar,
    alt: "Drei Drinks auf der Bar: ein Spritz, ein Drink mit frischer Minze und einer mit Physalis",
    focus: "36% 60%",
    focusNarrow: "38% 60%",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
