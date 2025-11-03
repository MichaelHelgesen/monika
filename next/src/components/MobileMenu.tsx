"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { montserrat, greatVibes } from "@/app/layout";
type MenuItem = {
  title: string;
  slug: string;
  children?: MenuItem[];
};

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuItems: MenuItem[];
}

export default function MobileMenu({ menuOpen, setMenuOpen, menuItems }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`peis fixed top-0 right-0 h-full w-64 bg-[#1f2623] z-20 transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className={`text-xl ${greatVibes.className}`}>Meny</span>
        <button onClick={() => setMenuOpen(false)} aria-label="Lukk meny">
          ✕
        </button>
      </div>

      <div className="p-4">
        {menuItems.map((item) => (
          <MobileMenuItem
            key={item.slug}
            item={item}
            level={0}
            pathname={pathname}
            setMenuOpen={setMenuOpen}
          />
        ))}
      </div>
    </div>
  );
}

function MobileMenuItem({
  item,
  level,
  pathname,
  setMenuOpen,
}: {
  item: MenuItem;
  level: number;
  pathname: string;
  setMenuOpen: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);

  // Sjekker om denne lenken eller noen under er aktiv
  const isActive = pathname.startsWith(`/${item.slug}`);
  console.log(item.slug)

  return (
    <div className={`mb-2`}>
      <div className="flex justify-between items-center">
        <a
          href={`/${item.slug}`}
          className={`block w-full pl-${level * 4} text-base transition-colors duration-300
            ${isActive ? "text-[var(--accent)] font-semibold" : "text-[#f0ead8] hover:text-[var(--accent)]"}
          `}
          onClick={() => setMenuOpen(false)}
        >
          {item.title}
        </a>
        {item.children && (
          <button
            onClick={() => setOpen(!open)}
            className="text-[var(--accent)] ml-2"
            aria-label="Åpne undermeny"
          >
            {open ? "−" : "+"}
          </button>
        )}
      </div>

      {/* Submeny */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-1" : "max-h-0"
        }`}
      >
        {item.children &&
          item.children.map((child) => (
            <MobileMenuItem
              key={child.slug}
              item={child}
              level={level + 1}
              pathname={pathname}
              setMenuOpen={setMenuOpen}
            />
          ))}
      </div>
    </div>
  );
}

