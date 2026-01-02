'use client'

import { useCart } from '@/contexts/CartContext'
import { ProductImage } from '@/components/ui/ProductImage'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import Link from 'next/link'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const subtotal = getTotal()
  const deliveryFee = 5.0
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <EmptyState
            icon="🛒"
            title="Votre panier est vide"
            description="Découvrez nos produits frais et ajoutez-les à votre panier."
            action={
              <Link href="/boutique">
                <Button>Continuer les achats</Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          Panier
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {items.map((item) => (
              <Card key={item.productId} hover={false}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-3 md:gap-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.imageUrl ? (
                        <ProductImage
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-xl md:text-2xl">🛒</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">{item.unit}</p>
                      <p className="text-base md:text-lg font-semibold text-green-600">
                        {item.price.toFixed(2)} MAD
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-10 h-10 md:w-9 md:h-9 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 active:bg-green-100 transition-all font-semibold text-gray-700 text-lg md:text-base flex items-center justify-center touch-manipulation"
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>
                        <span className="w-10 md:w-12 text-center font-semibold text-gray-900 text-sm md:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-10 h-10 md:w-9 md:h-9 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 active:bg-green-100 transition-all font-semibold text-gray-700 text-lg md:text-base flex items-center justify-center touch-manipulation"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-base md:text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} MAD
                        </p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs md:text-sm text-red-600 hover:text-red-800 mt-1 md:mt-2 font-medium py-1 px-2 -mx-2 touch-manipulation"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-20 md:top-24">
              <CardHeader>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Récapitulatif
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
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
                
                <Link href="/commande" className="block">
                  <Button size="lg" className="w-full text-base md:text-lg py-3 md:py-4 touch-manipulation">
                    Passer la commande
                  </Button>
                </Link>
                
                <Link href="/boutique" className="block">
                  <Button variant="outline" className="w-full text-base md:text-lg py-3 md:py-4 touch-manipulation">
                    Continuer les achats
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
