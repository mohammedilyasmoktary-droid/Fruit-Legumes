import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

export default async function AdminDashboard() {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const orders7d = await prisma.order.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
  })

  const orders30d = await prisma.order.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
  })

  const allOrders = await prisma.order.findMany()

  const totalRevenue7d = orders7d.reduce((sum, o) => sum + o.total, 0)
  const totalRevenue30d = orders30d.reduce((sum, o) => sum + o.total, 0)

  const avgBasket7d = orders7d.length > 0 ? totalRevenue7d / orders7d.length : 0
  const avgBasket30d = orders30d.length > 0 ? totalRevenue30d / orders30d.length : 0

  const ordersByStatus = allOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  })

  const statusLabels: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    EN_PREPARATION: 'En préparation',
    EN_LIVRAISON: 'En livraison',
    LIVREE: 'Livrée',
  }

  const statusVariants: Record<string, 'warning' | 'info' | 'success'> = {
    EN_ATTENTE: 'warning',
    EN_PREPARATION: 'info',
    EN_LIVRAISON: 'info',
    LIVREE: 'success',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
            <p className="text-gray-600">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Commandes (7j)</p>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{orders7d.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Commandes (30j)</p>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{orders30d.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">CA Total (30j)</p>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {totalRevenue30d.toFixed(2)} MAD
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Panier moyen (30j)</p>
              <span className="text-2xl">🛒</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {avgBasket30d.toFixed(2)} MAD
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Status */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Commandes par statut</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">{label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ordersByStatus[status] || 0}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Dernières commandes</h2>
            <Link
              href="/admin/commandes"
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              Voir toutes →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-semibold">
                    #{order.orderNumber}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {order.total.toFixed(2)} MAD
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[order.status] || 'default'}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/commandes/${order.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Voir →
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {recentOrders.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              Aucune commande pour le moment
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
