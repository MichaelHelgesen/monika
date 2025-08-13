import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { dashboardTool } from '@sanity/dashboard'
import { dashboardConfig } from './dashboardConfig'

export default defineConfig({
  name: 'default',
  title: 'kunst',

  projectId: '5id50etx',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), dashboardTool(dashboardConfig)],

  schema: {
    types: schemaTypes,
  },
})
