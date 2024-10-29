import { defaultMarkdownContent } from "@/mde/lib";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type MdeViewTypes = "both" | "editor" | "preview";

type MdeDirectionTypes = "ltr" | "rtl";

const mdeViewAtom = atomWithStorage<MdeViewTypes>("mdeView", "both", undefined, { getOnInit: true });
const mdeContentAtom = atomWithStorage<string>("mdeContent", defaultMarkdownContent, undefined, { getOnInit: true });
const mdeDirectionAtom = atomWithStorage<MdeDirectionTypes>("mdeDirection", "ltr", undefined, { getOnInit: true });

export const useMdeView = () => useAtom(mdeViewAtom);
export const useMdeContent = () => useAtom(mdeContentAtom);
export const useMdeDirection = () => useAtom(mdeDirectionAtom);
