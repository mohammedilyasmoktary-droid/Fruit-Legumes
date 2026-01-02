'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Product, Category } from '@prisma/client'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const productSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  slug: z.string().min(2, 'Le slug doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  price: z.number().min(0, 'Le prix doit être positif'),
  unit: z.string().min(1, 'L\'unité est requise'),
  imageUrl: z.string().min(1, 'L\'image est requise'),
  inStock: z.boolean(),
  categoryId: z.string().min(1, 'La catégorie est requise'),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          price: product.price,
          unit: product.unit,
          imageUrl: product.imageUrl,
          inStock: product.inStock,
          categoryId: product.categoryId,
        }
      : {
          inStock: true,
        },
  })

  const watchedImageUrl = watch('imageUrl')
  
  // Sync previewUrl with watchedImageUrl
  useEffect(() => {
    if (watchedImageUrl) {
      setPreviewUrl(watchedImageUrl)
    }
  }, [watchedImageUrl])
  const watchedName = watch('name')

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        // Vérifier si la réponse est du JSON
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json()
          throw new Error(error.error || 'Erreur lors de l\'upload')
        } else {
          // Si ce n'est pas du JSON, lire le texte pour voir l'erreur
          const text = await response.text()
          throw new Error(`Erreur ${response.status}: ${text.substring(0, 100)}`)
        }
      }

      const data = await response.json()
      console.log('Upload successful, image URL:', data.url)
      // Set the image URL and trigger validation
      setValue('imageUrl', data.url, { shouldValidate: true, shouldDirty: true })
      // Update preview immediately
      setPreviewUrl(data.url)
      setUploadError('')
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploadError(error.message || 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    try {
      const url = product
        ? `/api/products/${product.id}`
        : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/produits')
        router.refresh()
      } else {
        alert('Erreur lors de l\'enregistrement')
      }
    } catch (error) {
      alert('Erreur lors de l\'enregistrement')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-900">Informations du produit</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Nom *"
            {...register('name')}
            onChange={(e) => {
              register('name').onChange(e)
              if (!product) {
                setValue('slug', generateSlug(e.target.value))
              }
            }}
            error={errors.name?.message}
          />

          <Input
            label="Slug *"
            {...register('slug')}
            error={errors.slug?.message}
          />

          <Input
            label="Description"
            {...register('description')}
            as="textarea"
            rows={3}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prix (MAD) *"
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
            />

            <Input
              label="Unité *"
              {...register('unit')}
              placeholder="kg, pièce, botte..."
              error={errors.unit?.message}
            />
          </div>

          <Select
            label="Catégorie *"
            {...register('categoryId')}
            options={[
              { value: '', label: 'Sélectionner une catégorie' },
              ...categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              })),
            ]}
            error={errors.categoryId?.message}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('inStock')}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm font-medium text-gray-700">
              En stock
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-900">Image du produit</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image *
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? 'Upload en cours...' : 'Choisir une image'}
              </Button>
              {(watchedImageUrl || previewUrl) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setValue('imageUrl', '')
                    setPreviewUrl(null)
                  }}
                >
                  Supprimer
                </Button>
              )}
            </div>
            {uploadError && (
              <p className="mt-2 text-sm text-red-600">{uploadError}</p>
            )}
            {errors.imageUrl && (
              <p className="mt-2 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>

          {(watchedImageUrl || previewUrl) && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Aperçu:</p>
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
                <Image
                  src={previewUrl || watchedImageUrl || '/placeholder-product.svg'}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">{previewUrl || watchedImageUrl}</p>
            </div>
          )}

          <input
            type="hidden"
            {...register('imageUrl')}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer le produit'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/produits')}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
