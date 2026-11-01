import type { ComponentProps } from "react";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type CodeBlockProps = ComponentProps<"pre"> & {
  "data-lang"?: string;
  "data-code-title"?: string;
};

const COPIED_FEEDBACK_MS = 1500;

export const CodeBlock = ({ "data-lang": lang, "data-code-title": title, ...props }: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <div className="code-block not-prose">
      <div className="code-block-header">
        <span className="truncate">{title ?? (lang === "plaintext" ? "text" : lang)}</span>
        <Button variant="ghost" size="icon-xs" aria-label="Copy code" onClick={copy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      <pre ref={preRef} dir="ltr" {...props} />
    </div>
  );
};
