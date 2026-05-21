import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Conviq — Platform Customer Support Bertenaga AI, Open-Source",
    template: "%s | Conviq",
  },
  description:
    "Conviq adalah platform customer support open-source bertenaga AI. Self-host di infrastruktur Anda atau gunakan cloud kami. Kelola percakapan dari Live Chat, Email, WhatsApp, Instagram, Facebook, dan lainnya dalam satu dashboard.",
  keywords: [
    "customer support",
    "helpdesk",
    "live chat",
    "open source",
    "AI",
    "omnichannel",
    "WhatsApp",
    "Indonesia",
  ],
  openGraph: {
    title: "Conviq — Platform Customer Support Bertenaga AI",
    description:
      "Platform customer support open-source bertenaga AI untuk bisnis modern Indonesia.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased bg-white text-secondary">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
