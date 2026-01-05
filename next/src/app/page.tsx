//import { getArtworks } from "@/lib/queries";
//import Image from "next/image";
//import Link from "next/link";
import ArtSaleGrid from "@/components/ArtSaleGrid"
import Hero from "@/components/Hero"
import type { Metadata } from "next";
//import { poppins } from "@/app/layout";
import BioSection from "@/components/BioSection"
//import ImageGridCat/egory from "@/components/ImageGridCategory"
import { sanityClient } from "@/lib/sanity"
import CategoryGrid from "@/components/CategoryGrid"

async function getFeaturedArtworks() {
  return await sanityClient.fetch(`
    *[_type == "artwork" && avaliable == true && defined(image.asset)][]{
      title,
      slug,
      price,
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
  image {
    asset->{url, metadata { dimensions { width, height } }},
    hotspot,
    crop
  },
  "artwork": *[
    _type == "artwork" &&
    workType._ref == ^._id &&
    defined(image.asset)
  ] | order(_createdAt desc)[0]{
    title,
    slug,
    price,
    image {
      asset->{
        url
      }
    }
  }
}
    `)
}

async function getPage(){
	return await sanityClient.fetch (`
	*[_type == "page" && slug.current == "hjem"][0]{
  title,
  description,
  metaTitle,
  metaDescription,
  "ogImage": metaImage.asset->url
}`
)
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
console.log("PAGE", page)
  if (!page) {
    return {
      title: "Standard tittel",
      description: "Standard beskrivelse"
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      images: page.ogImage ? [{ url: page.ogImage, width: 1200, height: 630 }] : [],
      type: "website"
    }
  };
}

export default async function HomePage() {
    //const artworks = await getArtworks()
    const categoryImages = await getImagesFromCategories()
const featuredArtworks = await getFeaturedArtworks()
const allImages = await getAllImages()
return (
    <main className="bg-[#2e3b37] text-white min-h-screen">
        <Hero />
<CategoryGrid
  variant="category"
  categoryImages={categoryImages}
  allImages={allImages}
  featuredArtworks={featuredArtworks}
  slug="/kunst"
/>
        <BioSection />
        <ArtSaleGrid featuredArtworks={featuredArtworks}/>
    </main>
  )
}
