import { createClient } from "@sanity/client"

export const sanityClient = createClient ({
    projectId: process.env.SANITY_API_TOKEN,
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-01-01",
})
