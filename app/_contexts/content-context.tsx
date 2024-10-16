"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { defaultMarkdownContent } from "@/app/_lib/constants";

interface Content {
  content: string;
  setContent: (content: string) => void;
}

export const ContentContext = createContext<Content>({ content: defaultMarkdownContent, setContent: () => null });

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<string>(defaultMarkdownContent);

  // Update the state and save it to localStorage
  const setAndStoreContent = (newContent: string) => {
    setContent(newContent);
    localStorage.setItem("editor-content", newContent);
  };

  // Load the stored content from localStorage
  useEffect(() => {
    const storedContent = localStorage.getItem("editor-content");
    if (storedContent) setContent(storedContent);
  }, []);

  const value = useMemo(() => ({ content, setContent: setAndStoreContent }), [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
