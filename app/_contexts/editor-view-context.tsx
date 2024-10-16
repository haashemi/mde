"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type View = "both" | "editor" | "preview";

interface EditorView {
  view: View;
  setEditorView: (dir: View) => void;
}

export const EditorViewContext = createContext<EditorView>({ view: "both", setEditorView: () => null });

export const useEditorView = () => useContext(EditorViewContext);

export const EditorViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setEditorView] = useState<View>("both");

  // Update the state and save it to localStorage
  const setAndStoreEditorView = (newView: View) => {
    setEditorView(newView);
    localStorage.setItem("editor-view", newView);
  };

  // Load the stored editor view from localStorage
  useEffect(() => {
    const storedView = localStorage.getItem("editor-view");
    if (storedView && ["both", "editor", "preview"].includes(storedView)) setEditorView(storedView as View);
  }, []);

  const value = useMemo(() => ({ view, setEditorView: setAndStoreEditorView }), [view]);

  return <EditorViewContext.Provider value={value}>{children}</EditorViewContext.Provider>;
};
