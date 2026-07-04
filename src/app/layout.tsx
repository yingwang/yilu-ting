import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { withBasePath } from "@/lib/assetPath";

export const metadata: Metadata = {
  title: "一路听",
  description: "你的中文旅行语音导览",
  manifest: withBasePath("/manifest.webmanifest"),
  icons: {
    icon: [
      { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
      { url: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" }
    ],
    apple: withBasePath("/apple-touch-icon.png")
  },
  appleWebApp: {
    capable: true,
    title: "一路听",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#526459",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto min-h-screen w-full max-w-3xl bg-paper/80 shadow-soft">
          <main className="safe-bottom min-h-screen">{children}</main>
          <BottomNav />
        </div>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
