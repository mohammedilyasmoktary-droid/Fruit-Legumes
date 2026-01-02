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

  const handleDelete = async () => {
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
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        router.refresh()
      } else {
        alert(data.error || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
      onClick={handleDelete}
      disabled={isDeleting || productCount > 0}
      title={productCount > 0 ? `Impossible de supprimer: ${productCount} produit(s) associé(s)` : 'Supprimer la catégorie'}
    >
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </Button>
  )
}

