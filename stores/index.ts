import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { defaultMarkdownContent } from "@/lib/constants";

export type MdeView = "both" | "editor" | "preview";

export type MdeDirection = "ltr" | "rtl";

const mdeViewAtom = atomWithStorage<MdeView>("mdeView", "both", undefined, { getOnInit: true });
const mdeContentAtom = atomWithStorage<string>("mdeContent", defaultMarkdownContent, undefined, { getOnInit: true });
const mdeDirectionAtom = atomWithStorage<MdeDirection>("mdeDirection", "ltr", undefined, { getOnInit: true });

export const useMdeView = () => useAtom(mdeViewAtom);
export const useMdeContent = () => useAtom(mdeContentAtom);
export const useMdeDirection = () => useAtom(mdeDirectionAtom);

export const useMdeContentValue = () => useAtomValue(mdeContentAtom);
export const useMdeDirectionValue = () => useAtomValue(mdeDirectionAtom);
