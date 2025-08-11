export const SNIPCART_API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;
if(!SNIPCART_API_KEY) {
    throw new Error("Miljøvariabel NEXT_PUBLIC_SNIPCART_API_KEY mangler");
}

export const SANITY_API_KEY = process.env.NEXT_PUBLIC_SANITY_API_KEY;
if(!SANITY_API_KEY) {
    throw new Error("Miljøvariabel NEXT_PUBLIC_SANITY_API_KEY mangler");
}


export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
if(!SANITY_DATASET) {
    throw new Error("Miljøvariabel NEXT_PUBLIC_SANITY_DATASET mangler");
}

export const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
if(!VERCEL_URL) {
    throw new Error("Miljøvariabel NEXT_PUBLIC_VERCEL_URL mangler");
}
