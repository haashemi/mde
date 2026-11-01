import { Activity } from "react";

import { EditorPanel } from "@/components/editor-panel";
import { Header } from "@/components/header";
import { PanelDivider } from "@/components/panel";
import { PreviewPanel } from "@/components/preview-panel";
import { useMdeDirection, useMdeView } from "@/stores";

function App() {
  const [view] = useMdeView();
  const [direction] = useMdeDirection();

  // Activity keeps hidden panels mounted (scroll, undo history) without rendering them on every keystroke.
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <main dir={direction} className="flex min-h-0 flex-1 flex-col lg:flex-row">
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
