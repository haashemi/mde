import type { ReactNode } from "react";

import { ColumnsIcon, DownloadSimpleIcon, EyeIcon, GearSixIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { lazy, Suspense, useRef, useState } from "react";

import type { MdeView } from "@/stores";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isModKey, useHotkey } from "@/hooks/use-hotkey";
import { downloadMarkdown } from "@/lib/download";
import { useGetMdeContent, useMdeView } from "@/stores";

import { HeaderButton, HeaderTooltip } from "./header-button";

const loadSettingsDrawer = () => import("./settings-drawer");
const SettingsDrawer = lazy(loadSettingsDrawer);

const views: { value: MdeView; label: string; shortcut: string; icon: ReactNode }[] = [
  { value: "editor", label: "Editor only", shortcut: "Alt 1", icon: <PencilSimpleLineIcon /> },
  { value: "both", label: "Split view", shortcut: "Alt 2", icon: <ColumnsIcon className="rotate-90 lg:rotate-0" /> },
  { value: "preview", label: "Preview only", shortcut: "Alt 3", icon: <EyeIcon /> },
];

// `code` instead of `key`: on macOS, Option+1 produces "¡" as the key.
const viewForKey = (event: KeyboardEvent) => views[Number(event.code.replace("Digit", "")) - 1];

const ViewToggle = () => {
  const [view, setView] = useMdeView();

  useHotkey(
    (event) => event.altKey && !isModKey(event) && viewForKey(event) !== undefined,
    (event) => {
      const next = viewForKey(event);
      if (next) setView(next.value);
    },
  );

  return (
    <ToggleGroup
      aria-label="Layout"
      spacing={0}
      className="h-full divide-x"
      value={[view]}
      onValueChange={([next]) => next && setView(next as MdeView)}
    >
      {views.map(({ value, label, shortcut, icon }) => (
        <HeaderTooltip key={value} label={label} shortcut={shortcut}>
          <ToggleGroupItem
            value={value}
            aria-label={label}
            className="relative h-full min-w-11 text-muted-foreground aria-pressed:bg-transparent aria-pressed:text-foreground aria-pressed:after:absolute aria-pressed:after:inset-x-0 aria-pressed:after:-bottom-px aria-pressed:after:h-0.5 aria-pressed:after:bg-foreground"
          >
            {icon}
          </ToggleGroupItem>
        </HeaderTooltip>
      ))}
    </ToggleGroup>
  );
};

const DownloadButton = () => {
  const getContent = useGetMdeContent();
  const download = () => downloadMarkdown(getContent());

  useHotkey((event) => isModKey(event) && event.key.toLowerCase() === "s", download);

  return (
    <HeaderTooltip label="Download markdown" shortcut="Ctrl S">
      <HeaderButton aria-label="Download markdown" onClick={download}>
        <DownloadSimpleIcon />
      </HeaderButton>
    </HeaderTooltip>
  );
};

const SettingsButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // The drawer is only loaded once it's first needed, then stays mounted for its close animation.
  const [hasOpened, setHasOpened] = useState(false);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) setHasOpened(true);
  };

  useHotkey(
    (event) => isModKey(event) && event.key === ",",
    () => changeOpen(!open),
  );

  return (
    <>
      <HeaderTooltip label="Settings" shortcut="Ctrl ,">
        <HeaderButton
          ref={buttonRef}
          aria-label="Settings"
          aria-haspopup="dialog"
          aria-expanded={open}
          onPointerEnter={loadSettingsDrawer}
          onFocus={loadSettingsDrawer}
          onClick={() => changeOpen(true)}
        >
          <GearSixIcon />
        </HeaderButton>
      </HeaderTooltip>
      {hasOpened && (
        <Suspense>
          <SettingsDrawer open={open} onOpenChange={changeOpen} finalFocus={buttonRef} />
        </Suspense>
      )}
    </>
  );
};

export const Header = () => (
  <header className="flex h-11 shrink-0 items-stretch border-b">
    <div className="flex items-center gap-2 px-4 text-sm font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="size-4" />
      mde
    </div>
    <div className="flex-1" />
    <div className="flex items-stretch divide-x border-s">
      <ViewToggle />
      <DownloadButton />
      <SettingsButton />
    </div>
  </header>
);
