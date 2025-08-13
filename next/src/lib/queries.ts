import { sanityClient} from "./sanity"

export async function getArtworks() {
    const query = `*[_type == "artwork"]{
        _id,
        title,
        "slug": slug.current,
        description,
        price,
        avaliable,
        image {
            asset -> {
                _id,
                url
            }
        }
    }`

    return await sanityClient.fetch(query);
};

