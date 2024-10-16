"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Dir = "ltr" | "rtl";

interface Direction {
  direction: Dir;
  setDirection: (dir: Dir) => void;
}

export const DirectionContext = createContext<Direction>({ direction: "ltr", setDirection: () => null });

export const useDirection = () => useContext(DirectionContext);

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const [direction, setDirection] = useState<Dir>("ltr");

  // Update the state and save it to localStorage
  const setAndStoreDirection = (dir: Dir) => {
    setDirection(dir);
    localStorage.setItem("editor-direction", dir);
  };

  // Load the stored direction from localStorage
  useEffect(() => {
    const storedDir = localStorage.getItem("editor-direction");
    if (storedDir && ["ltr", "rtl"].includes(storedDir)) setDirection(storedDir as Dir);
  }, []);

  const value = useMemo(() => ({ direction, setDirection: setAndStoreDirection }), [direction]);

  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
};
