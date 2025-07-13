import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ProgramProvider } from "@/lib/providers/program-provider";
import { ProtocolProvider } from "@/lib/providers/protocol-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CKB UDT Staking",
  description: "Stake your UDT tokens and earn rewards on Nervos CKB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProtocolProvider>
          <ProgramProvider>
            {children}
            <Toaster />
          </ProgramProvider>
        </ProtocolProvider>
      </body>
    </html>
  );
}