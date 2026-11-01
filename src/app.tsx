import type { CSSProperties } from "react";

import { useTheme } from "next-themes";
import { Activity, useEffect } from "react";

import { EditorPanel } from "@/components/editor-panel";
import { Header } from "@/components/header";
import { PanelDivider } from "@/components/panel";
import { PreviewPanel } from "@/components/preview-panel";
import { findPreviewFont, fontFamily, fontScales } from "@/lib/fonts";
import { useMdeDirection, useMdeFontSizeValue, useMdePreviewFontValue, useMdeView } from "@/lib/store";

const useAppFont = () => {
  const font = findPreviewFont(useMdePreviewFontValue());

  useEffect(() => {
    void font.load?.();

    const family = fontFamily(font);
    if (family) document.documentElement.style.setProperty("--app-font", family);
    else document.documentElement.style.removeProperty("--app-font");
  }, [font]);
};

// The theme can differ from the OS setting, so the browser chrome follows the app's background instead.
const THEME_COLORS = { light: "#fcfcfc", dark: "#0b0b0b" };

const useThemeColor = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const color = THEME_COLORS[resolvedTheme === "dark" ? "dark" : "light"];
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.setAttribute("content", color);
  }, [resolvedTheme]);
};

function App() {
  const [view] = useMdeView();
  const [direction] = useMdeDirection();
  const fontSize = useMdeFontSizeValue();
  useAppFont();
  useThemeColor();

  // Activity keeps hidden panels mounted (scroll, undo history) without rendering them on every keystroke.
  return (
    <div className="flex h-dvh flex-col pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      <Header />
      <main
        dir={direction}
        style={{ "--font-scale": fontScales[fontSize] } as CSSProperties}
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
      >
        <Activity mode={view === "preview" ? "hidden" : "visible"}>
          <EditorPanel />
        </Activity>
        {view === "both" && <PanelDivider />}
        <Activity mode={view === "editor" ? "hidden" : "visible"}>
          <PreviewPanel />
        </Activity>
      </main>
    </div>
  );
}

export default App;
