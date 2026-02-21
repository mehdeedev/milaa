import type { Metadata } from "next";
import "./globals.css";

import { pinar, yekan } from "@/lib/fonts";
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
    <html lang="fa" className={`${yekan.variable} ${pinar.variable}`}>
      <body dir="rtl" className="font-yekan">
        {children}

        <Toaster />
      </body>
    </html>
  );
}
