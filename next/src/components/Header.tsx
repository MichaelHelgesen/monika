import { MainMenu } from "@/components/MainMenu"
import Link from "next/link"

export default function Header() {
  return (
<header className="w-full border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        {/* Navn/logo */}
        <Link href="/" className="text-3xl font-bold tracking-tight block mb-2">
          Monika Helgesen
        </Link>

        {/* Navigasjonsmeny */}
        <MainMenu />
      </div>
    </header>
  )
}
