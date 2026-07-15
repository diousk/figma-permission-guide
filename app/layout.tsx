import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  return {
    title: "Figma Library × Code Connect 權限圖解",
    description: "用清楚圖解理解 Figma Team、Project、Seat、Library、PAT 與 Code Connect CLI 的權限關係。",
    metadataBase: new URL(`${protocol}://${host}`),
    openGraph: {
      title: "Figma Library × Code Connect 權限圖解",
      description: "Seat、檔案權限、Library 與 PAT，一次分清楚。",
      type: "website",
      images: [{ url: "/og.png", width: 1680, height: 941, alt: "Figma Library 與 Code Connect 權限圖解" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Figma Library × Code Connect 權限圖解",
      description: "Seat、檔案權限、Library 與 PAT，一次分清楚。",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
