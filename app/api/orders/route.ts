import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      items,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
      customerPhone,
      deliveryInstructions,
    } = body

    // Validation côté serveur
    if (!deliveryAddress || !deliveryAddress.trim()) {
      return NextResponse.json(
        { error: 'L\'adresse de livraison est requise' },
        { status: 400 }
      )
    }

    if (!customerPhone || !customerPhone.trim()) {
      return NextResponse.json(
        { error: 'Le numéro de téléphone est requis' },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        customerName: 'Client',
        customerEmail: 'client@example.com',
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        deliverySlot: 'matin',
        deliveryNotes: deliveryInstructions || null,
        subtotal,
        deliveryFee,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
