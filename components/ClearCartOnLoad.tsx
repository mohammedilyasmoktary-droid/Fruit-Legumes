'use client'

import { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

export function ClearCartOnLoad() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Check if we need to clear cart (set from order page)
    if (typeof window !== 'undefined') {
      const shouldClear = sessionStorage.getItem('clearCartOnLoad')
      if (shouldClear === 'true') {
        clearCart()
        sessionStorage.removeItem('clearCartOnLoad')
      }
    }
  }, [clearCart])

  return null
}




