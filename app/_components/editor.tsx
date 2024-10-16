"use client";
import { useContent } from "@/app/_contexts/content-context";
import { useDirection } from "@/app/_contexts/direction-context";

export const Editor = () => {
  const { direction } = useDirection();
  const { content, setContent } = useContent();

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
