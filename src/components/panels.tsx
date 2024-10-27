import { cn } from "@/mde/lib";
import { useMdeContent, useMdeView } from "@/mde/stores";
import { useEffect } from "react";
import { useRemark } from "react-remark";

export const EditorPanel = () => {
  const [view] = useMdeView();
  const [content, setContent] = useMdeContent();

  const isHidden = view === "preview";

  return (
    <textarea
      placeholder="Write your markdown here..."
      value={content}
      onChange={(v) => setContent(v.target.value)}
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 transition-all dark:bg-zinc-950",
        "resize-none border-none text-lg outline-none",
        isHidden && "h-0 flex-none p-0 lg:h-full lg:w-0",
      )}
    />
  );
};

export const PreviewPanel = () => {
  const [view] = useMdeView();
  const [content] = useMdeContent();

  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => setMarkdownSource(content), [content, setMarkdownSource]);

  const isHidden = view === "editor";

  return (
    <article
      className={cn(
        "min-w-0 flex-1 shrink-0 overflow-y-auto bg-zinc-50 p-4 transition-all dark:bg-zinc-950 ",
        "prose prose-zinc max-w-none dark:prose-invert",
        isHidden && "h-0 flex-none p-0 lg:h-full lg:w-0",
      )}
    >
      {reactContent}
    </article>
  );
};
