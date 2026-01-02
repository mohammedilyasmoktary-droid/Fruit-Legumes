import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

export default async function ConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    notFound()
  }

  const statusLabels: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    EN_PREPARATION: 'En préparation',
    EN_LIVRAISON: 'En livraison',
    LIVREE: 'Livrée',
  }

  const slotLabels: Record<string, string> = {
    matin: 'Matin (9h - 12h)',
    'après-midi': 'Après-midi (14h - 17h)',
    soir: 'Soir (17h - 20h)',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 mb-6 shadow-lg">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Merci pour votre commande. Nous avons bien reçu votre demande et vous contacterons bientôt pour confirmer la livraison.
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Détails de la commande
              </h2>
              <Badge variant="warning" className="text-sm">
                {statusLabels[order.status]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
                <p className="font-mono font-semibold text-gray-900">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date de commande</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Informations de livraison */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Informations de livraison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Adresse de livraison</p>
                  <p className="font-medium text-gray-900 whitespace-pre-line">
                    {order.deliveryAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Numéro de téléphone</p>
                  <p className="font-medium text-gray-900">{order.customerPhone}</p>
                </div>
              </div>
              {order.deliveryNotes && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Instructions spéciales</p>
                  <p className="font-medium text-gray-900 whitespace-pre-line">
                    {order.deliveryNotes}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Articles commandés</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.product.unit} × {item.price.toFixed(2)} MAD
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} MAD
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Sous-total</span>
                <span className="font-semibold">{order.subtotal.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Frais de livraison</span>
                <span className="font-semibold">{order.deliveryFee.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span className="text-green-600">{order.total.toFixed(2)} MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-green-50 to-orange-50 border-green-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Prochaines étapes</h3>
            <ul className="space-y-2 text-gray-700 text-sm mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Votre commande a été enregistrée avec succès</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Nous préparerons votre commande et vous contacterons bientôt</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/boutique" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continuer les achats
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full">
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
