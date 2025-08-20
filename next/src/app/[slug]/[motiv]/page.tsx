// app/[slug]/[motiv]/page.tsx

import { sanityClient } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string
    motiv: string
  }>;
};

export async function generateStaticParams() {
  // Hent alle pages som har artForm
  const pages = await sanityClient.fetch(`
    *[_type == "page" && defined(artForm)]{
      "slug": slug.current,
      "artFormId": artForm->_id
    }
  `)

  const allRoutes = []

  // For hver page, hent artworks som matcher artForm og samle deres motiv
  for (const page of pages) {
    const artworks = await sanityClient.fetch(
      `*[_type == "artwork" && workType._ref == $artFormId && defined(category)]{
        "motiv": lower(category->Tittel),
        "description": category->description
      }`,
      { artFormId: page.artFormId }
    )

    const motiver = Array.from(
      new Set(artworks.map((art: {motiv:string}) => art.motiv))
    )

    for (const motiv of motiver) {
      allRoutes.push({
        slug: page.slug,
        motiv
      })
    }
  }

  return allRoutes
}
export default async function MotivPage({ params }: Props) {
  const { slug, motiv } = await params

  // Hent siden for å finne riktig artForm
  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      artForm->{
        _id,
        Tittel
      }
    }`,
    { slug }
  )
  if (!page?.artForm?._id) return notFound()

  // Hent alle artworks som matcher både artForm og motiv
  const artworks = await sanityClient.fetch(
    `*[_type == "artwork" && workType._ref == $artFormId && lower(category->Tittel) == $motiv]{
      title,
      year,
      price,
      avaliable,
      slug,
      image{
        asset->{
            _id,
            url
        }
      },
      description,
      category->{
        description
      }
    }`,
    {
      artFormId: page.artForm._id,
      motiv
    }
  )
  if (!artworks.length) return notFound()

  return (
<main className="px-4 py-8">
  <h1 className="text-2xl font-bold text-center mb-2">Motiv: {motiv}</h1>
  <p className="mb-2 text-center">{artworks[0]?.category?.description}</p>
  <p className="mb-6 text-center">Totalt {artworks.length} kunstverk</p>

<ul className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
  {artworks.map(
    (
      artwork: {
        title: string;
        image: { asset: { url: string } };
        slug: { current: string };
      },
      idx: number
    ) => (
      <li key={idx} className="mb-4 break-inside-avoid">
        <Link href={`/${slug}/${motiv}/${artwork.slug.current}`}>
          <Image
            src={artwork.image.asset.url}
            alt={artwork.title}
            width={600}
            height={800} // ← gir hint, men ikke tvang
            className="w-full h-auto object-contain p-2 bg-[#f8f8f8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-4 border-black"
          />
          <p className="mt-1 text-sm text-center">{artwork.title}, {artwork.year}</p>
          {artwork.avaliable && <p className="text-sm italic text-white/60 text-center">Til salgs</p>}
        </Link>
      </li>
    )
  )}
</ul>
</main>
  )
}
