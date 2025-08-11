import { createClient } from "@sanity/client"

export const sanityClient = createClient ({
    projectId: "5id50etx",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-01-01",
})
