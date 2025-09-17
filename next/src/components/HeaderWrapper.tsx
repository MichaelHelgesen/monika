
// app/components/HeaderWrapper.tsx (serverkomponent)
import { sanityClient } from '@/lib/sanity';
import HeaderClient from './HeaderClient';

export default async function HeaderWrapper() {
  const pages = await sanityClient.fetch(
    `*[_type == "page"] | order(menuOrder asc){
      title,
      menuOrder,
      "slug": slug.current
    }`
  );

  return <HeaderClient pages={pages} />;
}
