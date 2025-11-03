"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  titleMap?: Record<string, string>; // valgfri mapping fra slug → pen tittel
}

export default function Breadcrumbs({ titleMap = {} }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Hvis vi er på hjem-siden, vis ingenting
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (

<div className="py-3 px-4 bg-[#2e3b37]">
    <nav className="text-sm text-gray-400 flex gap-2" aria-label="Breadcrumb">
      <Link href="/" className="hover:underline">
        Hjem
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = titleMap[segment] || decodeURIComponent(segment.replace(/-/g, " "));

        return (
          <span key={href} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? (
              <span className="text-gray-200">{label}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
    </div>
  );
}

