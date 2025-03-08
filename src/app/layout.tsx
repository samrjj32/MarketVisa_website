import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Toaster } from 'react-hot-toast';
import MarqueeBanner from "@/components/common/MarqueeBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketVisa",
  description: "Transform your financial future with expert-led courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={inter.className}>
      <MarqueeBanner />
        <main className="min-h-screen pt-1">
          {children}
        </main>
       
        {/* <Footer /> */}
        <Header />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
