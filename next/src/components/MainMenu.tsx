
// components/MainMenu.tsx

import Link from "next/link"
import { getMenuPages } from "@/lib/sanity"

export async function MainMenu() {
  const pages = await getMenuPages()

  return (
    <nav className="flex gap-6 text-lg font-medium">
      {pages.map((page) => (
        <Link key={page.slug} href={`/${page.slug}`}>
          {page.menuTitle || page.title}
        </Link>
      ))}
    </nav>
  )
}
