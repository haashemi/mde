import type { ReactElement, ReactNode } from "react";

import { Children, isValidElement } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CodeBlock } from "./code-block";

interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

const TabsBlock = ({ tabs }: { tabs: Tab[] }) => {
  const [firstTab] = tabs;
  if (!firstTab) return null;

  return (
    <Tabs defaultValue={firstTab.value} className="md-tabs">
      <TabsList variant="line">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="md-tabs-content">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

type PanelElement = ReactElement<{ children?: ReactNode; "data-framework"?: string }>;

const panelsOf = (children: ReactNode) => Children.toArray(children).filter(isValidElement) as PanelElement[];

const parseJson = <T,>(value: string | undefined): T | undefined => {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};

interface PackageManagerMeta {
  mode: "dev-install" | "install" | "local-install";
  packagesByFramework: Record<string, string[][]>;
}

const packageManagers = {
  pnpm: { install: "pnpm add", dev: "pnpm add -D" },
  npm: { install: "npm install", dev: "npm install -D" },
  yarn: { install: "yarn add", dev: "yarn add -D" },
  bun: { install: "bun add", dev: "bun add -d" },
};

const packageManagerTabs = ({ mode, packagesByFramework }: PackageManagerMeta): Tab[] => {
  const lines = Object.values(packagesByFramework).flat();

  return Object.entries(packageManagers).map(([name, commands]) => {
    const command = mode === "dev-install" ? commands.dev : commands.install;
    const code = lines.map((packages) => `${command} ${packages.join(" ")}`).join("\n");

    return {
      value: name,
      label: name,
      content: (
        <CodeBlock data-lang="shell">
          <code>{code}</code>
        </CodeBlock>
      ),
    };
  });
};

interface DocComponentProps {
  "data-component"?: string;
  "data-attributes"?: string;
  "data-package-manager-meta"?: string;
  children?: ReactNode;
}

export const DocComponent = (props: DocComponentProps) => {
  const { "data-component": name, children } = props;

  if (name === "tabs") {
    const packageManagerMeta = parseJson<PackageManagerMeta>(props["data-package-manager-meta"]);
    if (packageManagerMeta) return <TabsBlock tabs={packageManagerTabs(packageManagerMeta)} />;

    const meta = parseJson<{ tabs?: { slug: string; name: string }[] }>(props["data-attributes"]);
    const panels = panelsOf(children);
    const tabs = (meta?.tabs ?? []).map((tab, index) => ({
      value: tab.slug,
      label: tab.name,
      content: panels[index]?.props.children,
    }));

    return <TabsBlock tabs={tabs} />;
  }

  if (name === "framework") {
    const tabs = panelsOf(children).map((panel) => {
      const framework = panel.props["data-framework"] ?? "";
      return { value: framework, label: framework, content: panel.props.children };
    });

    return <TabsBlock tabs={tabs} />;
  }

  return <div data-component={name}>{children}</div>;
};
