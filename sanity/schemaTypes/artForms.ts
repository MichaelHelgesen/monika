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
        defineField({
            name: "description",
            type: "text",
            title: "Beskrivelse"
        }),
defineField({
      name: "image",
      type: "image",
      title: "Bilde",
      options: {
        hotspot: true, // gjør det mulig å velge fokuspunkter
      },
    }),
    ]
})

