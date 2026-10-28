"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ACTIVE = "#0A3059";
const INACTIVE = "#9aa5b1";

const tabs = [
  {
    href: "/",
    label: "診断",
    icon: (c: string) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={c}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    href: "/search",
    label: "企業検索",
    icon: (c: string) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={c}>
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z" />
      </svg>
    ),
  },
  {
    href: "/examples",
    label: "みんな",
    icon: (c: string) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={c}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    href: "/scout",
    label: "スカウト",
    icon: (c: string) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={c}>
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    href: "/mypage",
    label: "マイページ",
    icon: (c: string) => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill={c}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const hidden = ["/quiz", "/target", "/result", "/start", "/build"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-0.5 w-16 pt-1">
              {tab.icon(active ? ACTIVE : INACTIVE)}
              <span className={`text-[11px] ${active ? "text-[#0A3059] font-bold" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
