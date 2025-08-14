import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { dashboardTool } from '@sanity/dashboard'
import { dashboardConfig } from './dashboardConfig'
//import { deskTool } from "sanity/desk"
//import { structure } from "./deskStructure"

export default defineConfig({
  name: 'default',
  title: 'kunst',

  projectId: '5id50etx',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), dashboardTool(dashboardConfig)],

  schema: {
    types: schemaTypes,
  },

// Skjule opprettelse av ny side
  // i structure og global, hvis ikke developement mode.
document: {
  newDocumentOptions: (prev, { creationContext }) => {
    const isDev = process.env.NODE_ENV === 'development'
    const restrictedTemplates = ['page'] // legg til flere her ved behov
    const restrictedContexts = ['structure', 'global']

    // Hvis vi IKKE er i utviklingsmodus, og konteksten er begrenset
    if (!isDev && restrictedContexts.includes(creationContext.type)) {
      return prev.filter(
        (template) => !restrictedTemplates.includes(template.templateId)
      )
    }

    return prev
  },
},
})
