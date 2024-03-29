import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import "@radix-ui/themes/styles.css";
//import { Theme } from "@radix-ui/themes";

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
        <div className=" p-3 bg-blue-600/70 w-screen">
          <ul className="flex gap-4">
            <li className="text-white">
              <a href="/">ホーム</a>
            </li>
            <li className="text-white">
              <a href="/history">チャート</a>
            </li>
            <li className="text-white">
              <a href="/bought">購入履歴</a>
            </li>
          </ul>
        </div>
        {children}
      </body>
    </html>
  );
}
