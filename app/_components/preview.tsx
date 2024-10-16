"use client";
import { useEffect } from "react";
import { useRemark } from "react-remark";

import { useContent } from "@/app/_contexts/content-context";
import { useDirection } from "@/app/_contexts/direction-context";

export const Preview = () => {
  const { direction } = useDirection();
  const { content } = useContent();
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => setMarkdownSource(content), [content, setMarkdownSource]);

  return (
    <article
      dir={direction}
      className="prose prose-zinc min-w-0 max-w-none flex-1 shrink-0 overflow-y-auto rounded-xl p-2 dark:prose-invert"
    >
      {reactContent}
    </article>
  );
};
