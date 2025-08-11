import { getArtworks } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { getBaseUrl } from "@/lib/getBaseUrl"

const baseUrl = getBaseUrl();

export default async function HomePage() {
    const artworks = await getArtworks()

    return (
        <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Kunstverk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {artworks.map((artwork: {_id: string; url: string; Title: string; slug: string; description: string; price: number; avaliable: boolean; image: { asset: { url: string; src: string; alt: string }  }}) => (
          <div key={artwork._id} className="border rounded p-4">
            {artwork.image?.asset?.url && (
              <Image
                src={artwork.image.asset.url}
                alt={artwork.Title}
                width={400}
                height={400}
                className="object-cover w-full h-auto"
              />
            )}
            <Link href={`/kunstverk/${artwork.slug}`}>
            <h2 className="text-xl font-semibold mt-2">{artwork.Title}</h2>
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
    data-item-name={artwork.Title}
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
    )
}
