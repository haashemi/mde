import { EditorPanel, Header, PreviewPanel } from "@/mde/components";

import { useMdeDirection } from "./stores";

function App() {
  const [direction] = useMdeDirection();

  return (
    <main className="flex h-screen flex-col">
      <Header />
      <div dir={direction} className="flex w-full flex-1 flex-col overflow-hidden lg:flex-row">
        <EditorPanel />
        <span className="border border-zinc-300 dark:border-zinc-700" />
        <PreviewPanel />
      </div>
    </main>
  );
}

export default App;
