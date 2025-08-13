
import type { DashboardConfig } from '@sanity/dashboard'
import VercelDeployWidget from "./src/widgets/DeployWidget"

export const dashboardConfig: DashboardConfig = {
  widgets: [
    {
      name: 'vercel-deploy',
      component: VercelDeployWidget,
      layout: { width: "medium" },
    },
  ],
}
