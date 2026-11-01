import type { MdeFontSize } from "@/lib/store";

export const fontScales: Record<MdeFontSize, number> = { small: 0.875, medium: 1, large: 1.125, larger: 1.25 };

export interface PreviewFont {
  id: string;
  name: string;
  family?: string;
  category: "monospace" | "sans-serif" | "serif";
  load?: () => Promise<unknown>;
}

const defaultFont: PreviewFont = { id: "default", name: "Default", category: "sans-serif" };

export const previewFonts: PreviewFont[] = [
  defaultFont,
  {
    id: "inter",
    name: "Inter",
    family: "Inter Variable",
    category: "sans-serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/inter/wght.css"),
        import("@fontsource-variable/inter/wght-italic.css"),
      ]),
  },
  {
    id: "roboto",
    name: "Roboto",
    family: "Roboto Variable",
    category: "sans-serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/roboto/wght.css"),
        import("@fontsource-variable/roboto/wght-italic.css"),
      ]),
  },
  {
    id: "open-sans",
    name: "Open Sans",
    family: "Open Sans Variable",
    category: "sans-serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/open-sans/wght.css"),
        import("@fontsource-variable/open-sans/wght-italic.css"),
      ]),
  },
  {
    id: "lato",
    name: "Lato",
    family: "Lato",
    category: "sans-serif",
    load: () =>
      Promise.all([
        import("@fontsource/lato/400.css"),
        import("@fontsource/lato/400-italic.css"),
        import("@fontsource/lato/700.css"),
        import("@fontsource/lato/700-italic.css"),
      ]),
  },
  {
    id: "merriweather",
    name: "Merriweather",
    family: "Merriweather Variable",
    category: "serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/merriweather/wght.css"),
        import("@fontsource-variable/merriweather/wght-italic.css"),
      ]),
  },
  {
    id: "lora",
    name: "Lora",
    family: "Lora Variable",
    category: "serif",
    load: () =>
      Promise.all([import("@fontsource-variable/lora/wght.css"), import("@fontsource-variable/lora/wght-italic.css")]),
  },
  {
    id: "source-serif-4",
    name: "Source Serif 4",
    family: "Source Serif 4 Variable",
    category: "serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/source-serif-4/wght.css"),
        import("@fontsource-variable/source-serif-4/wght-italic.css"),
      ]),
  },
  {
    id: "playfair-display",
    name: "Playfair Display",
    family: "Playfair Display Variable",
    category: "serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/playfair-display/wght.css"),
        import("@fontsource-variable/playfair-display/wght-italic.css"),
      ]),
  },
  {
    id: "literata",
    name: "Literata",
    family: "Literata Variable",
    category: "serif",
    load: () =>
      Promise.all([
        import("@fontsource-variable/literata/wght.css"),
        import("@fontsource-variable/literata/wght-italic.css"),
      ]),
  },
  {
    id: "geist-mono",
    name: "Geist Mono",
    family: "Geist Mono Variable",
    category: "monospace",
    load: () =>
      Promise.all([
        import("@fontsource-variable/geist-mono/wght.css"),
        import("@fontsource-variable/geist-mono/wght-italic.css"),
      ]),
  },
];

export const findPreviewFont = (id: string) => previewFonts.find((font) => font.id === id) ?? defaultFont;

export const fontFamily = ({ family, category }: PreviewFont) => (family ? `"${family}", ${category}` : undefined);
