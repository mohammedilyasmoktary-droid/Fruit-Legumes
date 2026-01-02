import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await request.formData()
  const method = formData.get('_method')

  if (method === 'DELETE') {
    try {
      await prisma.product.delete({
        where: { id: params.id },
      })
      return NextResponse.redirect(new URL('/admin/produits', request.url))
    } catch (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}





