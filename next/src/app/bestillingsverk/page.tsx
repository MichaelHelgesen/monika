// app/malekurs/page.tsx

import { getPageBySlug } from "@/lib/sanity"
import { PortableText } from "@/components/PortableText"
import { notFound } from "next/navigation"

export default async function BestillingsverkPage() {
  const page = await getPageBySlug("bestillingsverk")

  if (!page) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <PortableText value={page.content} />
    </main>
  )
}
