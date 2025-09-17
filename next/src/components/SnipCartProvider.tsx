'use client'

import { useEffect } from 'react'
import { SNIPCART_API_KEY } from "@/lib/env"

export default function SnipcartProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sett Snipcart config bare hvis den ikke finnes fra før
    if (!window.SnipcartSettings) {
      window.SnipcartSettings = {
        publicApiKey: SNIPCART_API_KEY,
        loadStrategy: 'always',
        modalStyle: 'side', // 👈 gjør cart til "drawer"
      }
    }

    // Legg til Snipcart script bare én gang
    if (!document.getElementById('snipcart-script')) {
      const script = document.createElement('script')
      script.id = 'snipcart-script'
      script.src = 'https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.js'
      script.async = true
      document.head.appendChild(script)
    }

    // Legg til Snipcart CSS bare én gang
    if (!document.getElementById('snipcart-css')) {
      const link = document.createElement('link')
      link.id = 'snipcart-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.css'
      document.head.appendChild(link)
    }

    // Legg til Snipcart container bare én gang
    if (!document.getElementById('snipcart')) {
      const snipcartDiv = document.createElement('div')
      snipcartDiv.id = 'snipcart'
      snipcartDiv.hidden = true
      document.body.appendChild(snipcartDiv)
    }
  }, [])

  return null
}
