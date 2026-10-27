"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "診断",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
        <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/search",
    label: "企業検索",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
        <path d="M16.5 16.5L21 21" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/scout",
    label: "スカウト",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
        <path d="M2 8l10 7 10-7" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/mypage",
    label: "マイページ",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
        <circle cx="12" cy="10" r="3" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" />
        <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={active ? "#1A1A2E" : "#aaa"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // クイズ・診断フロー中は非表示
  const hidden = ["/quiz", "/target", "/result", "/start"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-4">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 w-16">
              {tab.icon(active)}
              <span className={`text-xs ${active ? "text-[#1A1A2E] font-medium" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
