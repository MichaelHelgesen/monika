// app/[slug]/[motiv]/page.tsx

import { sanityClient } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Image from "next/image";

type PageProps = {
  params: {
    slug: string
    motiv: string
    verk: string
  }
}

// Hente slug fra alle kunstverk i Sanity,
// og lager array av objekter av dem,
// som blir konvertert til statiske baner.
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "artwork" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}
export default async function Page({ params }: PageProps) {
const { slug, motiv, verk } = await params;
 const page = await sanityClient.fetch(
    `*[_type == "artwork" && slug.current == $verk][0]{
        title,
        description,
        image{
            asset->{
                url
            }
        }
    }`,
    { verk } // Sende parameter til Sanity for å matche slugs.
  );
        console.log(page);

 if (!page) {
    return notFound(); // Returnerer en 404 hvis siden ikke finnes
  }
  // Returner JSX med innholdet
  return (
    <main>
      <h1>{page.title}</h1>
      <p>{slug}{motiv}{verk}</p>
      <p>{page.description}</p>
    <Image 
        src={page.image.asset.url}
                width={400}
                height={400}
    />
         </main>
  );
}

