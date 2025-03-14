import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletAdapter";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppWalletProvider>
            <NavBar />
            {children}
            <Toaster />
          </AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
