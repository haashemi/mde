import { EditorPanel, Header, PreviewPanel } from "@/mde/components";

import { useMdeDirection } from "./stores";

function App() {
  const [direction] = useMdeDirection();

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div dir={direction} className="flex w-full flex-1 flex-col gap-2 overflow-hidden lg:flex-row">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </main>
  );
}

export default App;
