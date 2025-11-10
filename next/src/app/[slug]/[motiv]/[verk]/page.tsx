
import { sanityClient } from '@/lib/sanity'
import { notFound } from 'next/navigation'
//import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Button from "@/components/Button"

type PageProps = {
  params: Promise<{
    slug: string
    verk: string
  }>;
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
const { verk } = await params;
 const page = await sanityClient.fetch(
    `*[_type == "artwork" && slug.current == $verk][0]{
        title,
        price,
        size,
        number,
        avaliable,
        details[]{asset->{url},alt,title,caption},
        supplement_images[]{asset->{url, title, caption, alt}},
        technique,
        year,
        category->{Tittel},
        workType->{Tittel},
        slug{current},
        description,
        image{
            title,
            alt,
            caption,
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
<main className="px-4 py-8 max-w-5xl mx-auto">
  <h1 className="text-3xl font-bold mb-4">{page.title}</h1>

  <div className="flex flex-col lg:flex-row md:items-start gap-6">
    {/* Bildet */}
    <div className="flex-shrink-0 w-full lg:w-1/2">
    {/*<Image
        src={page.image.asset.url}
        width={600}
        height={600}
        alt={page.title}
        className="w-full h-auto rounded shadow-md object-contain p-2 bg-[#f8f8f8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-4 border-black"
        priority
      />*/}
<Gallery 
    artworks={[page.image]} 
    imageClassName="w-full h-auto object-contain p-2 bg-[#f8f8f8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-4 border-black"
    width={600}
    height={600}
    priority={true}
    divClassName=""
    alt={page.image.alt}
/>
    </div>

    {/* Tekst og info */}
    <div className="md:w-1/2 space-y-4">
      <p>{page.description}</p>

      <ul className="text-sm space-y-1">
        {page.size && (
          <li><strong>Størrelse:</strong> {page.size}</li>
        )}
        {page.year && (
          <li><strong>År:</strong> {page.year}</li>
        )}
        {page.technique && (
          <li><strong>Teknikk:</strong> {page.technique}</li>
        )}
        {page.workType?.Tittel && (
          <li><strong>Type:</strong> {page.workType.Tittel}</li>
        )}
        {page.category?.Tittel && (
          <li><strong>Motiv:</strong> {page.category.Tittel}</li>
        )}
        {page.number && (
          <li><strong>Antall tilgjengelig:</strong> {page.number}</li>
        )}
        {page.avaliable && page.price && (
          <li className="text-lg font-semibold text-green-300 mb-2"><strong>Pris:</strong> {page.price}</li>
        )}
      </ul>
{page.avaliable ? (
  page.price != null ? (
    <div>
      <button
        className="snipcart-add-item bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        data-item-id={page.slug.current}
            data-item-price={page.price}
            data-item-url={`https://monika-kappa.vercel.app/`}
            data-item-description={page.description}
            data-item-image={page.image?.asset?.url}
            data-item-name={page.title}
        data-config-modal-style="slide"
      >
        Legg i handlekurv
      </button>
      {/*<Button>Legg i handlekurv</Button>*/}
    </div>
  ) : (
<div>
      <p className="text-lg font-semibold text-green-300 mb-2">
        Til salgs – ta kontakt for pris
      </p>
      <Link
        href="/kontakt"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ta kontakt
      </Link>
    </div>
  )
) : (
  <p className="text-sm italic text-white/60">Ikke tilgjengelig for salg</p>
)}
    </div>

  </div>

{(page.details?.length > 0 || page.supplement_images?.length > 0) && (
  <section className="mt-12">
    {page.details?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mb-2">Utsnitt</h2>
<Gallery 
    artworks={page.details}
    divClassName="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    crop={true}
/>
      </>
    )}

    {page.supplement_images?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mb-2">Arbeidsprosess</h2>
<Gallery 
    artworks={page.supplement_images} 
    divClassName="grid grid-cols-2 md:grid-cols-4 gap-4"
    crop={true}
/>
      </>
    )}
  </section>
)}
</main>
);
}

