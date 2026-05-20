import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "PFOS",
  description: "个人财务操作系统 — 资金事件流与状态记录",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PFOS",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f5f5f5" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-lg font-light md:text-base">
        {children}
      </body>
    </html>
  );
}
