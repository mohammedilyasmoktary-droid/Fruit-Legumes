'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductImage } from '@/components/ui/ProductImage'

export default function OrderPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [errors, setErrors] = useState<{ address?: string; phone?: string }>({})

  const subtotal = getTotal()
  const deliveryFee = 5.0
  const total = subtotal + deliveryFee

  const validateForm = () => {
    const newErrors: { address?: string; phone?: string } = {}
    
    if (!deliveryAddress.trim()) {
      newErrors.address = 'L\'adresse de livraison est requise'
    }
    
    if (!customerPhone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis'
    } else if (!/^[0-9+\s\-()]+$/.test(customerPhone.trim())) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal,
          deliveryFee,
          total,
          deliveryAddress: deliveryAddress.trim(),
          customerPhone: customerPhone.trim(),
          deliveryInstructions: deliveryInstructions.trim() || undefined,
        }),
      })

      if (response.ok) {
        const order = await response.json()
        if (!order || !order.id) {
          console.error('Order ID missing:', order)
          alert('Erreur : la commande n\'a pas d\'identifiant')
          setIsSubmitting(false)
          return
        }
        // Redirect immediately without clearing cart first
        // Cart will be cleared on the confirmation page
        const orderId = order.id
        if (typeof window !== 'undefined') {
          // Store flag to clear cart on confirmation page FIRST
          sessionStorage.setItem('clearCartOnLoad', 'true')
          // Set redirecting flag to prevent cart redirect
          setIsRedirecting(true)
          // Use replace instead of href to avoid back button issues
          // Redirect immediately (don't clear cart here to avoid React re-render redirect)
          window.location.replace(`/commande/confirmation/${orderId}`)
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
        console.error('Order creation failed:', response.status, errorData)
        alert(`Erreur lors de la création de la commande: ${errorData.error || 'Erreur inconnue'}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Erreur lors de la création de la commande')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't redirect to cart if we're in the middle of submitting or redirecting
  // Also check if we're about to redirect to confirmation page
  const isAboutToRedirect = typeof window !== 'undefined' && sessionStorage.getItem('clearCartOnLoad') === 'true'
  
  if (items.length === 0 && !isSubmitting && !isRedirecting && !isAboutToRedirect) {
    if (typeof window !== 'undefined') {
      router.push('/panier')
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          Commande
        </h1>
        
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
          {/* Liste des articles */}
          <Card>
            <CardHeader>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Articles de votre commande
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 md:gap-4 pb-3 md:pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.imageUrl ? (
                        <ProductImage
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-lg md:text-xl">🛒</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                        {item.quantity} × {item.price.toFixed(2)} MAD / {item.unit}
                      </p>
                      <p className="text-sm md:text-base font-semibold text-green-600">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations de livraison */}
          <Card>
            <CardHeader>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Informations de livraison
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse de livraison <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value)
                    if (errors.address) {
                      setErrors({ ...errors, address: undefined })
                    }
                  }}
                  rows={3}
                  required
                  className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none touch-manipulation ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 123 Rue Mohammed V, Casablanca"
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value)
                    if (errors.phone) {
                      setErrors({ ...errors, phone: undefined })
                    }
                  }}
                  required
                  className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 touch-manipulation ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: +212 6XX XXX XXX"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Instructions spéciales (optionnel)
                </label>
                <textarea
                  id="deliveryInstructions"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none touch-manipulation"
                  placeholder="Ex: Sonner deux fois, laisser devant la porte, appeler avant de livrer..."
                />
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Ajoutez des instructions pour faciliter la livraison de votre commande.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Récapitulatif */}
          <Card>
            <CardHeader>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Récapitulatif
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm md:text-base text-gray-700">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-gray-700">
                  <span>Frais de livraison</span>
                  <span className="font-semibold">{deliveryFee.toFixed(2)} MAD</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">{total.toFixed(2)} MAD</span>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full text-base md:text-lg py-3 md:py-4 touch-manipulation"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement...' : 'Valider la commande'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
