import { createClient } from "@sanity/client"
import { SANITY_DATASET, SANITY_API_KEY} from "@/lib/env"
export const sanityClient = createClient ({
    projectId: SANITY_API_KEY as string,
    dataset: SANITY_DATASET as string,
    useCdn: true,
    apiVersion: "2023-01-01",
})
