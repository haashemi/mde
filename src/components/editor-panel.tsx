import type { KeyboardEvent } from "react";

import { MagicWandIcon } from "@phosphor-icons/react";
import { useDeferredValue, useRef } from "react";

import { Button } from "@/components/ui/button";
import { formatMarkdown } from "@/lib/format";
import { useMdeContent } from "@/lib/store";
import { syncedScrollRef } from "@/lib/synced-scroll";
import { isModKey, useHotkey } from "@/lib/use-hotkey";

import { Panel } from "./panel";
import { ShortcutTooltip } from "./shortcut-tooltip";

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

const isFormatKey = (event: globalThis.KeyboardEvent) =>
  event.shiftKey && event.altKey && !isModKey(event) && event.code === "KeyF";

export const EditorPanel = () => {
  const [content, setContent] = useMdeContent();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const format = async () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const formatted = await formatMarkdown(textarea.value);
    if (formatted === textarea.value) return;

    const { scrollTop, selectionStart } = textarea;
    textarea.focus();
    textarea.select();
    insertText(textarea, formatted);
    textarea.setSelectionRange(selectionStart, selectionStart);
    textarea.scrollTop = scrollTop;
  };

  useHotkey(isFormatKey, () => void format());

  const formatButton = (
    <ShortcutTooltip label="Format" shortcut="Shift Alt F">
      <Button variant="ghost" size="icon-xs" aria-label="Format" onClick={() => void format()}>
        <MagicWandIcon />
      </Button>
    </ShortcutTooltip>
  );

  return (
    <Panel label="editor" meta={<EditorStats content={content} />} actions={formatButton}>
      <textarea
        ref={(element) => {
          textareaRef.current = element;
          return syncedScrollRef(element);
        }}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Markdown source"
        placeholder="Write your markdown here…"
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        className="flex-1 resize-none overflow-y-auto bg-transparent p-4 text-[calc(1rem*var(--font-scale,1))]/relaxed outline-none placeholder:text-muted-foreground lg:text-[calc(0.875rem*var(--font-scale,1))]"
      />
    </Panel>
  );
};
