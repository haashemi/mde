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

const downloadWithLink = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  // Revoking right away can cancel the download in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** Asks where to save and under what name; browsers without a save dialog fall back to a plain download. */
export const downloadMarkdown = async (content: string) => {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const suggestedName = markdownFileName(content);

  if (!window.showSaveFilePicker) return downloadWithLink(blob, suggestedName);

  try {
    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [{ description: "Markdown", accept: { "text/markdown": [".md", ".markdown"] } }],
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } catch (error) {
    // Closing the dialog is a choice, not a failure.
    if (error instanceof DOMException && error.name === "AbortError") return;
    throw error;
  }
};
