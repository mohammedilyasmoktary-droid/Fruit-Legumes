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
        <div className="flex justify-between items-center min-h-[64px] md:min-h-[80px]">
          {/* Logo/Brand - Left */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 md:space-x-3 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg flex-shrink-0" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">🍎</span>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent leading-tight truncate">
                Fruits et Légumes Mogador
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-medium leading-tight">
                Livraison à domicile
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/boutique"
              className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] flex items-center"
            >
              Boutique
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] flex items-center"
            >
              Contact
            </Link>
            <Link
              href="/panier"
              className="relative bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px]"
            >
              <span>🛒</span>
              <span>Panier</span>
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md min-w-[20px] border-2 border-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-h-[44px]"
              title="Interface d'administration"
            >
              <span className="text-base">⚙️</span>
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Actions - Right */}
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
            <Link
              href="/panier"
              className="relative bg-gradient-to-r from-green-500 to-green-600 text-white p-2.5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Panier"
            >
              <span className="text-xl">🛒</span>
              {isMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md min-w-[20px] border-2 border-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <span className="text-2xl block">✕</span>
              ) : (
                <span className="text-2xl block">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-black/20 z-30"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="lg:hidden fixed inset-x-0 top-[64px] md:top-[80px] bg-white z-40 border-b border-gray-200 shadow-lg max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="px-4 py-4 space-y-1">
                <Link
                  href="/boutique"
                  className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Boutique
                </Link>
                <Link
                  href="/contact"
                  className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  className="block py-3 px-4 text-base font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <span>⚙️</span>
                    <span>Admin</span>
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

