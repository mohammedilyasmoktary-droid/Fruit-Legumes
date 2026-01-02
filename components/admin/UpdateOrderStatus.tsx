'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

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
    <div className="flex items-center gap-3">
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={Object.entries(statusLabels).map(([value, label]) => ({
          value,
          label,
        }))}
        className="min-w-[200px]"
      />
      <Button
        onClick={handleUpdate}
        disabled={isUpdating || status === currentStatus}
        size="sm"
      >
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
      </Button>
    </div>
  )
}





