import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ProductForm } from '@/components/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/produits"
          className="text-gray-600 hover:text-gray-800"
        >
          ← Retour aux produits
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Nouveau produit
      </h1>

      <ProductForm categories={categories} />
    </div>
  )
}





