import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const bizUDP = BIZ_UDPGothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-biz-udp",
});

export const metadata: Metadata = {
  title: "ガクチカナビ",
  description: "AIがあなたに最適なガクチカを提案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={bizUDP.variable}>
      <body style={{ fontFamily: "var(--font-biz-udp), 'Hiragino Kaku Gothic ProN', 'Yu Gothic', Meiryo, sans-serif" }}>
        <div className="pb-16">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
