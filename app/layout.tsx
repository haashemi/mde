import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { ThemeProvider } from "next-themes";

import cn from "@/app/_lib/cn";

const inter = Inter({ variable: "--font-inter" });
const vazirmatn = Vazirmatn({ variable: "--font-vazirmatn" });

export const metadata: Metadata = {
  title: "Minimal Markdown Editor",
  description: "A simple and minimal Online Markdown editor",
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
    <html lang="en">
      <body
        className={cn(
          "bg-white font-sans text-black antialiased dark:bg-black dark:text-white",
          inter.variable,
          vazirmatn.variable,
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
