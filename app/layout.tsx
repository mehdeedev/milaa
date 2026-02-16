import type { Metadata } from "next";
import "./globals.css";

import { yekan } from "@/lib/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Milaa App",
  description: "Milaa Shop Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body dir="rtl" className={yekan.className}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
