/** Gemeinsame Einstellungen für das Startbild (Server und Browser) */

// Auf schmalen Hochformat-Bildschirmen kommt ein eigener Hochformat-Ausschnitt zum Einsatz,
// sonst müsste das Querformat-Bild sehr gross geladen werden, um scharf zu bleiben.
export const PORTRAIT_MEDIA = "(max-aspect-ratio: 4/5)";
export const LANDSCAPE_MEDIA = "(min-aspect-ratio: 4/5)";
export const HERO_SIZES = "(max-aspect-ratio: 1/1) 140vw, 100vw";
export const HERO_QUALITY = 80;
