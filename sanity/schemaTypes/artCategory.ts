import {defineField, defineType} from "sanity"

export const artCategory = defineType ({
    name: "artCategory",
    title: "Motiv",
    type: "document",
    fields: [
        defineField({
            name: "Tittel",
            type: "string",
        }),
        defineField({
            title: "Beskrivelse",
            type: "text",
            name: "description"
        })
    ]
})

