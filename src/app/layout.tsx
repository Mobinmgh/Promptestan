import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const vazirmatn = localFont({
  variable: "--font-vazirmatn",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirmatn/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirmatn/Vazirmatn-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/vazirmatn/Vazirmatn-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptestan.com"),
  title: {
    default: "Promptestan | پرامپتستان",
    template: "%s | پرامپتستان",
  },
  description:
    "پرامپتستان گالری پرامپت‌های آماده و تست‌شده برای ساخت تصاویر حرفه‌ای با هوش مصنوعی است.",
  openGraph: {
    title: "Promptestan | پرامپتستان",
    description:
      "پرامپت‌های آماده برای ساخت عکس محصول، تبلیغات اینستاگرام، کاتالوگ، برندینگ و تصاویر حرفه‌ای با هوش مصنوعی.",
    siteName: "پرامپتستان",
    locale: "fa_IR",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.variable}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
