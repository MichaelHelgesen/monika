"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Lightbox, { ControllerRef } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

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
  asset: { url: string };
  details?: { alt?: string;caption?: string;
 };
  };

type GalleryProps = {
  artworks: Artwork[];
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  divClassName?: string;
  crop?: boolean;
  alt?: string;
};

export default function Gallery({
  artworks,
  imageClassName = "",
  width = 300,
  height = 300,
  priority = false,
  divClassName = "",
  crop = false,
  alt = "Kunstverk",
}: GalleryProps) {
  const [index, setIndex] = useState<number>(-1);

  // Lag slides til Lightbox
  const slides = artworks.map((artwork) => ({
    src: artwork.asset.url,
    title: artwork.title,
    description: artwork.details?.caption || artwork.details?.alt || "",
  }));

const lightboxRef = useRef<ControllerRef>(null);
  return (
    <div>
      <div className={divClassName}>
        {artworks.map((artwork, i) => {
          const imageSrc = !crop
            ? artwork.asset.url
            : urlFor({ asset: artwork.asset })
                .width(400)
                .height(300)
                .fit("crop")
                .url();

          return (
            <div key={i} className="cursor-pointer" onClick={() => setIndex(i)}>
              <Image
                src={imageSrc}
                alt={artwork.details?.alt || alt}
                width={width}
                height={height}
                className={imageClassName}
                priority={priority}
              />
            </div>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
controller={{ ref: lightboxRef }}
        carousel={{ finite: slides.length <= 1 }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        slides={slides}
        plugins={
          slides.length > 1
            ? [Zoom, Captions, Fullscreen, Thumbnails]
            : [Zoom, Captions, Fullscreen]
        }
captions={{
    showToggle: true,
    descriptionTextAlign: "start",
    descriptionMaxLines: 3,
  }}
        thumbnails={{ showToggle: true }}
      />
    </div>
  );
}
