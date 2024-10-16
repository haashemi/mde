"use client";
import { useEffect } from "react";
import { useRemark } from "react-remark";

import { useContent } from "@/app/_contexts/content-context";
import { useDirection } from "@/app/_contexts/direction-context";
import { useEditorView } from "@/app/_contexts/editor-view-context";

import cn from "../_lib/cn";

export const EditorPanel = () => {
  const { view } = useEditorView();
  const { direction } = useDirection();
  const { content, setContent } = useContent();

  const isHidden = view === "preview";

  return (
    <textarea
      dir={direction}
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 transition-all dark:bg-zinc-950",
        "resize-none border-none text-lg outline-none",
        isHidden && "flex-none h-0 p-0 lg:h-full lg:w-0",
      )}
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

  const isHidden = view === "editor";

  return (
    <article
      dir={direction}
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 transition-all dark:bg-zinc-950 ",
        "prose prose-zinc max-w-none dark:prose-invert",
        isHidden && "flex-none h-0 p-0 lg:h-full lg:w-0",
      )}
    >
      {reactContent}
    </article>
  );
};
