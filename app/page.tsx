"use client";

import { Editor } from "./_components/editor";
import { Preview } from "./_components/preview";
import { useEditorView } from "./_contexts/editor-view-context";
import { useMounted } from "./_hooks/use-mounted";

export default function HomePage() {
  const isMounted = useMounted();
  const { view } = useEditorView();

  return (
    <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden lg:flex-row">
      {isMounted ? (
        <>
          {view === "both" || view === "editor" ? <Editor /> : null}
          {view === "both" || view === "preview" ? <Preview /> : null}
        </>
      ) : (
        <>
          <div className="flex-1 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex-1 animate-pulse rounded-xl bg-zinc-50 dark:bg-zinc-950" />
        </>
      )}
    </div>
  );
}
