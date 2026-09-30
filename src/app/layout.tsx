import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0EA5E9",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://satr.tech'),
  title: "SATR — Built from the first line",
  description: "SATR designs and engineers websites, mobile apps, SaaS platforms, custom software, and AI for ambitious companies.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "SATR — Built from the first line",
    description: "One partner. Every digital layer. SATR designs, builds and scales websites, mobile apps, SaaS, and AI systems.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SATR — Built from the first line",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SATR — Built from the first line",
    description: "One partner. Every digital layer. SATR designs, builds and scales websites, mobile apps, SaaS, and AI systems.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased selection:bg-[#BAE6FD] selection:text-[#0C4A6E]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
