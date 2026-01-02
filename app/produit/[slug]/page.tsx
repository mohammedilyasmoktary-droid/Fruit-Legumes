import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/ProductDetail/AddToCartButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductImage } from '@/components/ui/ProductImage'

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                <ProductImage
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="default" className="mb-3">
                {product.category.name}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-green-600">
                  {product.price.toFixed(2)} MAD
                </span>
                <span className="text-xl text-gray-600">/{product.unit}</span>
              </div>
            </div>
            
            {product.description && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </Card>
            )}
            
            <div className="flex items-center gap-3">
              {product.inStock ? (
                <Badge variant="success" className="text-sm py-2 px-4">
                  ✓ En stock
                </Badge>
              ) : (
                <Badge variant="error" className="text-sm py-2 px-4">
                  Rupture de stock
                </Badge>
              )}
            </div>
            
            {product.inStock && (
              <div className="pt-4">
                <AddToCartButton product={product} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
