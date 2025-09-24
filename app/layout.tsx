import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A modern developer portfolio showcasing Gregg Marayan's projects and skills",
  icons: {
    icon: 
    [
      {
        media: '(prefers-color-scheme: light)',
        url: 'https://img.icons8.com/ios-filled/100/program.png',
        href: 'https://img.icons8.com/ios-filled/100/program.png'
      },

      {
        media: '(prefers-color-scheme: dark)',
        url: 'https://img.icons8.com/ios/100/program.png',
        href: 'https://img.icons8.com/ios/100/program.png'
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
