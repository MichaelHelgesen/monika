
// components/MainMenu.tsx

import Link from "next/link"
import { getMenuPages, Page } from "@/lib/sanity"

export async function MainMenu() {
  const pages: Page[] = await getMenuPages()

  return (
    <nav className="flex flex-wrap justify-center gap-6 text-lg font-medium">

        <Link key="hjem" href="/">
          Hjem
        </Link>
      {pages.map((page) => (
        <Link key={page.slug} href={`/${page.slug}`}>
          {page.menuTitle || page.title}
        </Link>
      ))}
    </nav>
  )
}
