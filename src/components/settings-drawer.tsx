import type { ReactNode, RefObject } from "react";

import {
  ArrowCounterClockwiseIcon,
  DesktopIcon,
  DownloadSimpleIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { MdeDirection, MdeFontSize } from "@/stores";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { defaultMarkdownContent } from "@/lib/constants";
import { downloadMarkdown, markdownFileName } from "@/lib/download";
import { previewFonts } from "@/lib/fonts";
import {
  useMdeContent,
  useMdeContentValue,
  useMdeDirection,
  useMdeFontSize,
  useMdePreviewFont,
  useMdeView,
} from "@/stores";

const SettingsSection = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="border-b">
    <h3 className="px-4 pt-4 pb-2 text-xs text-muted-foreground">{label}</h3>
    <div className="px-4 pb-4">{children}</div>
  </section>
);

interface Option<Value extends string> {
  value: Value;
  label: string;
  icon?: ReactNode;
}

const Segmented = <Value extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<Value>[];
  value: Value;
  onChange: (value: Value) => void;
}) => (
  <ToggleGroup
    aria-label={label}
    variant="outline"
    spacing={0}
    className="w-full"
    value={[value]}
    onValueChange={([next]) => next && onChange(next as Value)}
  >
    {options.map((option) => (
      <ToggleGroupItem
        key={option.value}
        value={option.value}
        className="flex-1 aria-pressed:bg-foreground aria-pressed:text-background"
      >
        {option.icon}
        {option.label}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

const themeOptions: Option<string>[] = [
  { value: "system", label: "System", icon: <DesktopIcon /> },
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
];

const ThemeSetting = () => {
  const { theme = "system", setTheme } = useTheme();
  return <Segmented label="Theme" options={themeOptions} value={theme} onChange={setTheme} />;
};

const directionOptions: Option<MdeDirection>[] = [
  { value: "ltr", label: "Left to right" },
  { value: "rtl", label: "Right to left" },
];

const DirectionSetting = () => {
  const [direction, setDirection] = useMdeDirection();
  return <Segmented label="Text direction" options={directionOptions} value={direction} onChange={setDirection} />;
};

const fontSizeOptions: Option<MdeFontSize>[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "larger", label: "Larger" },
];

const FontSizeSetting = () => {
  const [fontSize, setFontSize] = useMdeFontSize();
  return <Segmented label="Font size" options={fontSizeOptions} value={fontSize} onChange={setFontSize} />;
};

const FontSetting = () => {
  const [fontId, setFontId] = useMdePreviewFont();

  return (
    <RadioGroup
      aria-label="Preview font"
      value={fontId}
      onValueChange={(value) => setFontId(String(value))}
      className="gap-0 divide-y border"
    >
      {previewFonts.map((font) => (
        <Label key={font.id} className="h-10 cursor-pointer gap-3 px-3 hover:bg-muted has-data-checked:bg-muted">
          <RadioGroupItem value={font.id} aria-label={font.name} />
          <span className="flex-1 text-sm">{font.name}</span>
          <span className="text-muted-foreground">{font.family ? font.category : "app"}</span>
        </Label>
      ))}
    </RadioGroup>
  );
};

const DownloadSetting = () => {
  const content = useMdeContentValue();

  return (
    <Button
      variant="outline"
      aria-label={`Download ${markdownFileName(content)}`}
      className="h-10 w-full justify-between"
      onClick={() => void downloadMarkdown(content)}
    >
      <span className="flex items-center gap-2">
        <DownloadSimpleIcon />
        Download
      </span>
      <span className="truncate text-muted-foreground">{markdownFileName(content)}</span>
    </Button>
  );
};

const CONFIRM_TIMEOUT_MS = 3000;

// Resetting throws away the document, so it takes a second click to go through.
const ResetSetting = () => {
  const [, setContent] = useMdeContent();
  const [, setDirection] = useMdeDirection();
  const [, setView] = useMdeView();
  const [, setFontId] = useMdePreviewFont();
  const [, setFontSize] = useMdeFontSize();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timeout = setTimeout(() => setConfirming(false), CONFIRM_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [confirming]);

  const reset = () => {
    if (!confirming) return setConfirming(true);

    setContent(defaultMarkdownContent);
    setDirection("ltr");
    setView("both");
    setFontId("default");
    setFontSize("medium");
    setConfirming(false);
  };

  return (
    <Button
      variant={confirming ? "destructive" : "outline"}
      className="h-10 w-full justify-start gap-2"
      onClick={reset}
    >
      <ArrowCounterClockwiseIcon />
      {confirming ? "Click again to reset everything" : "Reset document and settings"}
    </Button>
  );
};

interface SettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Where focus goes back to when the drawer closes. */
  finalFocus: RefObject<HTMLElement | null>;
}

// Default export so the header can lazy-load it; settings aren't needed for the first paint.
export default function SettingsDrawer({ open, onOpenChange, finalFocus }: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="font-mono" finalFocus={finalFocus}>
        <div className="flex h-11 shrink-0 items-center justify-between border-b ps-4">
          <DrawerTitle>settings</DrawerTitle>
          <DrawerClose
            render={
              <Button variant="ghost" aria-label="Close settings" className="h-full w-11 border-s">
                <XIcon />
              </Button>
            }
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <SettingsSection label="theme">
            <ThemeSetting />
          </SettingsSection>
          <SettingsSection label="text direction">
            <DirectionSetting />
          </SettingsSection>
          <SettingsSection label="font size">
            <FontSizeSetting />
          </SettingsSection>
          <SettingsSection label="preview font">
            <FontSetting />
          </SettingsSection>
          <SettingsSection label="document">
            <div className="grid gap-2">
              <DownloadSetting />
              <ResetSetting />
            </div>
          </SettingsSection>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
