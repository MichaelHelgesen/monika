// app/[slug]/[motiv]/page.tsx

import { sanityClient } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    slug: string
    motiv: string
  }
}

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
        "motiv": lower(category->Tittel)
      }`,
      { artFormId: page.artFormId }
    )

    const motiver = Array.from(
      new Set(artworks.map((art: any) => art.motiv))
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
      slug,
      image{
        asset->{
            _id,
            url
        }
      },
      description
    }`,
    {
      artFormId: page.artForm._id,
      motiv
    }
  )
  if (!artworks.length) return notFound()

  return (
    <main>
      <h1>Motiv: {motiv}</h1>
      <p>Totalt {artworks.length} kunstverk</p>
      <ul>
        {artworks.map((artwork, idx) => {
            return(
          <li key={idx}>
            <h2>{artwork.title}</h2>
            {artwork.image?.asset?.url && (
                <Link href={`/${slug}/${motiv}/${artwork.slug.current}`}>
              <Image
                src={artwork.image.asset.url}
                alt={artwork.title}
                width={400}
                height={400}
                className="object-cover w-full h-auto"
              />
              </Link>
            )}
          </li>
        )})}
      </ul>
    </main>
  )
}
