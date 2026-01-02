'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface RefreshOrderButtonProps {
  orderId: string
  onRefresh?: () => Promise<void>
  isRefreshing?: boolean
}

export function RefreshOrderButton({ 
  orderId, 
  onRefresh,
  isRefreshing: externalIsRefreshing 
}: RefreshOrderButtonProps) {
  const [internalIsRefreshing, setInternalIsRefreshing] = useState(false)
  const router = useRouter()
  
  const isRefreshing = externalIsRefreshing !== undefined ? externalIsRefreshing : internalIsRefreshing

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh()
    } else {
      setInternalIsRefreshing(true)
      try {
        // Refetch the order data
        const response = await fetch(`/api/orders/${orderId}`)
        if (response.ok) {
          // Refresh the page to show updated data
          router.refresh()
        }
      } catch (error) {
        console.error('Error refreshing order:', error)
      } finally {
        setInternalIsRefreshing(false)
      }
    }
  }

  return (
    <Button
      onClick={handleRefresh}
      disabled={isRefreshing}
      variant="outline"
      size="sm"
    >
      {isRefreshing ? 'Actualisation...' : 'Actualiser le statut'}
    </Button>
  )
}


