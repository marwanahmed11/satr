import type { Metadata } from "next";
import { Geist, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SATR — Built from the first line",
  description: "SATR designs and engineers websites, mobile apps, SaaS platforms, custom software and AI for ambitious companies.",
  openGraph: {
    title: "SATR — Built from the first line",
    description: "One partner. Every digital layer. SATR designs, builds and scales websites, mobile apps, SaaS, and AI systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${ibmArabic.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-[#BAE6FD] selection:text-[#0C4A6E]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
