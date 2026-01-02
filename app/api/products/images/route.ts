import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const productsDir = join(process.cwd(), 'public', 'products')
    const files = await readdir(productsDir)
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/products/${file}`)
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({ images: [] })
  }
}





