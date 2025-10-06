import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
//import type { ImageSource } from "@sanity/image-url"
import { SANITY_DATASET, SANITY_API_KEY} from "@/lib/env"

type SanityImageSource = {
  asset: { _ref?: string; url?: string };
  hotspot?: { x: number; y: number };
};

export const sanityClient = createClient ({
    projectId: SANITY_API_KEY as string,
    dataset: SANITY_DATASET as string,
    useCdn: true,
    apiVersion: "2023-01-01",
})
/*
export async function getSlugs() {
  return sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  )
}
export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      content
    }`,
    slug
  )
}
*/
// URL-builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export type Page = {
  slug: string;
  title: string;
  menuTitle?: string;
}

export async function getMenuPages(): Promise<Page[]> {
  return sanityClient.fetch(
    `*[_type == "page" && showInMenu == true] | order(menuOrder asc) {
      title,
      "slug": slug.current,
      menuTitle
    }`
  )
}
