import type { ComponentProps, ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const HeaderTooltip = ({
  label,
  shortcut,
  children,
}: {
  label: string;
  shortcut?: string;
  children: ReactElement;
}) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipContent side="bottom">
      {label}
      {shortcut && <Kbd>{shortcut}</Kbd>}
    </TooltipContent>
  </Tooltip>
);

/** A full-height header cell. */
export const HeaderButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="ghost" className="h-full min-w-11 px-3" {...props} />
);
