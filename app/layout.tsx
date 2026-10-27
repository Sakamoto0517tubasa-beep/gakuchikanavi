import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "ガクチカナビ",
  description: "AIがあなたに最適なガクチカを提案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
        <div className="pb-16">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
