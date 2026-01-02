'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Une erreur s&apos;est produite
          </h2>
          <p className="text-gray-600 mb-6">
            Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset}>
              Réessayer
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour à l&apos;accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}





