import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductFilters } from '@/components/ProductFilters'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SearchParams {
  search?: string
  categorie?: string
  prixMin?: string
  prixMax?: string
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const categories = await prisma.category.findMany()
  
  const where: any = { inStock: true }
  
  if (searchParams.categorie) {
    const category = categories.find((c) => c.slug === searchParams.categorie)
    if (category) {
      where.categoryId = category.id
    }
  }
  
  if (searchParams.prixMin) {
    where.price = { ...where.price, gte: parseFloat(searchParams.prixMin) }
  }
  
  if (searchParams.prixMax) {
    where.price = { ...where.price, lte: parseFloat(searchParams.prixMax) }
  }
  
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  const filteredProducts = searchParams.search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchParams.search!.toLowerCase())
      )
    : products

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Boutique
          </h1>
          <p className="text-lg text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>
        
        <ProductFilters categories={categories} />
        
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
