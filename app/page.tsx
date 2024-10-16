"use client";

import { Header } from "./_components/header";
import { EditorPanel, PreviewPanel } from "./_components/panels";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden lg:flex-row">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </main>
  );
}
