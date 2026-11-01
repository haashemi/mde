// Frontmatter stays unparsed in @tanstack/markdown; flat `key: value` pairs are all we need to show it.
const parseEntries = (source: string) =>
  source
    .split("\n")
    .map((line) => /^([\w-]+):(.*)$/.exec(line))
    .filter((match) => match !== null)
    .map(([, key = "", value = ""]) => [key, value.trim().replace(/^(["'])(.*)\1$/, "$2")] as const);

export const Frontmatter = ({ source }: { source: string }) => {
  const entries = parseEntries(source);
  if (entries.length === 0) return null;

  return (
    <dl className="frontmatter not-prose">
      {entries.map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
};
