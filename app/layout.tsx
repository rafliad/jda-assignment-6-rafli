// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/global.css";
// Import provider yang baru kita buat
import { StoreProvider } from "./lib/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bungkus seluruh aplikasi dengan StoreProvider */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
