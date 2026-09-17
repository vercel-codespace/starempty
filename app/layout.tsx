import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-select-life.sound-charm-7867.chatgpt.site"),
  title: "NOVA 诺瓦生活｜设计好物商城",
  description: "发现服装、家居、数码与生活方式好物，把日常过成喜欢的样子。",
  openGraph: {
    title: "NOVA 诺瓦生活｜设计好物商城",
    description: "把日常，过成喜欢的样子。发现值得长期相伴的设计好物。",
    images: [{ url: "/og.png", width: 1733, height: 908, alt: "NOVA 诺瓦生活" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA 诺瓦生活｜设计好物商城",
    description: "把日常，过成喜欢的样子。发现值得长期相伴的设计好物。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleAnalytics gaId="G-RGDGHXDW4L" />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
