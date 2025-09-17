import { getArtworks } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

import { greatVibes } from '@/app/layout'

import { sanityClient } from "@/lib/sanity"

async function getFeaturedArtworks() {
  return await sanityClient.fetch(`
    *[_type == "artwork" && avaliable == true && defined(image.asset)][]{
      title,
      slug,
      image {
        asset->{
          url
        }
      },
      workType->{
        Tittel
      },
      category->{
        Tittel
      }
    }
  `)
}

async function getAllImages(){
    return await sanityClient.fetch (`
        *[_type == "artwork"][]{
            workType->{Tittel}
        }
    `)
}

async function getImagesFromCategories(){
    return await sanityClient.fetch (`
*[_type == "artForm"]{
  Tittel,
  "artwork": *[
    _type == "artwork" &&
    workType._ref == ^._id &&
    defined(image.asset)
  ] | order(_createdAt desc)[0]{
    title,
    slug,
    image {
      asset->{
        url
      }
    }
  }
}
    `)
}
export default async function HomePage() {
    const artworks = await getArtworks()
    const categoryImages = await getImagesFromCategories()
const featuredArtworks = await getFeaturedArtworks()
const allImages = await getAllImages()
return (
    <main className="bg-[#2e3b37] text-white min-h-screen">
      {/* Hero */}
<section className="text-center pb-10 pt-22 px-4 bg-[#2e3b37] hero">
<h1 className={`${greatVibes.className} text-4xl md:text-8xl mb-4`} style={{
  background: 'linear-gradient(90deg, #f0ead8, rgb(167 134 76))', 
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  lineHeight: "1.2"
}}>
  Monika Helgesen
</h1>
  <p className="text-lg md:text-2xl text-[#f0ead8] mt-4 leading-relaxed">
    Kitchmalerinne<br />
    <span className="text-yellow-200">Maleri · Tegning · Grafikk</span>
  </p>
  </section>

<section id="kategorier" className="my-10 px-4 max-w-6xl mx-auto">
  <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
    {categoryImages.map((item, idx) => {
      const artwork = item.artwork;
      const numberOfArtworks = allImages.filter(img => img.workType.Tittel === item.Tittel).length;
      const numberForSale = featuredArtworks.filter(img => img.workType.Tittel === item.Tittel).length;

      if (!artwork?.image?.asset?.url) return null;

      return (
        <li key={idx} className="relative rounded-lg overflow-hidden shadow-md group aspect-[16/9] md:aspect-[3/4]">
          <Link href={`/${item.Tittel.toLowerCase()}`}>
            <Image
              src={artwork.image.asset.url}
              alt={artwork.title}
              width={400}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-white px-4 text-center gap-2">
              {/* Kategori-tittel */}
              <h2 className="text-xl md:text-3xl font-semibold mb-1">{item.Tittel}</h2>

              {/* Antall verk og til salgs */}
              {numberOfArtworks > 0 && <span className="text-sm">{`${numberOfArtworks} verk`}</span>}
              {numberForSale > 0 && <span className="text-sm">{`${numberForSale} til salgs`}</span>}

              {/* Se verk-knapp */}
              <div
                className="mt-3 inline-block px-4 py-2 bg-[var(--accent)] hover:bg-red-500 text-black rounded-lg font-semibold text-sm hover:bg-yellow-300 transition"
              >
                Se verk
              </div>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
</section>
      {/* Bio */}
<section className="bg-[#44544d] py-12 px-4 text-center">
  <div className="max-w-2xl mx-auto">
    {/* Bilde av kunstneren */}
    <img
      src="https://monikahelgesen.com/wp-content/uploads/2017/06/IMG_20160803_152823-480x600.jpg"  // bytt ut med riktig sti til bildet ditt
      alt="Monika Helgesen"
      className="mx-auto mb-6 w-48 h-48 object-cover rounded-full shadow-lg"
    />

    <p className="text-lg text-gray-200">
      Monika Helgesen arbeider med maleri, tegning og grafikk – ofte inspirert av natur, stillhet og det menneskelige. Hun er utdannet ved ... og har hatt utstillinger i ...
    </p>
    <Link
      href="/om-monika"
      className="inline-block mt-4 text-white underline hover:text-gray-300"
    >
      Les mer om kunstneren →
    </Link>
  </div>
</section>

      {/* Utvalgte kunstverk */}
      {featuredArtworks.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#f0ead8]">Trykk og bilder til salgs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredArtworks.map((artwork: any) => (
              <Link
                key={artwork.slug.current}
                href={`/${artwork.workType?.Tittel?.toLowerCase()}/${artwork.category.Tittel.toLowerCase()}/${artwork.slug.current}`}
              >
                <Image
                  src={artwork.image.asset.url}
                  alt={artwork.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain p-2 bg-[#f0ead8] shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-4 border-black"
                />
                <div className="p-4 text-center">
                <small className="italic">{artwork.workType.Tittel}</small>
                  <p className="font-medium">{artwork.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Kontakt / Footer */}
    </main>
  )
/*
    return (
        <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Kunstverk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {artworks.map((artwork: {_id: string; url: string; title: string; slug: string; description: string; price: number; avaliable: boolean; image: { asset: { url: string; src: string; alt: string }  }}) => (
          <div key={artwork._id} className="border rounded p-4">
            {artwork.image?.asset?.url && (
              <Image
                src={artwork.image.asset.url}
                alt={artwork.title}
                width={400}
                height={400}
                className="object-cover w-full h-auto"
              />
            )}
            <Link href={`/kunstverk/${artwork.slug}`}>
            <h2 className="text-xl font-semibold mt-2">{artwork.title}</h2>
            </Link>
            <p className="text-gray-700">{artwork.description}</p>
            <p className="text-green-600 mt-2 font-bold">
              {artwork.price} NOK
            </p>
              {artwork.avaliable && (
  <button
    className="snipcart-add-item mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    data-item-id={artwork.slug}
    data-item-price={artwork.price}
    data-item-url={`https://monika-kappa.vercel.app/`} // siden alle produktene vises her
    data-item-description={artwork.description}
    data-item-image={artwork.image?.asset?.url}
    data-item-name={artwork.title}
  >
    Legg i handlekurv
  </button>
)}
          </div>
        ))}
<button className="snipcart-checkout fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg hover:bg-gray-800 z-50">
  🛒 Handlekurv (
  <span className="snipcart-items-count"></span>
  )
</button>
      </div>
    </main>
    )*/
}
