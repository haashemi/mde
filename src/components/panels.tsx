import { useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import { useDebounce } from "use-debounce";

import { cn } from "@/mde/lib";
import { useMdeContent, useMdeView } from "@/mde/stores";

export const EditorPanel = () => {
  const [view] = useMdeView();
  const [content, setContent] = useMdeContent();

  return (
    <textarea
      value={content}
      onChange={(v) => setContent(v.target.value)}
      placeholder="Write your markdown here..."
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 font-mono transition-all dark:bg-zinc-950",
        "resize-none border-none text-lg outline-none",
        view === "preview" && "h-0 flex-none p-0 lg:h-full lg:w-0",
      )}
    />
  );
};

export const PreviewPanel = () => {
  const [view] = useMdeView();
  const [mdeContent] = useMdeContent();

  const [content, setContent] = useDebounce(mdeContent, 100);
  const renderedMarkdown = useMemo(
    () => <Markdown remarkPlugins={[remarkGfm, remarkGemoji]}>{content}</Markdown>,
    [content],
  );

  useEffect(() => setContent(mdeContent), [mdeContent, setContent]);

  return (
    <article
      style={{ contentVisibility: "auto" }}
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 transition-all dark:bg-zinc-950",
        "prose prose-zinc max-w-none dark:prose-invert",
        view === "editor" && "h-0 flex-none p-0 lg:h-full lg:w-0",
      )}
    >
      {renderedMarkdown}
    </article>
  );
};
