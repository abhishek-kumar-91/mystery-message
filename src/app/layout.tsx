import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Messages | Anonymous",
  description: "Give the anonymous feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <AuthProvider>
      <body className={inter.className}>
        {children}
      <Toaster />
      </body>
      </AuthProvider>
    </html>
  );
}