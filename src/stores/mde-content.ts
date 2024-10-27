import { defaultMarkdownContent } from "@/mde/lib";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const mdeContentAtom = atomWithStorage<string>("mdeContent", defaultMarkdownContent, undefined, { getOnInit: true });

export const useMdeContent = () => useAtom(mdeContentAtom);
