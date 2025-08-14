import { sanityClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
//import { getPageBySlug } from "@/lib/sanity";
//import { getSlugs } from "@/lib/sanity"

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
const { slug } = await params;
  // Hent data for den spesifikke slugen
  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      content
    }`,
    { slug }
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
