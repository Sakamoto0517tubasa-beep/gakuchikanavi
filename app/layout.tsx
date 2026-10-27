import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ガクチカナビ",
  description: "AIがあなたに最適なガクチカを提案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif" }}>
        <div className="pb-16">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
