import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ProductImage } from '@/components/ui/ProductImage'
import { Card, CardContent } from '@/components/ui/Card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <Link href="/admin/produits/nouveau">
          <Button>
            + Nouveau produit
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <ProductImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {product.category.name}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {product.price.toFixed(2)} MAD / {product.unit}
                  </TableCell>
                  <TableCell>
                    {product.inStock ? (
                      <Badge variant="success">En stock</Badge>
                    ) : (
                      <Badge variant="error">Rupture</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/produits/${product.id}/modifier`}>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </Link>
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              Aucun produit. <Link href="/admin/produits/nouveau" className="text-green-600 hover:text-green-700">Créer le premier produit</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
