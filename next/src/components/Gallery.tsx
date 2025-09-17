
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
//import "yet-another-react-lightbox/plugins/fullscreen.css";
    import "yet-another-react-lightbox/plugins/thumbnails.css"; // Import the CSS for thumbnails
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/lib/sanity'
//import "y(9et-another-react-lightbox/plugins/zoom.css";
import "yet-another-react-lightbox/plugins/captions.css";

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

type Artwork = {
  title: string;
  asset: {
    url: string;
  };
  details: {
    alt: string
  }
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



export default function Gallery({ artworks, imageClassName = "", width = 300, height = 300, priority = false, divClassName = "", crop = false, alt = "Kunstverk" }: GalleryProps) {
const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<number>(-1);
const slides = artworks.map((artwork) => ({
          src: artwork.asset.url,
          title: artwork.title,
          description: artwork.caption
        }))
  return (
    <div>
      <div className={divClassName}>
        {artworks.map((artwork, i) => {

const altText = artwork?.alt ? artwork.alt : alt;
const imageSrc = !crop
  ? artwork.asset.url
  : urlFor(artwork.asset.url).width(400).height(300).fit("crop").url();
            return(
          <div
            key={i}
            className="cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={imageSrc}
              alt={artwork.alt || alt}
              width={width}
              height={height}
              className={imageClassName}
              priority={priority}
            />
          </div>
        )})}
      </div>

      <Lightbox
keyboard={artworks.length > 1}
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
carousel={{ finite: slides.length <= 1 }}
render={{
    buttonPrev: slides.length <= 1 ? () => null : undefined,
    buttonNext: slides.length <= 1 ? () => null : undefined,
  }}
        onIndexChange={setIndex}
        slides={slides}
plugins={slides.length > 1 ? [Zoom, Captions, Fullscreen, Thumbnails] : [Zoom, Captions, Fullscreen]}
captions={{ showToggle: true }}
thumbnails={{
        showToggle: true, // This enables the toggle button
        // You can also set 'hidden: true' here if you want thumbnails initially hidden
      }}
//className={artworks.length === 1 ? "no-navigation" : ""}
      />
    </div>
  );
}
