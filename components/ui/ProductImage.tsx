'use client'

import { useState, useEffect } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState<string>('/placeholder-product.svg')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Reset error state when src changes
    if (src && src.trim() !== '' && src !== '/placeholder-product.svg') {
      setImgSrc(src)
      setHasError(false)
    } else {
      setImgSrc('/placeholder-product.svg')
      setHasError(false)
    }
  }, [src])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc('/placeholder-product.svg')
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  )
}


