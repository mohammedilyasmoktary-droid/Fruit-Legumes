'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

interface DeleteCategoryButtonProps {
  categoryId: string
  categoryName: string
  productCount: number
}

export function DeleteCategoryButton({ categoryId, categoryName, productCount }: DeleteCategoryButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setShowConfirm(false)
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        router.refresh()
      } else {
        alert(data.error || 'Erreur lors de la suppression')
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression: ' + (error instanceof Error ? error.message : 'Erreur inconnue'))
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  const getConfirmMessage = () => {
    if (productCount > 0) {
      return `Cette catégorie contient ${productCount} produit(s).\n\nEn supprimant cette catégorie, tous les produits associés seront également supprimés de manière permanente.\n\nCette action est irréversible.`
    }
    return `Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?\n\nCette action est irréversible.`
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDeleteClick}
        disabled={isDeleting}
        title={productCount > 0 ? `Supprimer la catégorie et ${productCount} produit(s) associé(s)` : 'Supprimer la catégorie'}
        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        {isDeleting ? 'Suppression...' : 'Supprimer'}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        title={productCount > 0 ? '⚠️ Attention' : 'Confirmer la suppression'}
        message={getConfirmMessage()}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        variant={productCount > 0 ? 'warning' : 'danger'}
      />
    </>
  )
}

