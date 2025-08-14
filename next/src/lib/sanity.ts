import { createClient } from "@sanity/client"
import { SANITY_DATASET, SANITY_API_KEY} from "@/lib/env"
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
