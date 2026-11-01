import "./index.css";

import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { registerServiceWorker } from "@/lib/pwa";

import App from "./app";

registerServiceWorker();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <TooltipProvider delay={250}>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
