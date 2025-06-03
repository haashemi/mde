import { RiLayoutColumnFill, RiLayoutColumnLine } from "react-icons/ri";

import { useMdeDirection, useMdeView } from "@/mde/stores";

import { Button } from "./button";

export const EditorViewButtons = () => {
  const [direction] = useMdeDirection();
  const [view, setEditorView] = useMdeView();

  return (
    <div dir={direction} className="flex h-full ">
      <Button disabled={view === "editor"} onClick={() => setEditorView("editor")}>
        <RiLayoutColumnFill className="size-full rotate-90 -scale-100 lg:rotate-0" />
      </Button>
      <Button disabled={view === "both"} onClick={() => setEditorView("both")}>
        <RiLayoutColumnLine className="size-full rotate-90 lg:rotate-0" />
      </Button>
      <Button disabled={view === "preview"} onClick={() => setEditorView("preview")}>
        <RiLayoutColumnFill className="size-full rotate-90 lg:rotate-0" />
      </Button>
    </div>
  );
};
