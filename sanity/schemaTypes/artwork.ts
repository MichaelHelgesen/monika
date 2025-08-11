import {defineField, defineType} from "sanity";

export const artwork = defineType ({
    name: "artwork",
    title: "Kunstverk",
    type: "document",
    fields: [
        {
            name: "Title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "image",
            title: "Bilde",
            type: "image",
            options: {
                hotspot: "true"
            },
        },
        {
            name: "description",
            title: "Beskrivelse",
            type: "text",
        },
        {
            name: "price",
            title: "Pris",
            type: "number",
        },
        {
            name: "avaliable",
            title: "Tilgjengelig for salg",
            type: "boolean"
        }
    ]
})
