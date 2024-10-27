import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type MdeViewTypes = "both" | "editor" | "preview";

const mdeViewAtom = atomWithStorage<MdeViewTypes>("mdeView", "both", undefined, { getOnInit: true });

export const useMdeView = () => useAtom(mdeViewAtom);
