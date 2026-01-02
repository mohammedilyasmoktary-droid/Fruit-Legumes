import Link from 'next/link'
import { Product } from '@prisma/client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductImage } from '@/components/ui/ProductImage'

interface ProductGridProps {
  products: (Product & { category: { name: string } })[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">
          Aucun produit trouvé. Essayez de modifier vos filtres.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/produit/${product.slug}`}
          className="group"
        >
          <Card hover className="h-full flex flex-col">
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <ProductImage
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <Badge variant="error">Rupture de stock</Badge>
                </div>
              )}
              {product.inStock && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="success">En stock</Badge>
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-2">
                <Badge variant="default" className="text-xs">
                  {product.category.name}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                  {product.description}
                </p>
              )}
              <div className="flex items-baseline justify-between mt-auto">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toFixed(2)} MAD
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    /{product.unit}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
