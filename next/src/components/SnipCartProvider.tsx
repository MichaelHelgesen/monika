
'use client'

import { useEffect } from 'react'

const snipcartApiKey = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;

if (!snipcartApiKey) {
    throw new Error("Snipcart API-nøkkel mangler. Har du satt NEXT_PUBLIC_SNIPCART_API_KEY?");
}

interface SnipcartSettings {
  publicApiKey: string;
  loadStrategy?: string;
  // legg til flere felter her hvis du bruker dem
}

declare global {
  interface Window {
    SnipcartSettings?: SnipcartSettings;
  }
}

export default function SnipcartProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sett Snipcart config
    window.SnipcartSettings = {
      publicApiKey: snipcartApiKey,
      loadStrategy: 'on-user-interaction', // eller 'always'
    }

    // Dynamisk last Snipcart JS
    const script = document.createElement('script')
    script.src = 'https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.js'
    script.async = true
    document.head.appendChild(script)

    // Dynamisk last CSS hvis ønsket
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.css'
    document.head.prepend(link)

    // Legg til Snipcart container i body (hvis ikke allerede lagt til)
    if (!document.getElementById('snipcart')) {
      const snipcartDiv = document.createElement('div')
      snipcartDiv.id = 'snipcart'
      snipcartDiv.hidden = true
      document.body.appendChild(snipcartDiv)
    }
  }, [])

  return null
}
