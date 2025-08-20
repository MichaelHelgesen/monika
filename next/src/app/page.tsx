import { getArtworks } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/lib/sanity"

async function getFeaturedArtworks() {
  return await sanityClient.fetch(`
    *[_type == "artwork" && avaliable == true && defined(image.asset)][0...6]{
      title,
      slug,
      image {
        asset->{
          url
        }
      },
      workType->{
        Tittel
      }
    }
  `)
}
export default async function HomePage() {
    const artworks = await getArtworks()
const featuredArtworks = await getFeaturedArtworks()
return (
    <main className="bg-[#2e3b37] text-white min-h-screen">
      {/* Hero */}
      <section className="text-center py-24 px-4 bg-[#2e3b37]">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Monika Helgesen
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Maleri · Tegning · Grafikk
        </p>
      </section>

      {/* Kunstformer */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Malerier", slug: "maleri", img: "/maleri-eksempel.jpg" },
            { title: "Tegninger", slug: "tegning", img: "/tegning-eksempel.jpg" },
            { title: "Grafikk", slug: "grafikk", img: "/grafikk-eksempel.jpg" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group bg-white text-black rounded overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold group-hover:underline">
                  {item.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section className="bg-[#384640] py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
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
          <h2 className="text-2xl font-bold text-center mb-8">Til salgs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredArtworks.map((artwork: any) => (
              <Link
                key={artwork.slug.current}
                href={`/${artwork.workType?.Tittel?.toLowerCase()}/${artwork.slug.current}`}
                className="bg-white text-black rounded overflow-hidden shadow hover:shadow-lg"
              >
                <Image
                  src={artwork.image.asset.url}
                  alt={artwork.title}
                  width={600}
                  height={600}
                  className="w-full h-64 object-contain bg-white"
                />
                <div className="p-4 text-center">
                  <p className="font-medium">{artwork.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Kontakt / Footer */}
      <footer className="bg-[#1f2623] text-center py-8 mt-12 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Monika Helgesen</p>
        <p className="mt-2">
          <Link href="/kontakt" className="underline hover:text-white">
            Ta kontakt
          </Link>
        </p>
      </footer>
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
