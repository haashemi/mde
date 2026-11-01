import { useAtom, useAtomValue, useStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { defaultMarkdownContent } from "@/lib/default-content";

export type MdeView = "both" | "editor" | "preview";

export type MdeDirection = "ltr" | "rtl";

export type MdeFontSize = "large" | "larger" | "medium" | "small";

const mdeViewAtom = atomWithStorage<MdeView>("mdeView", "both", undefined, { getOnInit: true });
const mdeContentAtom = atomWithStorage<string>("mdeContent", defaultMarkdownContent, undefined, { getOnInit: true });
const mdeDirectionAtom = atomWithStorage<MdeDirection>("mdeDirection", "ltr", undefined, { getOnInit: true });
const mdePreviewFontAtom = atomWithStorage<string>("mdePreviewFont", "default", undefined, { getOnInit: true });
const mdeFontSizeAtom = atomWithStorage<MdeFontSize>("mdeFontSize", "medium", undefined, { getOnInit: true });

export const useMdeView = () => useAtom(mdeViewAtom);
export const useMdeContent = () => useAtom(mdeContentAtom);
export const useMdeDirection = () => useAtom(mdeDirectionAtom);
export const useMdePreviewFont = () => useAtom(mdePreviewFontAtom);
export const useMdeFontSize = () => useAtom(mdeFontSizeAtom);

export const useMdeContentValue = () => useAtomValue(mdeContentAtom);
export const useMdeDirectionValue = () => useAtomValue(mdeDirectionAtom);
export const useMdePreviewFontValue = () => useAtomValue(mdePreviewFontAtom);
export const useMdeFontSizeValue = () => useAtomValue(mdeFontSizeAtom);

/** Reads the content on demand, without re-rendering the caller on every keystroke. */
export const useGetMdeContent = () => {
  const store = useStore();
  return () => store.get(mdeContentAtom);
};
