"use client";
import { useEffect } from "react";
import { useRemark } from "react-remark";

import { useContent } from "@/app/_contexts/content-context";
import { useDirection } from "@/app/_contexts/direction-context";
import { useEditorView } from "@/app/_contexts/editor-view-context";

export const EditorPanel = () => {
  const { view } = useEditorView();
  const { direction } = useDirection();
  const { content, setContent } = useContent();

  if (view === "preview") return null;

  return (
    <textarea
      dir={direction}
      className="min-w-0 flex-1 shrink-0 resize-none overflow-y-auto rounded-xl border-none bg-zinc-50 p-2.5 text-lg outline-none dark:bg-zinc-900"
      placeholder="Write your markdown here..."
      value={content}
      onChange={(v) => setContent(v.target.value)}
    />
  );
};

export const PreviewPanel = () => {
  const { view } = useEditorView();
  const { content } = useContent();
  const { direction } = useDirection();
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => setMarkdownSource(content), [content, setMarkdownSource]);

  if (view === "editor") return null;

  return (
    <article
      dir={direction}
      className="prose prose-zinc min-w-0 max-w-none flex-1 shrink-0 overflow-y-auto rounded-xl bg-zinc-50 p-2.5 dark:prose-invert dark:bg-zinc-900"
    >
      {reactContent}
    </article>
  );
};
