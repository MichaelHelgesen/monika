import { sanityClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Link from "next/link"
import Image from "next/image"
//import { getPageBySlug } from "@/lib/sanity";
//import { getSlugs } from "@/lib/sanity"

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Hente slugs fra alle sider i Sanity,
// og lager array av objekter av dem,
// som blir konvertert til statiske baner.
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

// Hver av slug-ene fra StaticParam sendes
// gjennom Page-funksjonen for å hente tilhørende
// side-data fra Sanity.
export default async function Page({ params }: PageProps) {
const { slug } = await params;
  // Hent data for den spesifikke slugen
  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      content,
      artForm->{
      title,
      _id
    }
    }`,
    { slug } // Sende parameter til Sanity for å matche slugs.
  );

        // Hvor mange kunstverk med samme kunsttype (f.eks. maleri)


  if (!page) {
    return notFound(); // Returnerer en 404 hvis siden ikke finnes
  }

if(!page.artForm){
  return (
    <main>
      <h1>{page.title}</h1>
      <PortableText value={page.content} />
      {page.artForm && <p>Siden har motiver</p>}
      <ul>
        </ul>
    </main>
  );
}
const artworks = await sanityClient.fetch(
    `*[_type == "artwork" && workType._ref == $artFormId]{
      title,
      category->{
        Tittel
      },
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
    })
console.log(artworks)

/*
const motiverTelling = artworks.reduce((acc: Record<string, number>, art: {category:{ Tittel: string}, image:{asset:{url: string}}}) => {
  const category = art.category.Tittel || "Ukjent";
  const image = art.image.asset.url;
  acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});
console.log("motiverTelling", motiverTelling)

const motiverArray = Object.entries(motiverTelling).map(([category, count]) => ({
  category,
  count,
}));
console.log("motiverArray", motiverArray);
*/

const motivMap = artworks.reduce((acc: Map<string, { category: string; count: number; imageUrl: string | null }>, art: {category:{Tittel: string}, image:{asset:{url: string}}}) => {
  const category = art.category?.Tittel || "Ukjent";
  const imageUrl = art.image?.asset?.url || null;

  if (acc.has(category)) {
    const existing = acc.get(category)!;
    existing.count += 1;
    // Behold det første bildet, eller:
    // existing.imageUrl = imageUrl; // <-- For siste bilde
  } else {
    acc.set(category, {
      category,
      count: 1,
      imageUrl, // første bildet lagres
    });
  }


  return acc;
}, new Map<string, { category: string; count: number; imageUrl: string | null }>());

  console.log(motivMap)

const test = Array.from(motivMap.values())
console.log(test)
  // Håndter tilfelle der siden ikke finnes

  // Returner JSX med innholdet
  return (
    <main>
      <h1>{page.title}</h1>
      <PortableText value={page.content} />
      {page.artForm && <p>Siden har motiver</p>}
      <ul>
      {(test as { category: string; count: number; imageUrl: string }[]).map((artwork, idx) => {
            return(
          <li key={idx}>
          <Link key={idx} href={`${slug}/${artwork.category.toLowerCase()}`}>
            <p>{artwork.category} <span>{artwork.count}</span></p>
            <Image
                src={artwork.imageUrl}
                width={400}
                height={400}
                alt=""
                />
            </Link>
          </li>
        )})}
        </ul>
    </main>
  );
}
