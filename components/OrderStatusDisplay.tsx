'use client'

import { useState, useEffect, useCallback } from 'react'
import { Badge } from '@/components/ui/Badge'
import { RefreshOrderButton } from '@/components/RefreshOrderButton'

interface OrderStatusDisplayProps {
  orderId: string
  initialStatus: string
}

const statusLabels: Record<string, string> = {
  EN_ATTENTE: 'En attente',
  EN_PREPARATION: 'En préparation',
  EN_LIVRAISON: 'En livraison',
  LIVREE: 'Livrée',
}

const statusVariants: Record<string, 'warning' | 'default' | 'success'> = {
  EN_ATTENTE: 'warning',
  EN_PREPARATION: 'default',
  EN_LIVRAISON: 'default',
  LIVREE: 'success',
}

const statusDescriptions: Record<string, string> = {
  EN_ATTENTE: 'Votre commande a été reçue et est en attente de traitement.',
  EN_PREPARATION: 'Votre commande est en cours de préparation.',
  EN_LIVRAISON: 'Votre commande est en cours de livraison.',
  LIVREE: 'Votre commande a été livrée avec succès.',
}

export function OrderStatusDisplay({ orderId, initialStatus }: OrderStatusDisplayProps) {
  const [status, setStatus] = useState(initialStatus)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure we're mounted before doing client-side updates
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchStatus = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const order = await response.json()
        setStatus(order.status)
      }
    } catch (error) {
      console.error('Error fetching order status:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [orderId])

  // Auto-refresh every 30 seconds (only after mount)
  useEffect(() => {
    if (!isMounted) return
    
    const interval = setInterval(() => {
      fetchStatus()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [fetchStatus, isMounted])

  // Sync with initialStatus if it changes (from server)
  useEffect(() => {
    if (isMounted) {
      setStatus(initialStatus)
    }
  }, [initialStatus, isMounted])

  // Use initialStatus during SSR to avoid hydration mismatch
  const displayStatus = isMounted ? status : initialStatus

  return (
    <div className="text-center">
      <Badge 
        variant={statusVariants[displayStatus]} 
        className="text-lg px-6 py-3 mb-4"
      >
        {statusLabels[displayStatus]}
      </Badge>
      <p className="text-gray-700 mt-4">
        {statusDescriptions[displayStatus]}
      </p>
      {isMounted && (
        <div className="mt-6">
          <RefreshOrderButton 
            orderId={orderId} 
            onRefresh={fetchStatus}
            isRefreshing={isRefreshing}
          />
        </div>
      )}
    </div>
  )
}

