import {defineField, defineType} from "sanity"

export const artForms = defineType ({
    name: "artForm",
    title: "Kunstformer",
    type: "document",
    fields: [
        defineField({
            name: "Tittel",
            type: "string",
        }),
    ]
})

