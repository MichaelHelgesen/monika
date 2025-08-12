import {defineField, defineType} from "sanity"

export const journal = defineType ({
    name: "journal",
    title: "Dagbok",
    type: "document",
    fields: [
        defineField({
            name: "Tittel",
            type: "string",
        }),
        defineField({
            name: "Beskrivelse",
            type: "array",
            of: [
                    {
                        type: 'block'
                    },
                    {
                        type: 'image',
                        fields: [
                            {
                                type: 'text',
                                name: 'alt',
                                title: 'Alternative text',
                                description: `Some of your visitors cannot see images, 
                                be they blind, color-blind, low-sighted; 
                                alternative text is of great help for those 
                                people that can rely on it to have a good idea of 
                                what\'s on your page.`,
                                options: {
                                    isHighlighted: true
                                }
                            }
                        ]
                    }
            ]
        }),
    ]
})

