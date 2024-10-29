import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

import { Button } from "./button";

export const ThemeSwitchButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button onClick={() => setTheme(nextTheme)}>
      {nextTheme === "dark" ? <RiMoonLine className="size-full" /> : <RiSunLine className="size-full" />}
    </Button>
  );
};
