'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export function Navigation() {
  const { getItemCount, items } = useCart()
  const [itemCount, setItemCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update count when cart changes (only after mount)
  useEffect(() => {
    if (isMounted) {
      setItemCount(getItemCount())
    }
  }, [items, isMounted, getItemCount])

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🍎</span>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Fruits et Légumes Mogador
              </span>
              <span className="text-xs text-gray-600 font-medium">
                Livraison à domicile
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/boutique"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Boutique
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="/panier"
              className="relative text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Panier
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

