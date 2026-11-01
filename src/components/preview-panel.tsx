import { useDeferredValue } from "react";

import { highlightThemeCss } from "@/lib/highlighter";
import { useMdeContentValue } from "@/lib/store";
import { syncedScrollRef } from "@/lib/synced-scroll";

import { Markdown } from "./markdown";
import { Panel } from "./panel";

const WORDS_PER_MINUTE = 230;

const readingTime = (text: string) => {
  const words = text.match(/\S+/g)?.length ?? 0;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
};

export const PreviewPanel = () => {
  // Rendering is deferred so typing never waits on the preview.
  const content = useDeferredValue(useMdeContentValue());

  return (
    <Panel label="preview" meta={readingTime(content)}>
      <style href="mde-highlight-theme" precedence="default">
        {highlightThemeCss}
      </style>
      <article
        ref={syncedScrollRef}
        className="markdown relative prose max-w-none flex-1 overflow-y-auto p-4 prose-neutral lg:p-8 dark:prose-invert"
      >
        <div className="mx-auto max-w-3xl">
          <Markdown source={content} />
        </div>
      </article>
    </Panel>
  );
};
