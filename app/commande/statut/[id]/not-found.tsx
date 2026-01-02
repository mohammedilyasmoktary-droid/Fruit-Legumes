import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function OrderStatusNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <span className="text-6xl">🔍</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commande introuvable
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Désolé, nous n&apos;avons pas pu trouver la commande que vous recherchez.
              Elle a peut-être été supprimée ou le numéro de commande est incorrect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/boutique">
                <Button size="lg">Retour à la boutique</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Retour à l&apos;accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




