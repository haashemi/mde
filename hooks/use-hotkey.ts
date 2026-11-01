import { useEffect, useEffectEvent } from "react";

export const isModKey = (event: KeyboardEvent) => event.metaKey || event.ctrlKey;

/** Calls `onTrigger` (and prevents the browser default) for every keydown that `matches`. */
export const useHotkey = (matches: (event: KeyboardEvent) => boolean, onTrigger: (event: KeyboardEvent) => void) => {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!matches(event)) return;

    event.preventDefault();
    onTrigger(event);
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};
