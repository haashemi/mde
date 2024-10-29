import { DirectionButton, EditorViewButtons, ResetButton, ThemeSwitchButton } from "./buttons";

export const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-zinc-300 dark:border-zinc-700">
      <div className="inline-flex h-full">
        <ThemeSwitchButton />
        <ResetButton />
      </div>
      <div className="inline-flex h-full">
        <EditorViewButtons />
        <span className="h-full w-[1px] bg-zinc-300 dark:bg-zinc-700" />
        <DirectionButton />
      </div>
    </header>
  );
};
