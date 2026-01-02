import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/ui/ProductImage'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { OrderStatusDisplay } from '@/components/OrderStatusDisplay'

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams
  
  if (!id || typeof id !== 'string') {
    notFound()
  }

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

  const statusVariants: Record<string, 'warning' | 'default' | 'success'> = {
    EN_ATTENTE: 'warning',
    EN_PREPARATION: 'default',
    EN_LIVRAISON: 'default',
    LIVREE: 'success',
  }

  const statusDescriptions: Record<string, string> = {
    EN_ATTENTE: 'Votre commande a été reçue et est en attente de traitement.',
    EN_PREPARATION: 'Votre commande est en cours de préparation.',
    EN_LIVRAISON: 'Votre commande est en cours de livraison.',
    LIVREE: 'Votre commande a été livrée avec succès.',
  }

  const slotLabels: Record<string, string> = {
    matin: 'Matin (9h - 12h)',
    'après-midi': 'Après-midi (14h - 17h)',
    soir: 'Soir (17h - 20h)',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Suivi de commande
          </h1>
          <p className="text-lg text-gray-600">
            Numéro de commande: <span className="font-mono font-semibold">#{order.orderNumber}</span>
          </p>
        </div>

        {/* Status Card - Prominent */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-orange-50 border-green-200">
          <CardContent className="p-8">
            <OrderStatusDisplay orderId={order.id} initialStatus={order.status} />
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">
              Détails de la commande
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {order.deliverySlot && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Créneau de livraison</p>
                  <p className="font-medium text-gray-900">
                    {slotLabels[order.deliverySlot] || order.deliverySlot}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">
              Informations de livraison
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.deliveryAddress && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Adresse de livraison</p>
                  <p className="font-medium text-gray-900 whitespace-pre-line">
                    {order.deliveryAddress}
                  </p>
                </div>
              )}
              {order.customerPhone && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                  <p className="font-medium text-gray-900">{order.customerPhone}</p>
                </div>
              )}
              {order.deliveryNotes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Instructions spéciales</p>
                  <p className="font-medium text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                    {order.deliveryNotes}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">
              Articles commandés
            </h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Total ligne</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <ProductImage
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">{item.product.unit}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-gray-900">
                        {item.price.toFixed(2)} MAD
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-gray-900">{item.quantity}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-gray-900">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totals Summary */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Sous-total</span>
                <span className="font-semibold">{order.subtotal.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Frais de livraison</span>
                <span className="font-semibold">{order.deliveryFee.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300">
                <span>Total</span>
                <span className="text-green-600">{order.total.toFixed(2)} MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/boutique" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Retour à la boutique
            </Button>
          </Link>
          <Link href={`/commande/confirmation/${order.id}`} className="flex-1">
            <Button variant="secondary" className="w-full" size="lg">
              Voir la confirmation complète
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

