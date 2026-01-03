import { sanityClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
//import Link from "next/link"
//import Image from "next/image"
//import ImageGridType from "@/components/ImageGridType"
import CategoryGrid from "@/components/CategoryGrid"
//import { getPageBySlug } from "@/lib/sanity";
//import { getSlugs } from "@/lib/sanity"

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == slug][0]{
      title,
      content,
      metaTitle,
      metaDescription,
      "ogImage": metaImage.asset->url,
      artForm->{
        title,
        description,
        _id
      }
    }`,
    { slug }
  );
}




// Hente slugs fra alle sider i Sanity,
// og lager array av objekter av dem,
// som blir konvertert til statiske baner.
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

/*
export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug);

  if (!page) {
    return {
      title: "Side ikke funnet",
      description: "Denne siden finnes ikke."
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      images: page.ogImage ? [{ url: page.ogImage }] : []
    }
  };
}
*/
// Hver av slug-ene fra StaticParam sendes
// gjennom Page-funksjonen for å hente tilhørende
// side-data fra Sanity.
export default async function Page({ params }: PageProps) {
const { slug } = await params;
  // Hent data for den spesifikke slugen
//
//







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
/*
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
*/
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


  // Returner JSX med innholdet
  return (

    <main className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl text-center font-bold mb-2">{page.title}</h1>
      <div className="mb-6 text-center">
      <PortableText value={page.content} />
      </div>
      <p className="text-center mb-6">{page.artForm.description}</p>
<CategoryGrid variant="type" artFormId={page.artForm._id} slug={slug} />
    </main>
  );
}
