import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type MdeDirectionTypes = "ltr" | "rtl";

const mdeDirectionAtom = atomWithStorage<MdeDirectionTypes>("mdeDirection", "ltr", undefined, { getOnInit: true });

export const useMdeDirection = () => useAtom(mdeDirectionAtom);
