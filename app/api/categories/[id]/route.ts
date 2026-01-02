import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const { id } = resolvedParams
    
    const body = await request.json()
    console.log('Received data:', body)
    
    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Le nom et le slug sont requis' },
        { status: 400 }
      )
    }
    
    // Check if slug is already taken by another category
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug: body.slug,
        id: { not: id },
      },
    })
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Ce slug est déjà utilisé par une autre catégorie' },
        { status: 400 }
      )
    }
    
    // Build update data object with only valid fields
    const updateData: {
      name: string
      slug: string
      description?: string | null
      imageUrl?: string | null
    } = {
      name: String(body.name).trim(),
      slug: String(body.slug).trim(),
    }
    
    // Handle optional fields - convert empty strings to null
    if ('description' in body) {
      updateData.description = body.description === '' || body.description === null ? null : String(body.description)
    }
    if ('imageUrl' in body) {
      updateData.imageUrl = body.imageUrl === '' || body.imageUrl === null ? null : String(body.imageUrl)
    }
    
    console.log('Updating category:', id, 'with data:', JSON.stringify(updateData, null, 2))
    
    // Verify category exists first
    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Catégorie non trouvée' },
        { status: 404 }
      )
    }
    
    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    })
    return NextResponse.json(category)
  } catch (error: any) {
    console.error('Error updating category:', error)
    // Return more detailed error message
    const errorMessage = error?.message || 'Failed to update category'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const { id } = resolvedParams
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Catégorie non trouvée' },
        { status: 404 }
      )
    }
    
    // Prevent deletion if category has products
    if (category._count.products > 0) {
      return NextResponse.json(
        { 
          error: `Impossible de supprimer cette catégorie car elle contient ${category._count.products} produit(s). Veuillez d'abord supprimer ou déplacer les produits.` 
        },
        { status: 400 }
      )
    }
    
    // Delete the category
    await prisma.category.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: error?.message || 'Erreur lors de la suppression de la catégorie' },
      { status: 500 }
    )
  }
}

