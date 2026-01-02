import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductImage } from '@/components/ui/ProductImage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: { inStock: true },
        take: 3,
      },
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-6xl md:text-9xl">🍎</div>
          <div className="absolute bottom-20 left-10 text-6xl md:text-9xl">🥕</div>
          <div className="absolute top-1/2 left-1/4 text-5xl md:text-7xl">🍊</div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-600 via-green-500 to-orange-500 bg-clip-text text-transparent px-2">
            Fruits & Légumes Frais
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
            Découvrez notre sélection de produits frais du jardin, 
            livrés directement chez vous
          </p>
          <Link href="/boutique">
            <Button size="lg" className="shadow-primeur-lg hover:scale-105 transition-transform text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              Commander maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4 px-2">
              Catégories vedettes
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Explorez nos collections de produits frais et de saison
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/boutique?categorie=${category.slug}`}
                className="group"
              >
                <Card hover className="h-full">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-orange-100">
                    {category.imageUrl ? (
                      <ProductImage
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : category.products[0] ? (
                      <ProductImage
                        src={category.products[0].imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-6xl opacity-50">
                          {category.slug === 'fruits' ? '🍎' : category.slug === 'legumes' ? '🥕' : category.slug === 'herbes' ? '🌿' : '🛒'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-green-600 font-medium text-sm">
                      Découvrir
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
