export const formatMarkdown = async (source: string) => {
  const [{ format }, markdown, yaml] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/markdown"),
    import("prettier/plugins/yaml"),
  ]);

  return format(source, { parser: "markdown", plugins: [markdown, yaml] });
};
