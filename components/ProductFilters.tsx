'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { useState } from 'react'
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
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categorie') || ''
  )
  const [prixMin, setPrixMin] = useState(searchParams.get('prixMin') || '')
  const [prixMax, setPrixMax] = useState(searchParams.get('prixMax') || '')

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

  return (
    <Card className="mb-6 md:mb-8">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
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
          <Button onClick={handleFilter} className="flex-1 sm:flex-none touch-manipulation text-base py-3 md:py-2">
            Filtrer
          </Button>
          <Button variant="outline" onClick={clearFilters} className="flex-1 sm:flex-none touch-manipulation text-base py-3 md:py-2">
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
