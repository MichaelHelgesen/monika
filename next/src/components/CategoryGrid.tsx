// CategoryGrid.tsx
import CategoryCard from "./CategoryCard";
import { sanityClient } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

// Typing for Sanity image source
type SanityImageSource = {
  asset: { _ref?: string; url?: string };
  hotspot?: { x: number; y: number };
};

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
type Artwork = {
  title: string;
  slug?: { current: string };
  price?: number;
  image: { asset: { url: string }; hotspot?: { x: number; y: number } };
  workType: { Tittel: string };
  category?: { Tittel: string };
};

type ArtworkFromSanity = {
  title: string;
  category?: { Tittel: string };
  image?: { asset?: { url: string }; hotspot?: { x: number; y: number } };
  avaliable?: boolean;
};

type MotivMapValue = {
  title: string;
  slug: string;
  imageUrl: string;
  hotspot: { x: number; y: number };
  count: number;
  forSale: number;
};

type CategoryItem = {
  Tittel: string;
  artwork?: Artwork;
  image?: { asset?: { url: string }; hotspot?: { x: number; y: number } };
};

type AllImageItem = {
  workType: { Tittel: string };
};

type CategoryGridProps = {
  categoryImages?: CategoryItem[];
  allImages?: AllImageItem[];
  featuredArtworks?: Artwork[];
  buttonText?: string;
  headingSize?: "h2" | "h3" | "h4";
  className?: string;
  variant?: "type" | "category";
  artFormId?: string;
  slug?: string;
};

export default async function CategoryGrid({
  variant,
  artFormId,
  slug,
  categoryImages = [],
  allImages = [],
  featuredArtworks = [],
}: CategoryGridProps) {
  let items: MotivMapValue[] = [];

  if (variant === "type" && artFormId) {
    const artworks: ArtworkFromSanity[] = await sanityClient.fetch(
      `*[_type == "artwork" && workType._ref == $artFormId]{
        title,
        category->{ Tittel },
        image{ asset->{ _id, url }, hotspot },
        avaliable
      }`,
      { artFormId }
    );

    const motivMap = artworks.reduce((acc: Map<string, MotivMapValue>, art) => {
      const category = art.category?.Tittel || "Ukjent";
      const imageUrl = art.image?.asset?.url || "";
      const hotspot = art.image?.hotspot || { x: 0.5, y: 0.5 };
      const avaliable = art.avaliable ?? false;

      if (acc.has(category)) {
        const existing = acc.get(category)!;
        existing.count += 1;
        if (avaliable) existing.forSale += 1;
      } else {
        acc.set(category, {
          title: category,
          slug: `${slug}/${category.toLowerCase()}`,
          imageUrl,
          hotspot,
          count: 1,
          forSale: avaliable ? 1 : 0,
        });
      }

      return acc;
    }, new Map<string, MotivMapValue>());

    items = Array.from(motivMap.values());
  }

  if (variant === "category" && categoryImages.length) {
    items = categoryImages
      .map((item) => {
        if (!item.artwork?.image?.asset?.url) return null;

        const numberOfArtworks = allImages.filter(
          (img) => img.workType.Tittel === item.Tittel
        ).length;

        const numberForSale = featuredArtworks.filter(
          (img) => img.workType.Tittel === item.Tittel
        ).length;

        return {
  title: item.Tittel,
  slug: `/${item.Tittel.toLowerCase()}`,
imageUrl: urlFor(item.image as SanityImageSource) // <-- cast
        .width(400)
        .height(400)
        .auto("format")
        .url(),
  hotspot: item.image?.hotspot || { x: 0.5, y: 0.5 },
  count: numberOfArtworks,
  forSale: numberForSale,
};     
      })
      .filter((x): x is MotivMapValue => x !== null);
  }

  return (
    <section id="kategorier" className="my-10 px-4 max-w-6xl mx-auto">
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <CategoryCard key={idx} {...item} />
        ))}
      </ul>
    </section>
  );
}
