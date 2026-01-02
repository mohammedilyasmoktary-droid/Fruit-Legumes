'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export function Navigation() {
  const { getItemCount, items } = useCart()
  const [itemCount, setItemCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update count when cart changes (only after mount)
  useEffect(() => {
    if (isMounted) {
      setItemCount(getItemCount())
    }
  }, [items, isMounted, getItemCount])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-200">🍎</span>
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent leading-tight">
                Fruits et Légumes Mogador
              </span>
              <span className="text-[10px] md:text-xs text-gray-600 font-medium leading-tight">
                Livraison à domicile
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/boutique"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base"
            >
              Boutique
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base"
            >
              Contact
            </Link>
            <Link
              href="/panier"
              className="relative text-gray-700 hover:text-green-600 transition-colors font-medium text-base px-2 py-1"
            >
              Panier
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
              title="Interface d'administration"
            >
              <span className="text-base md:text-lg">⚙️</span>
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Cart Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/panier"
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-2xl">🛒</span>
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/boutique"
                className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Boutique
              </Link>
              <Link
                href="/contact"
                className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="block py-3 px-4 text-lg font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <span>⚙️</span>
                  <span>Admin</span>
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

