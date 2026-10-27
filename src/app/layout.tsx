import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "SignalWard | Independent Scam Evidence Review",
  description: "A cognitive triage agent for scam-resistant decisions.",
  icons: {
    icon: "/signalward-icon.svg",
    shortcut: "/signalward-icon.svg",
    apple: "/signalward-icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}<SiteFooter /></LanguageProvider>
      </body>
    </html>
  );
}
