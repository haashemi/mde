export interface PreviewFont {
  id: string;
  name: string;
  category: "monospace" | "sans-serif" | "serif";
  /**
   * Where the font comes from:
   * - Google Fonts axes, e.g. `ital,wght@0,400..700`
   * - `"self-hosted"` for fonts declared with `@font-face` in `app/index.css`
   * - nothing for the app's own font stack
   */
  source?: string;
}

const VARIABLE_AXES = "ital,wght@0,400..700;1,400..700";

const defaultFont: PreviewFont = { id: "default", name: "Default", category: "sans-serif" };

// The Google Fonts most often used for blog posts and long-form reading, plus Geist.
export const previewFonts: PreviewFont[] = [
  defaultFont,
  { id: "inter", name: "Inter", category: "sans-serif", source: VARIABLE_AXES },
  { id: "roboto", name: "Roboto", category: "sans-serif", source: VARIABLE_AXES },
  { id: "open-sans", name: "Open Sans", category: "sans-serif", source: VARIABLE_AXES },
  { id: "lato", name: "Lato", category: "sans-serif", source: "ital,wght@0,400;0,700;1,400;1,700" },
  { id: "merriweather", name: "Merriweather", category: "serif", source: VARIABLE_AXES },
  { id: "lora", name: "Lora", category: "serif", source: VARIABLE_AXES },
  { id: "source-serif-4", name: "Source Serif 4", category: "serif", source: VARIABLE_AXES },
  { id: "playfair-display", name: "Playfair Display", category: "serif", source: VARIABLE_AXES },
  { id: "literata", name: "Literata", category: "serif", source: VARIABLE_AXES },
  // Geist Serif isn't on Google Fonts, so it's served from public/fonts.
  { id: "geist-serif", name: "Geist Serif", category: "serif", source: "self-hosted" },
  { id: "geist-mono", name: "Geist Mono", category: "monospace", source: VARIABLE_AXES },
];

export const findPreviewFont = (id: string) => previewFonts.find((font) => font.id === id) ?? defaultFont;

export const fontStylesheetUrl = ({ name, source }: PreviewFont) =>
  source && source !== "self-hosted"
    ? `https://fonts.googleapis.com/css2?family=${name.replaceAll(" ", "+")}:${source}&display=swap`
    : undefined;

export const fontFamily = ({ name, category, source }: PreviewFont) => (source ? `"${name}", ${category}` : undefined);
