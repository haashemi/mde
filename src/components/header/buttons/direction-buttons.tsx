import { cn } from "@/mde/lib";
import { useMdeDirection } from "@/mde/stores";
import { RiTextDirectionL, RiTextDirectionR } from "react-icons/ri";

import { Button } from "./button";

export const DirectionButton = () => {
  const [direction, setDirection] = useMdeDirection();

  const nextDir = direction === "rtl" ? "ltr" : "rtl";

  return (
    <Button className="p-0" onClick={() => setDirection(nextDir)}>
      <RiTextDirectionR
        className={cn("absolute left-0 top-0 size-full p-3", nextDir === "ltr" ? "translate-y-full" : "translate-y-0")}
      />
      <RiTextDirectionL
        className={cn("absolute left-0 top-0 size-full p-3", nextDir === "rtl" ? "-translate-y-full" : "translate-y-0")}
      />
    </Button>
  );
};
