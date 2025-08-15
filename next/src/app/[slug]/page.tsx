import { sanityClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
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
      content
    }`,
    { slug } // Sende parameter til Sanity for å matche slugs.
  );

  // Håndter tilfelle der siden ikke finnes
  if (!page) {
    return notFound(); // Returnerer en 404 hvis siden ikke finnes
  }

  // Returner JSX med innholdet
  return (
    <main>
      <h1>{page.title}</h1>
      <PortableText value={page.content} />
    </main>
  );
}
