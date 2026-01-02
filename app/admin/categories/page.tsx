import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/ui/ProductImage'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Catégories</h1>
          <p className="text-gray-600">Gérez vos catégories de produits</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      {category.imageUrl ? (
                        <ProductImage
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-2xl opacity-50">
                          {category.slug === 'fruits' ? '🍎' : category.slug === 'legumes' ? '🥕' : category.slug === 'herbes' ? '🌿' : '🛒'}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-gray-600 font-mono text-sm">
                    {category.slug}
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {category.description || '-'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {category._count.products}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/categories/${category.id}/modifier`}>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {categories.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              Aucune catégorie.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}




