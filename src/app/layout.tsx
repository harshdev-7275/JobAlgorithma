import type { Metadata } from "next";
import {ABeeZee} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/lib/providers";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = ABeeZee({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: "400",
})

export const metadata: Metadata = {
  title: "JobAlgorithma",
  description: "Focusing on job placement through algorithmic learning.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.variable} antialiased bg-white text-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
