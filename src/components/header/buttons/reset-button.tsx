import { defaultMarkdownContent } from "@/mde/lib";
import { useMdeContent, useMdeDirection, useMdeView } from "@/mde/stores";
import { RiRestartLine } from "react-icons/ri";

import { Button } from "./button";

export const ResetButton = () => {
  const [content, setContent] = useMdeContent();
  const [direction, setDirection] = useMdeDirection();
  const [editorView, setEditorView] = useMdeView();

  const resetApp = () => {
    if (content !== defaultMarkdownContent) setContent(defaultMarkdownContent);
    if (direction !== "ltr") setDirection("ltr");
    if (editorView !== "both") setEditorView("both");
  };

  return (
    <Button onClick={resetApp}>
      <RiRestartLine className="size-full rotate-45 -scale-x-100" />
    </Button>
  );
};
