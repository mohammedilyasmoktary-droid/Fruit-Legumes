import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CategoryForm } from '@/components/CategoryForm'

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams
  
  if (!id || typeof id !== 'string') {
    notFound()
  }
  
  const category = await prisma.category.findUnique({
    where: { id },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="text-gray-600 hover:text-gray-800"
        >
          ← Retour aux catégories
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Modifier la catégorie
      </h1>

      <CategoryForm category={category} />
    </div>
  )
}

