export const SNIPCART_API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;

if(!SNIPCART_API_KEY) {
    throw new Error("Miljøvariabel NEXT_PUBLIC_SNIPCART_API_KEY mangler");
}
