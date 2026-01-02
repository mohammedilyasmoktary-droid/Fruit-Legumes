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
      <section className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 text-6xl md:text-9xl">🍎</div>
          <div className="absolute bottom-20 left-10 text-6xl md:text-9xl">🥕</div>
          <div className="absolute top-1/2 left-1/4 text-5xl md:text-7xl">🍊</div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
            Fruits & Légumes Frais
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de produits frais du jardin, 
            livrés directement chez vous
          </p>
          <Link href="/boutique" className="inline-block">
            <Button size="lg" className="shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Commander maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Catégories vedettes
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Explorez nos collections de produits frais et de saison
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/boutique?categorie=${category.slug}`}
                className="group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-2xl"
              >
                <Card hover className="h-full overflow-hidden flex flex-col">
                  {/* Image Container - Fixed aspect ratio with explicit dimensions */}
                  <div className="relative w-full overflow-hidden bg-gradient-to-br from-green-100 to-orange-100" style={{ aspectRatio: '4/3', minHeight: '200px' }}>
                    {category.imageUrl ? (
                      <ProductImage
                        src={category.imageUrl}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : category.products[0]?.imageUrl ? (
                      <ProductImage
                        src={category.products[0].imageUrl}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-50">
                          {category.slug === 'fruits' ? '🍎' : category.slug === 'legumes' ? '🥕' : category.slug === 'herbes' ? '🌿' : '🛒'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                      {category.description}
                    </p>
                    <div className="flex items-center text-green-600 font-medium text-sm">
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
