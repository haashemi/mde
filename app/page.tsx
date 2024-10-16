"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useRemark } from "react-remark";

import { Button } from "@/app/_components/ui/button";

const initialText = "# Hello World!\n\nHere's a simple Markdown editor, use it however you want.";

const Editor = ({ rawMarkdown, setRawMarkdown }: { rawMarkdown: string; setRawMarkdown: (s: string) => void }) => (
  <textarea
    className="min-w-0 flex-1 shrink-0 resize-none overflow-y-auto rounded-xl border-none bg-zinc-50 p-2.5 text-lg outline-none dark:bg-zinc-900"
    placeholder="Write your markdown here..."
    value={rawMarkdown}
    onChange={(v) => setRawMarkdown(v.target.value)}
  />
);

const Article = ({ children }: { children: React.ReactNode }) => (
  <article className="prose prose-zinc min-w-0 max-w-none flex-1 shrink-0 overflow-y-auto rounded-xl p-2 dark:prose-invert">
    {children}
  </article>
);

const App = () => {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [view, setView] = useState<"both" | "editor" | "preview">("both");
  const [rawMarkdown, setRawMarkdown] = useState(initialText);
  const [reactContent, setMarkdownSource] = useRemark();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMarkdownSource(rawMarkdown);
  }, [rawMarkdown, setMarkdownSource]);

  const nextDir = dir === "rtl" ? "ltr" : "rtl";
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <main className="flex h-screen flex-col gap-2 p-2">
      <header className="flex h-14 items-center justify-between px-2">
        <Button onClick={() => setTheme(nextTheme)}>{nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}</Button>

        <div className="flex">
          <Button className="rounded-r-none" onClick={() => setView("editor")}>
            Editor
          </Button>
          <Button
            className="rounded-none border-x border-x-zinc-300 dark:border-x-zinc-700"
            onClick={() => setView("both")}
          >
            Both
          </Button>
          <Button className="rounded-l-none" onClick={() => setView("preview")}>
            Preview
          </Button>
        </div>

        <Button onClick={() => setDir(nextDir)}>{dir.toUpperCase()}</Button>
      </header>
      <div dir={dir} className="flex w-full flex-1 flex-col gap-2 overflow-hidden lg:flex-row">
        {view === "both" || view === "editor" ? (
          <Editor rawMarkdown={rawMarkdown} setRawMarkdown={setRawMarkdown} />
        ) : null}
        {view === "both" || view === "preview" ? <Article>{reactContent}</Article> : null}
      </div>
    </main>
  );
};

export default App;
