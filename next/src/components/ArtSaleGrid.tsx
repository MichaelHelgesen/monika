import Link from "next/link";
import Image from "next/image";

import { poppins } from "@/app/layout";
type Artwork = {
  title: string;
  slug: {
    current: string;
  };
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
  workType: {
    Tittel: string;
  };
  category: {
    Tittel: string;
  };
};
/*
type CategoryItem = {
  Tittel: string;
  artwork?: {
    image?: {
      asset?: {
        url: string;
      };
    };
    title?: string;
  };
};
*/
/*
type CategoryGridProps = {
  categoryImages: CategoryItem[];
//allImages: any[];
};*/
type ArtSaleGridProps = {
  featuredArtworks: Artwork[];
};
export default function ArtSaleGrid({
    //categoryImages,
    //allImages,
    featuredArtworks
}: ArtSaleGridProps) {
    if (featuredArtworks.length > 0) {
        return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className={`text-2xl font-bold text-center mb-8 text-[#f0ead8] ${poppins.className}`}>Trykk og bilder til salgs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtworks.map((artwork: Artwork) => (
              <Link
                key={artwork.slug.current}
                href={`/${artwork.workType?.Tittel?.toLowerCase()}/${artwork.category.Tittel.toLowerCase()}/${artwork.slug.current}`}
              >
<div className="
  inline-block 
  bg-black p-4 sm:p-3 md:p-3 lg:p-3 
  shadow-[0_8px_20px_rgba(0,0,0,0.3)]
">
  <div className="bg-[#f0ead8] p-6 sm:p-5 md:p-5 lg:p-5">
                <Image
                  src={artwork.image.asset.url}
                  alt={artwork.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain border-[3px] border-[#e1dbca] border-[inset]"/>
  </div>
</div>
                <div className="p-4 text-center">
                  <p className="font-medium !mb-0">{artwork.title}</p>
                <small className="italic">{artwork.workType.Tittel} - {artwork.category.Tittel}</small><br />
                <small className="italic">Kr. {artwork.price}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )} return null
}
