import { sanityClient } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VERCEL_URL } from "@/lib/env"

const query = `
    *[_type == "artwork" && slug.current == $slug][0]{
        _id,
        Title,
        description,
        price,
        "slug": slug.current,
        avaliable,
        image {
            asset -> {
                url,
                metadata { dimensions }
            }
        }
    }
`
interface PageProps {
    params: Promise<{ slug: string }>;
}



export default async function ArtworkPage({ params }: PageProps ) {
    const { slug } = await params;
    const artwork = await sanityClient.fetch(query, { slug: slug })

        if (!artwork) return notFound()

        return (
<div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{artwork.Title}</h1>

      {artwork.image?.asset?.url && (
        <Image
          src={artwork.image.asset.url}
          alt={artwork.Title}
          width={artwork.image.asset.metadata.dimensions.width}
          height={artwork.image.asset.metadata.dimensions.height}
          className="mb-6 rounded"
        />
      )}

      <p className="mb-4">{artwork.description}</p>
      <p className="mb-4 font-semibold text-lg">Pris: {artwork.price} kr</p>
      {console.log({artwork})}
      {artwork.avaliable === true && (
        <button
          className="snipcart-add-item bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          data-item-id={artwork.slug}
          data-item-price={artwork.price}
          data-item-url={`${VERCEL_URL}/kunstverk/${artwork.slug}`}
          data-item-description={artwork.description || ''}
          data-item-image={artwork.image?.asset?.url || ''}
          data-item-name={artwork.Title}
        >
          Legg i handlekurv
        </button>
      )}
    </div>
        )
}


