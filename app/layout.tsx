import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Providers } from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jin Warta",
  description: "Jin Warta is a free and open source app for managing your contributions, expenses, resolutions and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className='dark'>
        <body
          className={`${notoSans.variable} antialiased`}
        >
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
