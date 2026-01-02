'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
    if (src && src.trim() !== '') {
      setImgSrc(src)
      setHasError(false)
    } else {
      setImgSrc('/placeholder-product.svg')
      setHasError(false)
    }
  }, [src])

  // Use a wrapper div to handle errors since Next.js Image doesn't support onError directly
  if (hasError || !imgSrc || imgSrc === '/placeholder-product.svg') {
    return (
      <Image
        src="/placeholder-product.svg"
        alt={alt}
        width={400}
        height={400}
        className={className}
        unoptimized
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={400}
      height={400}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true)
        }
      }}
      unoptimized
    />
  )
}


