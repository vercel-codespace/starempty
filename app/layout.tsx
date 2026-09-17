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
  title: "NOVA Select | Design for Everyday Life",
  description: "Discover independent style, homeware, tech and lifestyle pieces selected for better everyday living.",
  openGraph: {
    title: "NOVA Select | Design for Everyday Life",
    description: "Make every day your own with design-led pieces selected for real life.",
    images: [{ url: "/og.png", width: 1733, height: 908, alt: "NOVA Select" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA Select | Design for Everyday Life",
    description: "Make every day your own with design-led pieces selected for real life.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleAnalytics gaId="G-RGDGHXDW4L" />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
