import { defineField, defineType } from "sanity"

export const pages = defineType({
  name: "page",
  title: "Sider",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO / Metadata",
      options: {
        collapsible: true,
        collapsed: false, // sett true hvis du vil starte lukket
      }
    }
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tittel"
    }),
    defineField({
      name: "slug",
      type: "slug",
      readOnly: () => process.env.NODE_ENV !== 'development',
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
      }
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Innhold',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
    defineField({
      name: "menuTitle",
      type: "string",
      title: "Menytittel",
      description: "Vises i menyen. Hvis tom, brukes 'Tittel'."
    }),
    defineField({
      name: "showInMenu",
      type: "boolean",
      title: "Vis i menyen",
      initialValue: true
    }),
    defineField({
      name: "menuOrder",
      type: "number",
      title: "Sorteringsrekkefølge i menyen"
    }),
    defineField({
      name: "artForm",
      title: "Referanse til kunstform",
      type: "reference",
      to: [{ type: "artForm" }]
    }),
    // --- SEO / Metadata felt ---
    defineField({
      name: "metaTitle",
      title: "Metatittel",
      type: "string",
      fieldset: "seo"
    }),
    defineField({
      name: "metaDescription",
      title: "Metabeskrivelse",
      type: "text",
      fieldset: "seo"
    }),
    defineField({
      name: "metaImage",
      title: "Metabilde",
      type: "image",
      fieldset: "seo",
      options: {
        hotspot: true
      }
    }),
  ]
})
