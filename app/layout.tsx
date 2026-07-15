import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figma-code-connect-guide.diousk507.chatgpt.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Figma Library × Code Connect 權限圖解",
  description: "用清楚圖解理解 Figma Team、Project、Seat、Library、PAT 與 Code Connect CLI 的權限關係。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Figma Library × Code Connect 權限圖解",
    description: "Seat、檔案權限、Library 與 PAT，一次分清楚。",
    type: "website",
    images: [{ url: `${basePath}/og.png`, width: 1680, height: 941, alt: "Figma Library 與 Code Connect 權限圖解" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figma Library × Code Connect 權限圖解",
    description: "Seat、檔案權限、Library 與 PAT，一次分清楚。",
    images: [`${basePath}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
