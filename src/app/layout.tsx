import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import CustomScrollIndicator from "@/components/CustomScrollIndicator";
import OfflineOverlay from "@/components/OfflineOverlay";

export const metadata: Metadata = {
  title: "Blesson Portfolio",
  description: "A high-energy, cyber-minimalist portfolio",
  icons: {
    icon: '/logo/logo-portfolio.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-black text-white" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <OfflineOverlay />
        <CustomScrollIndicator />
        <Preloader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
