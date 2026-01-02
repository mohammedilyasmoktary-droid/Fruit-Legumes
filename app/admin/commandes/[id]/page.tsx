import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { UpdateOrderStatus } from '@/components/admin/UpdateOrderStatus'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default async function AdminOrderDetailPage({
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
    <div>
      <div className="mb-6">
        <Link href="/admin/commandes">
          <Button variant="outline">← Retour aux commandes</Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Commande #{order.orderNumber}
          </h1>
          <p className="text-gray-600">
            Créée le {new Date(order.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Statut de la commande
            </h2>
            <Badge variant={order.status === 'LIVREE' ? 'success' : 'warning'}>
              {statusLabels[order.status]}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Informations de la commande
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
                <p className="font-mono font-semibold text-gray-900">#{order.orderNumber}</p>
              </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date de création</p>
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
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Informations client
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.customerName && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Nom</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
              </div>
            )}
            {order.customerEmail && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium text-gray-900">{order.customerEmail}</p>
              </div>
            )}
            {order.customerPhone && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                <p className="font-medium text-gray-900">{order.customerPhone}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
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
            {order.deliverySlot && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Créneau de livraison</p>
                <p className="font-medium text-gray-900">
                  {slotLabels[order.deliverySlot] || order.deliverySlot}
                </p>
              </div>
            )}
            {order.deliveryNotes && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Instructions de livraison</p>
                <p className="font-medium text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                  {order.deliveryNotes}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Articles commandés
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
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
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Sous-total</span>
              <span className="font-semibold">{order.subtotal.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Frais de livraison</span>
              <span className="font-semibold">{order.deliveryFee.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span className="text-green-600">{order.total.toFixed(2)} MAD</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}