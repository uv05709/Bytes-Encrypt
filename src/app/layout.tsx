import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BytesEncrypt Technologies — Offensive Security & Assurance",
  description:
    "BytesEncrypt Technologies — VAPT, red teaming, secure code review, cloud security and cyber risk advisory for enterprises.",
  openGraph: {
    title: "BytesEncrypt Technologies — Offensive Security & Assurance",
    description:
      "BytesEncrypt Technologies — VAPT, red teaming, secure code review, cloud security and cyber risk advisory for enterprises.",
    url: "https://bytesencrypt.com",
    siteName: "BytesEncrypt Technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-display)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
