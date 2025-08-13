// src/widgets/VercelDeployWidget.tsx
'use client'

import { useState } from 'react'

const url = process.env.SANITY_STUDIO_HOOK;

export default function VercelDeployWidget() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const triggerDeploy = async () => {
    setIsDeploying(true)
    setStatus(null)

    try {
      const res = await fetch(url as string, {
        method: 'POST',
      })
      if (res.ok) {
        setStatus('Deploy trigget! 🚀')
      } else {
        setStatus(`Feil: ${res.statusText}`)
      }
    } catch (err) {
      setStatus('En feil oppstod under deploy.')
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Publiser nettsiden</h2>
      <button onClick={triggerDeploy} disabled={isDeploying}>
        {isDeploying ? 'Deploy pågår...' : 'Publiser nettsiden'}
      </button>
      {status && <p>{status}</p>}
    </div>
  )
}
