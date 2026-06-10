import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIRST READER Writing Desk",
  description: "Interactive writing workspace with draggable concept cards.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
