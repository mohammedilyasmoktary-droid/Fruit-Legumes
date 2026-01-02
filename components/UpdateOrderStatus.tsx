'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface UpdateOrderStatusProps {
  orderId: string
  currentStatus: string
}

export function UpdateOrderStatus({
  orderId,
  currentStatus,
}: UpdateOrderStatusProps) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const statusLabels: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    EN_PREPARATION: 'En préparation',
    EN_LIVRAISON: 'En livraison',
    LIVREE: 'Livrée',
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Erreur lors de la mise à jour')
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={isUpdating || status === currentStatus}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
      </button>
    </div>
  )
}





