// CategoryCard.tsx
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image"

type CategoryCardProps = {
  title: string;
  slug: string;
  imageUrl: string;
  hotspot?: { x: number; y: number };
  count: number;
  forSale: number;
};

export default function CategoryCard({
  title,
  slug,
  imageUrl,
  hotspot = { x: 0.5, y: 0.5 },
  count,
  forSale,
}: CategoryCardProps) {
return (
    <li className="relative rounded-lg overflow-hidden shadow-md group aspect-[16/9] md:aspect-[3/4]">
      <Link href={slug} className="block w-full h-full relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
	  fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`,
          }}
        />

        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-white px-4 text-center gap-2">
          <h2 className="text-xl md:text-3xl font-semibold mb-1">{title}</h2>
          {count > 0 && <span className="text-md">{count} verk</span>}
          {forSale > 0 && <span className="text-md">{forSale} til salgs</span>}
          <Button variant="accent" as="div">Se verk</Button>
        </div>
      </Link>
    </li>
  );}
