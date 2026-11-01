import type { ComponentProps, ReactNode } from "react";

import { ColumnsIcon, EyeIcon, GearSixIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { lazy, Suspense, useRef, useState } from "react";

import type { MdeView } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { downloadMarkdown } from "@/lib/download";
import { useGetMdeContent, useMdeView } from "@/lib/store";
import { isModKey, useHotkey } from "@/lib/use-hotkey";

import { ShortcutTooltip } from "./shortcut-tooltip";

const HeaderButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="ghost" className="h-full min-w-11 px-3" {...props} />
);

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
        <ShortcutTooltip key={value} label={label} shortcut={shortcut}>
          <ToggleGroupItem
            value={value}
            aria-label={label}
            className="relative h-full min-w-11 text-muted-foreground aria-pressed:bg-transparent aria-pressed:text-foreground aria-pressed:after:absolute aria-pressed:after:inset-x-0 aria-pressed:after:-bottom-px aria-pressed:after:h-0.5 aria-pressed:after:bg-foreground"
          >
            {icon}
          </ToggleGroupItem>
        </ShortcutTooltip>
      ))}
    </ToggleGroup>
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
      <ShortcutTooltip label="Settings" shortcut="Ctrl ,">
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
      </ShortcutTooltip>
      {hasOpened && (
        <Suspense>
          <SettingsDrawer open={open} onOpenChange={changeOpen} finalFocus={buttonRef} />
        </Suspense>
      )}
    </>
  );
};

export const Header = () => {
  const getContent = useGetMdeContent();

  // Downloading lives in the settings drawer; the shortcut works from anywhere.
  useHotkey(
    (event) => isModKey(event) && event.key.toLowerCase() === "s",
    () => void downloadMarkdown(getContent()),
  );

  return (
    <header className="flex h-11 shrink-0 items-stretch border-b">
      <div className="flex items-center gap-2 px-4 text-sm font-semibold tracking-tight">
        <img src="/favicon.svg" alt="" className="size-4" />
        MDE
      </div>
      <div className="flex-1" />
      <div className="flex items-stretch divide-x border-s">
        <ViewToggle />
        <SettingsButton />
      </div>
    </header>
  );
};
