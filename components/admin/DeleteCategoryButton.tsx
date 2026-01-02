'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

interface DeleteCategoryButtonProps {
  categoryId: string
  categoryName: string
  productCount: number
}

export function DeleteCategoryButton({ categoryId, categoryName, productCount }: DeleteCategoryButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Delete button clicked', { categoryId, categoryName, productCount })
    
    // Prevent deletion if category has products
    if (productCount > 0) {
      alert(`Impossible de supprimer "${categoryName}" car elle contient ${productCount} produit(s). Veuillez d'abord supprimer ou déplacer les produits.`)
      return
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ? Cette action est irréversible.`)) {
      return
    }

    setIsDeleting(true)

    try {
      console.log('Sending DELETE request to:', `/api/categories/${categoryId}`)
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        router.refresh()
      } else {
        alert(data.error || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression: ' + (error instanceof Error ? error.message : 'Erreur inconnue'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting || productCount > 0}
      title={productCount > 0 ? `Impossible de supprimer: ${productCount} produit(s) associé(s)` : 'Supprimer la catégorie'}
      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </button>
  )
}

