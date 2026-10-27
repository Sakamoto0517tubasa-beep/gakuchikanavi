"use client";

import { useState } from "react";
import { companyDomains, logoUrl } from "@/lib/companyDomains";

const CAT_COLORS: Record<string, string> = {
  "メーカー": "#C0652B", "IT": "#0068B7", "商社": "#8A6D3B", "金融": "#2E7D32",
  "コンサル": "#5E35B1", "広告・メディア": "#C2185B", "流通・小売": "#00838F",
  "インフラ": "#455A64", "航空・観光": "#0277BD", "その他": "#607D8B",
};

export default function CompanyLogo({
  name,
  category,
  size = 44,
}: {
  name: string;
  category: string;
  size?: number;
}) {
  const domain = companyDomains[name];
  const [failed, setFailed] = useState(false);

  if (domain && !failed) {
    return (
      <span
        className="rounded shrink-0 flex items-center justify-center bg-white border border-gray-200 overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl(domain)}
          alt=""
          loading="lazy"
          width={size - 14}
          height={size - 14}
          onError={() => setFailed(true)}
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className="rounded shrink-0 flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, backgroundColor: CAT_COLORS[category] ?? "#607D8B", fontSize: size * 0.4 }}
    >
      {name.charAt(0)}
    </span>
  );
}
