import type { KeyboardEvent } from "react";

import { useDeferredValue } from "react";

import { syncedScrollRef } from "@/lib/synced-scroll";
import { useMdeContent } from "@/stores";

import { Panel } from "./panel";

const INDENT = "  ";

const countWords = (text: string) => text.match(/\S+/g)?.length ?? 0;

const countLines = (text: string) => (text ? text.split("\n").length : 0);

// Inserting through execCommand keeps the browser's native undo stack intact.
const insertText = (textarea: HTMLTextAreaElement, text: string) => {
  if (!document.execCommand("insertText", false, text))
    textarea.setRangeText(text, textarea.selectionStart, textarea.selectionEnd, "end");
};

const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key !== "Tab" || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;

  event.preventDefault();
  insertText(event.currentTarget, INDENT);
};

const EditorStats = ({ content }: { content: string }) => {
  const deferred = useDeferredValue(content);
  return `${countWords(deferred)} words · ${countLines(deferred)} lines`;
};

export const EditorPanel = () => {
  const [content, setContent] = useMdeContent();

  return (
    <Panel label="editor" meta={<EditorStats content={content} />}>
      <textarea
        ref={syncedScrollRef}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Markdown source"
        placeholder="Write your markdown here…"
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        className="flex-1 resize-none overflow-y-auto bg-transparent p-4 font-mono text-[calc(1rem*var(--font-scale,1))]/relaxed outline-none placeholder:text-muted-foreground lg:text-[calc(0.875rem*var(--font-scale,1))]"
      />
    </Panel>
  );
};
