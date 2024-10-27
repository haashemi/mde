import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";

import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./App";

// const vazirmatn = Vazirmatn({
//   subsets: ["arabic", "latin", "latin-ext"],
//   variable: "--font-vazirmatn",
//   display: "swap",
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
