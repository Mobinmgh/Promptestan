import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://promptestan.com"),
  title: {
    default: "Promptestan | پرامپتستان",
    template: "%s | پرامپتستان",
  },
  description:
    "پرامپتستان گالری پرامپت‌های آماده و تست‌شده برای ساخت تصاویر حرفه‌ای با هوش مصنوعی است.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
