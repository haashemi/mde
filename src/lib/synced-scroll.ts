const elements = new Set<HTMLElement>();
// Scrolls set by the sync itself, so they aren't echoed back to the element that started them.
const syncing = new WeakSet<HTMLElement>();

const scrollRatio = (element: HTMLElement) => {
  const max = element.scrollHeight - element.clientHeight;
  return max > 0 ? element.scrollTop / max : 0;
};

const onScroll = (event: Event) => {
  const source = event.currentTarget as HTMLElement;
  if (syncing.delete(source)) return;

  const ratio = scrollRatio(source);

  for (const target of elements) {
    if (target === source) continue;

    // Hidden panels have nothing to scroll, and an unchanged position fires no scroll event to clear the flag.
    const next = Math.round(ratio * (target.scrollHeight - target.clientHeight));
    if (Math.abs(target.scrollTop - next) < 1) continue;

    syncing.add(target);
    target.scrollTop = next;
  }
};

/** A ref callback that keeps every element using it scrolled to the same relative position. */
export const syncedScrollRef = (element: HTMLElement | null) => {
  if (!element) return;

  elements.add(element);
  element.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    elements.delete(element);
    element.removeEventListener("scroll", onScroll);
  };
};
