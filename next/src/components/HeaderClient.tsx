// components/Header/HeaderClient.tsx
'use client';
import { useState } from "react";
import { montserrat, greatVibes } from "@/app/layout";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Page = {
  title: string;
  slug: {
    current: string;
  };
};

export default function HeaderClient({ pages }: { pages: Page[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full border-b shadow-sm bg-[#1f2623] text-white z-19">
      <div className="px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-3xl tracking-tight ${greatVibes.className}`}
        >
          Monika Helgesen
        </Link>

        {/* Desktopmeny */}
        <nav className="hidden md:flex flex-wrap justify-center gap-6 text-md font-medium">
          {pages.map((page) => (
            <Link
              key={page.slug.current}
              className={`${montserrat.className}`}
              href={`/${page.slug.current}`}
            >
              {page.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobilmeny-knapp */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Åpne meny"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Handlekurv */}
          <button className="snipcart-checkout flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 
                  1.087.835l.383 1.437m0 
                  0L6.75 14.25h10.5l1.644-8.978a1.125 
                  1.125 0 00-1.106-1.322H5.106m0 
                  0L4.5 6.75m2.25 14.25a1.5 1.5 0 
                  100-3 1.5 1.5 0 000 3zm10.5 0a1.5 
                  1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
{/* Tekst-info – kun på større skjermer */}
  <span className="hidden sm:flex items-center gap-1 text-sm">
    <span className="snipcart-items-count">0</span> stk (
    <span className="snipcart-total-price">0,00 kr</span>)
  </span>

  {/* Kun antall – på mobil */}
  <span className="sm:hidden snipcart-items-count text-sm bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
    0
  </span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-15"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in meny */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1f2623] z-19 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className={`text-xl ${greatVibes.className}`}>
            Meny
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Lukk meny">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-lg">
          {pages.map((page) => (
            <Link
              key={page.slug.current}
              className={`${montserrat.className}`}
              href={`/${page.slug.current}`}
              onClick={() => setMenuOpen(false)}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
