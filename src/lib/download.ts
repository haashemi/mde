const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

/** Names the file after the frontmatter title or the first heading, like a blog post slug. */
export const markdownFileName = (content: string) => {
  const title = /^title:(.*)$/m.exec(content)?.[1] ?? /^#{1,6} (.*)$/m.exec(content)?.[1] ?? "";
  return `${slugify(title.trim().replace(/^(["'])(.*)\1$/, "$2")) || "document"}.md`;
};

export const downloadMarkdown = (content: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));

  const link = document.createElement("a");
  link.href = url;
  link.download = markdownFileName(content);
  link.click();

  // Revoking right away can cancel the download in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
