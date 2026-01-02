'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@prisma/client'
import { Button } from '@/components/ui/Button'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(0.5)
  const [inputValue, setInputValue] = useState('0.5')
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Parse the value and update quantity (allow decimals)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0.5) {
      setQuantity(numValue)
    } else if (value === '') {
      // Allow empty input temporarily for better UX
      setQuantity(0.5)
    }
  }

  const handleQuantityBlur = () => {
    // Ensure quantity is at least 0.5 when input loses focus
    const numValue = parseFloat(inputValue)
    if (isNaN(numValue) || numValue < 0.5) {
      setQuantity(0.5)
      setInputValue('0.5')
    } else {
      // Round to nearest 0.5
      const rounded = Math.round(numValue * 2) / 2
      setQuantity(rounded)
      setInputValue(rounded.toString())
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Ensure quantity is valid before adding (minimum 0.5)
    const finalQuantity = Math.max(0.5, quantity)
    const roundedQuantity = Math.round(finalQuantity * 2) / 2 // Round to nearest 0.5
    setQuantity(roundedQuantity)
    setInputValue(roundedQuantity.toString())
    
    try {
      // Add the quantity (can be decimal like 0.5, 1.5, etc.)
      // We'll add items based on the quantity, handling decimals
      const wholePart = Math.floor(roundedQuantity)
      const decimalPart = roundedQuantity % 1
      
      // Add whole units
      for (let i = 0; i < wholePart; i++) {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          imageUrl: product.imageUrl,
        })
      }
      
      // Add half unit if there's a 0.5
      if (Math.abs(decimalPart - 0.5) < 0.01) {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price * 0.5, // Half price for half unit
          unit: product.unit,
          imageUrl: product.imageUrl,
        })
      }
      
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Erreur lors de l\'ajout au panier')
    }
  }

  const handleDecrease = () => {
    const newQuantity = Math.max(0.5, quantity - 0.5)
    const rounded = Math.round(newQuantity * 2) / 2
    setQuantity(rounded)
    setInputValue(rounded.toString())
  }

  const handleIncrease = () => {
    const newQuantity = quantity + 0.5
    const rounded = Math.round(newQuantity * 2) / 2
    setQuantity(rounded)
    setInputValue(rounded.toString())
  }

  // Calculate total price based on quantity
  const displayQuantity = Math.max(0.5, quantity)
  const roundedQuantity = Math.round(displayQuantity * 2) / 2

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-base font-medium text-gray-700 min-w-[80px]">
          Quantité:
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-10 h-10 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all font-semibold text-gray-700"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <input
            type="number"
            value={inputValue}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            min="0.5"
            step="0.5"
            className="w-24 text-center border-2 border-gray-300 rounded-xl py-2 font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label="Quantité"
          />
          <button
            type="button"
            onClick={handleIncrease}
            className="w-10 h-10 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all font-semibold text-gray-700"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price Display */}
      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Total pour {roundedQuantity} {product.unit}:
          </span>
          <span className="text-2xl font-bold text-green-600">
            {(product.price * roundedQuantity).toFixed(2)} MAD
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          {product.price.toFixed(2)} MAD × {roundedQuantity} = {(product.price * roundedQuantity).toFixed(2)} MAD
        </div>
      </div>
      
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="w-full"
      >
        {added ? '✓ Ajouté au panier!' : 'Ajouter au panier'}
      </Button>
    </div>
  )
}
