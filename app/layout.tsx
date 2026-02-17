import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stock Market Dashboard - Real-time Stock Data & Analytics",
  description: "Track real-time stock prices, view historical data, and analyze financial metrics for top companies. Powered by Alpha Vantage API with interactive charts and multiple view modes.",
  keywords: ["stocks", "stock market", "financial data", "stock prices", "market analytics", "Alpha Vantage"],
  authors: [{ name: "Stock Dashboard" }],
  openGraph: {
    title: "Stock Market Dashboard",
    description: "Real-time stock data and analytics with interactive charts",
    type: "website",
    locale: "en_US",
    siteName: "Stock Market Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Market Dashboard",
    description: "Real-time stock data and analytics with interactive charts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
