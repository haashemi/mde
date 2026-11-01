import type { CSSProperties } from "react";

import { Activity, useEffect } from "react";

import { EditorPanel } from "@/components/editor-panel";
import { Header } from "@/components/header";
import { PanelDivider } from "@/components/panel";
import { PreviewPanel } from "@/components/preview-panel";
import { findPreviewFont, fontFamily, fontScales } from "@/lib/fonts";
import { useMdeDirection, useMdeFontSizeValue, useMdePreviewFontValue, useMdeView } from "@/stores";

// Set on the root so the font reaches everything, including the portalled drawer and tooltips.
const useAppFont = () => {
  const font = findPreviewFont(useMdePreviewFontValue());

  // Only the selected font is ever fetched; until it arrives the fallback stack is shown.
  useEffect(() => {
    void font.load?.();

    const family = fontFamily(font);
    if (family) document.documentElement.style.setProperty("--app-font", family);
    else document.documentElement.style.removeProperty("--app-font");
  }, [font]);
};

function App() {
  const [view] = useMdeView();
  const [direction] = useMdeDirection();
  const fontSize = useMdeFontSizeValue();
  useAppFont();

  // Activity keeps hidden panels mounted (scroll, undo history) without rendering them on every keystroke.
  return (
    <div className="flex h-dvh flex-col">
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
