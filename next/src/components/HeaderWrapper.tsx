
// app/components/HeaderWrapper.tsx (serverkomponent)
import { sanityClient } from '@/lib/sanity';
import HeaderClient from './HeaderClient';

type Page = {
  title: string;
  slug: string;
  children?: Page[];
};

type Artwork = {
  workType?: { Tittel?: string };
  category?: { Tittel?: string };
};

function buildMenu(pages: Page[], artworks: Artwork[]): Page[] {
  return pages.map(page => {
    if (page.slug.toLowerCase() !== "maleri") return page;

    const workType = page.title; // f.eks. "Maleri"

    const categories = Array.from(
      new Set(
        artworks
          .filter(a => a.workType?.Tittel === workType)
          .map(a => a.category?.Tittel)
          .filter(Boolean)
      )
    ).map(cat => ({
      title: cat!,
      slug: `maleri/${cat!.toLowerCase()}`,
    }));

    return {
      ...page,
      children: categories,
    };
  });
}


export default async function HeaderWrapper() {
	const artworks = await sanityClient.fetch(`
	  *[_type == "artwork"]{
	    title,
		workType -> { Tittel },
		category -> { Tittel }
	  }
	`);

  const pages = await sanityClient.fetch(
    `*[_type == "page"] | order(menuOrder asc){
      title,
      menuOrder,
      "slug": slug.current
    }`
  );
const menuItems = buildMenu(pages, artworks);
console.log("MENUITEMS", menuItems)
  return <HeaderClient pages={menuItems} />;
}
