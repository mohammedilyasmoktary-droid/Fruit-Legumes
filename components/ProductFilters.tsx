'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categorie') || ''
  )
  const [prixMin, setPrixMin] = useState(searchParams.get('prixMin') || '')
  const [prixMax, setPrixMax] = useState(searchParams.get('prixMax') || '')
  const contentRef = useRef<HTMLDivElement>(null)

  // Check if any filters are active to auto-open panel
  useEffect(() => {
    const hasActiveFilters = 
      searchParams.get('search') || 
      searchParams.get('categorie') || 
      searchParams.get('prixMin') || 
      searchParams.get('prixMax')
    
    if (hasActiveFilters) {
      setIsOpen(true)
    }
  }, [searchParams])

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedCategory) params.set('categorie', selectedCategory)
    if (prixMin) params.set('prixMin', prixMin)
    if (prixMax) params.set('prixMax', prixMax)
    router.push(`/boutique?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setPrixMin('')
    setPrixMax('')
    router.push('/boutique')
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  // Check if any filters are currently active
  const hasActiveFilters = search || selectedCategory || prixMin || prixMax

  return (
    <div className="mb-6 md:mb-8">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleFilters}
        aria-expanded={isOpen}
        aria-controls="filters-panel"
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4 touch-manipulation ${
          hasActiveFilters
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
        }`}
      >
        <span className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <span>🔍</span>
          <span>Filtres</span>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
              Actif
            </span>
          )}
        </span>
        <span
          className={`text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Collapsible Panel */}
      <div
        id="filters-panel"
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                label="Recherche"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nom du produit..."
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              />
              
              <Select
                label="Catégorie"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: '', label: 'Toutes les catégories' },
                  ...categories.map((cat) => ({
                    value: cat.slug,
                    label: cat.name,
                  })),
                ]}
              />
              
              <Input
                label="Prix min (MAD)"
                type="number"
                value={prixMin}
                onChange={(e) => setPrixMin(e.target.value)}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
              
              <Input
                label="Prix max (MAD)"
                type="number"
                value={prixMax}
                onChange={(e) => setPrixMax(e.target.value)}
                step="0.01"
                min="0"
                placeholder="100.00"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleFilter} 
                className="flex-1 sm:flex-none touch-manipulation"
                size="md"
              >
                Filtrer
              </Button>
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="flex-1 sm:flex-none touch-manipulation"
                size="md"
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
