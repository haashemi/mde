import "./index.css";

import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TooltipProvider } from "@/components/ui/tooltip";

import App from "./app";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <TooltipProvider delay={400}>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
