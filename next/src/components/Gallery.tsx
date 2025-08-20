
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
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
};

type GalleryProps = {
  artworks: Artwork[];
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean
  divClassName?: string
  crop?: boolean
};



export default function Gallery({ artworks, imageClassName = "", width = 300, height = 300, priority = false, divClassName = "", crop = false }: GalleryProps) {
  const [index, setIndex] = useState<number>(-1);
  return (
    <div>
      <div className={divClassName}>
        {artworks.map((artwork, i) => {
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
              alt={artwork.title}
              width={width}
              height={height}
              className={imageClassName}
              priority={priority}
            />
          </div>
        )})}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        onIndexChange={setIndex}
        slides={artworks.map((artwork) => ({
          src: artwork.asset.url,
          title: artwork.title,
        }))}
plugins={[Zoom]}
      />
    </div>
  );
}
