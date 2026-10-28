import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://gakuchikanavi.vercel.app"),
  title: "ガクチカナビ｜AIがあなたに最適なガクチカを提案",
  description: "強み×志望業界×職種から、選考で評価されるガクチカをAIが3分で提案。学年に合わせて今から作れるガクチカが見つかる、新卒就活生向けの無料サービス。",
  openGraph: {
    title: "ガクチカナビ｜AIがあなたに最適なガクチカを提案",
    description: "強み×志望業界×職種から、選考で評価されるガクチカをAIが3分で提案。新卒就活生向けの無料サービス。",
    url: "https://gakuchikanavi.vercel.app",
    siteName: "ガクチカナビ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ガクチカナビ｜AIがあなたに最適なガクチカを提案",
    description: "強み×志望業界×職種から、選考で評価されるガクチカをAIが3分で提案。新卒就活生向けの無料サービス。",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'YuGothic', Meiryo, sans-serif" }}>
        <div className="pb-16">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
