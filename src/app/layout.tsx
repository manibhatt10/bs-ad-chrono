import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Miti Converter — AD ↔ BS Date Converter | मिति रूपान्तरक",
  description:
    "Convert dates between Gregorian (AD) and Bikram Sambat (BS) calendars instantly. Supports dates from 1970 BS to 2100 BS with day-of-week calculation and Nepali festival events.",
  keywords: [
    "Nepali date converter",
    "AD to BS",
    "BS to AD",
    "Bikram Sambat",
    "Nepali calendar",
    "मिति रूपान्तरक",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
