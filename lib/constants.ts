export const defaultMarkdownContent = `---
title: Welcome to MDE
---

# Welcome to MDE

A small, fast markdown editor. Write on one side, read on the other.
Everything stays in your browser.

## Text

You can write **bold**, *italic*, ~~struck~~, and \`inline code\`.
Links work too: [GitHub repository](https://github.com/haashemi/mde).

> Blockquotes are for the things worth quoting.

Callouts are for the things worth noticing:

> [!TIP] Callouts
> Use \`[!NOTE]\`, \`[!TIP]\`, \`[!IMPORTANT]\`, \`[!WARNING]\` or \`[!CAUTION]\`.

## Lists

- [x] Render markdown with TanStack Markdown
- [x] Highlight code with TanStack Highlight
- [ ] Write something great

1. Ordered
2. Lists
3. Too

## Code

\`\`\`ts title="hello.ts" {2}
export function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Mark changes with \`// [!code ++]\` and \`// [!code --]\`:

\`\`\`js
const answer = 41; // [!code --]
const answer = 42; // [!code ++]
\`\`\`

## Tables

| Feature        | Status | Notes            |
| :------------- | :----: | ---------------: |
| Live preview   |   ✓    |  As you type     |
| RTL support    |   ✓    |  Toggle in menu  |
| Offline (PWA)  |   ✓    |  Install it      |

## Tabs

<!-- ::start:tabs -->

## pnpm

\`\`\`sh
pnpm install
\`\`\`

## npm

\`\`\`sh
npm install
\`\`\`

<!-- ::end:tabs -->

## Footnotes

Footnotes are supported as well.[^1]

[^1]: And they link back to where you were.
`;
