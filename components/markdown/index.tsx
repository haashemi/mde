import type { MarkdownComponents } from "@tanstack/markdown/react";

import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { renderMarkdownReact } from "@tanstack/markdown/react";

import { highlightCode } from "@/lib/highlighter";

import { CodeBlock } from "./code-block";
import { DocComponent } from "./doc-component";
import { Frontmatter } from "./frontmatter";

const extensions = docsMarkdownExtensions();

const components = {
  a: ({ href, children, ...props }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
        {children}
      </a>
    );
  },
  img: ({ alt = "", ...props }) => <img alt={alt} loading="lazy" decoding="async" {...props} />,
  pre: CodeBlock,
  // Titled code blocks are wrapped in a <figure>; CodeBlock already shows the title in its header.
  figcaption: () => null,
  "md-comment-component": DocComponent,
} satisfies MarkdownComponents;

export const Markdown = ({ source }: { source: string }) => {
  const document = parseMarkdown(source, { extensions });

  return (
    <>
      {document.frontmatter && <Frontmatter source={document.frontmatter} />}
      {renderMarkdownReact(document, {
        extensions,
        components,
        highlighter: highlightCode,
        headingAnchors: { className: "heading-anchor" },
      })}
    </>
  );
};
