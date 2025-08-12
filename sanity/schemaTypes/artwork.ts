import {defineField, defineType} from "sanity";

export const artwork = defineType ({
    name: "artwork",
    title: "Kunstverk",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string"
        },
        {
            name: "slug",
            title: "Nettadresse",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                slugify: (input) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
            },
        },
        {
            name: "size",
            title: "Størrelse",
            type: "string"
        },
        {
            name: "year",
            title: "År",
            type: "string"
        },
        {
            name: "technique",
            title: "Teknikk",
            type: "string",
        },
        {
            name: "image",
            title: "Hovedbilde",
            type: "image",
            options: {
                hotspot: "true"
            },
        },
        {
            name: "details",
            title: "Utsnitt",
            type: "array",
            of: [{type: "image"}]
        },
        {
            name: "supplement_images",
            title: "Supplerende bilder",
            type: "array",
            of: [{type: "image"}]
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
        },
        {
            name: "workType",
            title: "Kunstform",
            type: "reference",
            to: [{type: "artForm"}]
        },
        {
            name: "category",
            title: "Motiv",
            type: "reference",
            to: [{type: "artCategory"}]
        },
        {
            name: "markering",
            title: "Kategori",
            type: "string",
            options: {
                list: [
                    {title: "Ingen", value: "ingen"},
                    {title: "Oppdrag", value: "oppdrag"},
                    {title: "Salgsutstilling", value: "salg"},
                ],
                layout: "radio",
            },
            initialValue: "ingen"
        }
    ]
})
