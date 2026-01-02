'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const placeholder = '/placeholder-product.svg'

  const handleError = () => {
    if (imgSrc !== placeholder && !hasError) {
      setHasError(true)
      setImgSrc(placeholder)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (fill) {
    return (
      <div className={cn('relative overflow-hidden bg-gray-100', className)}>
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            isLoading && 'opacity-0',
            hasError && 'opacity-50'
          )}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-gray-100', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading && 'opacity-0',
          hasError && 'opacity-50'
        )}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
    </div>
  )
}

