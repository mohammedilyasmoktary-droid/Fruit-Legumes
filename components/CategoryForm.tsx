'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Category } from '@prisma/client'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const categorySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  slug: z.string().min(2, 'Le slug doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(category.imageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
    },
  })

  const watchedImageUrl = watch('imageUrl')

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
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json()
          throw new Error(error.error || 'Erreur lors de l\'upload')
        } else {
          const text = await response.text()
          throw new Error(`Erreur ${response.status}: ${text.substring(0, 100)}`)
        }
      }

      const data = await response.json()
      console.log('Upload successful, image URL:', data.url)
      setValue('imageUrl', data.url, { shouldValidate: true, shouldDirty: true })
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

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    try {
      // Prepare data for API - only send defined fields
      const payload: any = {
        name: data.name.trim(),
        slug: data.slug.trim(),
      }
      
      // Only include optional fields if they have values
      if (data.description !== undefined) {
        payload.description = data.description || null
      }
      if (data.imageUrl !== undefined) {
        payload.imageUrl = data.imageUrl || null
      }
      
      console.log('Submitting category data:', payload)
      
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/categories')
        router.refresh()
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
        console.error('Error response:', response.status, errorData)
        alert(`Erreur lors de l'enregistrement: ${errorData.error || 'Erreur inconnue'}`)
      }
    } catch (error: any) {
      console.error('Error submitting form:', error)
      alert(`Erreur lors de l'enregistrement: ${error.message || 'Erreur inconnue'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-900">Informations de la catégorie</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Nom *"
            {...register('name')}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image de la catégorie
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
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
                <img
                  src={previewUrl || watchedImageUrl || ''}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-product.svg'
                  }}
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
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? 'Enregistrement...' : 'Mettre à jour'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push('/admin/categories')}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

