import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

interface SearchParams {
  search?: string
  status?: string
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const where: any = {}
  
  if (searchParams.status) {
    where.status = searchParams.status
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const filteredOrders = searchParams.search
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(searchParams.search!.toLowerCase())
      )
    : orders

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Commandes</h1>
        <p className="text-gray-600">Gérez toutes les commandes</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <form method="get" className="flex gap-4">
            <Input
              name="search"
              placeholder="Rechercher par ID de commande..."
              defaultValue={searchParams.search || ''}
              className="flex-1"
            />
            <Select
              name="status"
              defaultValue={searchParams.status || ''}
              options={[
                { value: '', label: 'Tous les statuts' },
                ...Object.entries(statusLabels).map(([value, label]) => ({
                  value,
                  label,
                })),
              ]}
            />
            <Button type="submit">Filtrer</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
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
                  <TableCell className="text-right">
                    <Link href={`/admin/commandes/${order.id}`}>
                      <Button variant="outline" size="sm">
                        Voir →
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              Aucune commande trouvée.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
