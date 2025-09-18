import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Abhinav Pillai - Portfolio",
  description: "My personal site to showcase my developer work and opinions.",
  metadataBase: new URL("https://navpil.dev"),

  openGraph: {
    title: "Abhinav Pillai - Portfolio",
    description: "My personal site to showcase my developer work and opinions.",
    url: "https://navpil.dev",
    siteName: "Abhinav Pillai Portfolio",
    images: [
      {
        url: "/navpil-com.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Pillai - Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Favicon
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <Header />
          <div className="mx-auto flex max-w-3xl flex-col px-8">
            <main className="grow">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
