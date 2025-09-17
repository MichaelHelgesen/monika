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
      description,
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
<main className="px-4 py-8">
  <h1 className="text-2xl font-bold text-center mb-2">{page.title}</h1>
<div className="mb-6 max-w-3xl center mx-auto">
      <PortableText value={page.content} />
      </div>
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
      description,
      avaliable
    }`,
    {
      artFormId: page.artForm._id,
    })
console.log("artworks", artworks)

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

const motivMap = artworks.reduce((acc: Map<string, { category: string; count: number; forSale: number, imageUrl: string | null }>, art: {category:{Tittel: string}, avaliable:boolean, image:{asset:{url: string}}}) => {
  const category = art.category?.Tittel || "Ukjent";
  const imageUrl = art.image?.asset?.url || null;
  const avaliable = art.avaliable;
  if (acc.has(category)) {
    const existing = acc.get(category)!;
    existing.count += 1;
    if(avaliable){
        existing.forSale += 1;
    }
    // Behold det første bildet, eller:
    // existing.imageUrl = imageUrl; // <-- For siste bilde
  } else {
    acc.set(category, {
      category,
      count: 1,
      forSale: avaliable ? 1 : 0,
      imageUrl, // første bildet lagres
    });
  }


  return acc;
}, new Map<string, { category: string; forSale: number, count: number; imageUrl: string | null }>());

  console.log(motivMap)

const test = Array.from(motivMap.values())
console.log(test)
  // Håndter tilfelle der siden ikke finnes

  // Returner JSX med innholdet
  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl text-center font-bold mb-2">{page.title}</h1>
      <div className="mb-6 text-center">
      <PortableText value={page.content} />
      </div>
      <p className="text-center mb-6">{page.artForm.description}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {(test as { category: string; count: number; imageUrl: string }[]).map((artwork, idx) => {
          console.log(artwork.category)
            return(
<li key={idx} className="relative rounded-lg overflow-hidden shadow-md group">
        <Link href={`${slug}/${artwork.category.toLowerCase()}`}>
          <Image
            src={artwork.imageUrl}
            alt={artwork.category}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
            <p className="text-xl font-semibold">{artwork.category}</p>
            <span className="text-sm">{artwork.count} verk</span>
            <span className="text-sm">{artwork.forSale} til salgs</span>
          </div>
        </Link>
      </li>
        )})}
        </ul>
    </main>
  );
}
