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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Panier
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.productId} hover={false}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.imageUrl ? (
                        <ProductImage
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-2xl">🛒</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{item.unit}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {item.price.toFixed(2)} MAD
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all font-semibold text-gray-700"
                          aria-label="Diminuer la quantité"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all font-semibold text-gray-700"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right mt-4">
                        <p className="text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} MAD
                        </p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-sm text-red-600 hover:text-red-800 mt-2 font-medium"
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
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">
                  Récapitulatif
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Frais de livraison</span>
                    <span className="font-semibold">{deliveryFee.toFixed(2)} MAD</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-green-600">{total.toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/commande" className="block">
                  <Button size="lg" className="w-full">
                    Passer la commande
                  </Button>
                </Link>
                
                <Link href="/boutique" className="block">
                  <Button variant="outline" className="w-full">
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
