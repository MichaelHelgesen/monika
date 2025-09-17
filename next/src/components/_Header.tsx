import { MainMenu } from "@/components/MainMenu"
import Link from "next/link"

export default function Header() {

  return (
    <header className="w-full border-b shadow-sm bg-[#1f2623]">
      <div className="mx-auto px-4 py-6 text-center">
        {/* Logoen vises bare hvis vi ikke er på forsiden */}
        {(<Link href="/" className="text-3xl font-bold tracking-tight block mb-2">
            Monika Helgesens
          </Link>
        )}

        {/* Navigasjonsmeny */}
        <MainMenu />
      </div>
    </header>
  );
}
