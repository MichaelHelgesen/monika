import Link from "next/link"
export default function Footer() {
  return (
      <footer className="bg-[#1f2623] text-center py-8 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Monika Helgesen</p>
        <p className="mt-2">
          <Link href="/kontakt" className="underline hover:text-white">
            Ta kontakt
          </Link>
        </p>
      </footer>
  )
}
