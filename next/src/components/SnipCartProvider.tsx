
'use client'

import { useEffect } from 'react'

export default function SnipcartProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sett Snipcart config
    window.SnipcartSettings = {
      publicApiKey: 'NGRiNDg3NWItZmU0Yy00ODM5LTllZWQtNGQyNjBkMGE4YjY4NjM4OTAyNDEwNDg5MTEzNjY2',
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
