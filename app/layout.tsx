import "./globals.css";

import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "next-themes";
import { Vazirmatn } from "next/font/google";

import { ContentProvider } from "./_contexts/content-context";
import { DirectionProvider } from "./_contexts/direction-context";
import { EditorViewProvider } from "./_contexts/editor-view-context";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "A simple Online Markdown editor",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000" },
    { media: "(prefers-color-scheme: light)", color: "#FFF" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white font-sans text-black antialiased dark:bg-black dark:text-white ${vazirmatn.variable}`}>
        <ThemeProvider>
          <EditorViewProvider>
            <DirectionProvider>
              <ContentProvider>{children}</ContentProvider>
            </DirectionProvider>
          </EditorViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
