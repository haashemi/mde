import type { CodeHighlighter } from "@tanstack/markdown";

import { createHighlighter } from "@tanstack/highlight/core";
import { c } from "@tanstack/highlight/languages/c";
import { cpp } from "@tanstack/highlight/languages/cpp";
import { csharp } from "@tanstack/highlight/languages/csharp";
import { css } from "@tanstack/highlight/languages/css";
import { diff } from "@tanstack/highlight/languages/diff";
import { dockerfile } from "@tanstack/highlight/languages/dockerfile";
import { go } from "@tanstack/highlight/languages/go";
import { graphql } from "@tanstack/highlight/languages/graphql";
import { html } from "@tanstack/highlight/languages/html";
import { ini } from "@tanstack/highlight/languages/ini";
import { java } from "@tanstack/highlight/languages/java";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { kotlin } from "@tanstack/highlight/languages/kotlin";
import { lua } from "@tanstack/highlight/languages/lua";
import { markdown } from "@tanstack/highlight/languages/markdown";
import { php } from "@tanstack/highlight/languages/php";
import { plaintext } from "@tanstack/highlight/languages/plaintext";
import { python } from "@tanstack/highlight/languages/python";
import { ruby } from "@tanstack/highlight/languages/ruby";
import { rust } from "@tanstack/highlight/languages/rust";
import { scss } from "@tanstack/highlight/languages/scss";
import { shell } from "@tanstack/highlight/languages/shell";
import { sql } from "@tanstack/highlight/languages/sql";
import { swift } from "@tanstack/highlight/languages/swift";
import { toml } from "@tanstack/highlight/languages/toml";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { yaml } from "@tanstack/highlight/languages/yaml";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { createThemeCss } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";

const highlightMarkdownCode = createTanStackMarkdownHighlighter(
  createHighlighter({
    languages: [
      c,
      cpp,
      csharp,
      css,
      diff,
      dockerfile,
      go,
      graphql,
      html,
      ini,
      java,
      js,
      json,
      jsx,
      kotlin,
      lua,
      markdown,
      php,
      plaintext,
      python,
      ruby,
      rust,
      scss,
      shell,
      sql,
      swift,
      toml,
      ts,
      tsx,
      yaml,
    ],
  }),
);

const CACHE_LIMIT = 256;
const cache = new Map<string, string>();

/**
 * The preview re-renders on every edit, but most code blocks don't change between keystrokes.
 * Caching the highlighted markup keeps re-tokenizing limited to the block being edited.
 */
export const highlightCode: CodeHighlighter = (code, lang, options) => {
  const key = `${lang}\0${options?.lineNumbers}\0${options?.highlightLines?.join()}\0${code}`;

  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const result = highlightMarkdownCode(code, lang, options);
  const oldest = cache.keys().next().value;
  if (cache.size >= CACHE_LIMIT && oldest !== undefined) cache.delete(oldest);
  cache.set(key, result);

  return result;
};

export const highlightThemeCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  darkSelector: ".dark",
  includeBaseStyles: false,
});
