import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Vérification de la base de données...\n')
    
    // Vérifier les catégories
    const categories = await prisma.category.findMany()
    console.log(`✅ Catégories: ${categories.length}`)
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`)
    })
    
    // Vérifier les produits
    const allProducts = await prisma.product.findMany()
    console.log(`\n✅ Produits totaux: ${allProducts.length}`)
    
    // Vérifier les produits en stock
    const inStockProducts = await prisma.product.findMany({
      where: { inStock: true }
    })
    console.log(`✅ Produits en stock: ${inStockProducts.length}`)
    
    // Vérifier les produits hors stock
    const outOfStockProducts = await prisma.product.findMany({
      where: { inStock: false }
    })
    console.log(`⚠️  Produits hors stock: ${outOfStockProducts.length}`)
    
    if (outOfStockProducts.length > 0) {
      console.log('\n📋 Produits hors stock:')
      outOfStockProducts.forEach(p => {
        console.log(`   - ${p.name} (inStock: ${p.inStock})`)
      })
    }
    
    // Afficher quelques produits
    if (inStockProducts.length > 0) {
      console.log('\n📦 Exemples de produits en stock:')
      inStockProducts.slice(0, 5).forEach(p => {
        console.log(`   - ${p.name} (${p.price} MAD/${p.unit})`)
      })
    }
    
    if (inStockProducts.length === 0 && allProducts.length > 0) {
      console.log('\n⚠️  PROBLÈME: Tous les produits sont hors stock!')
      console.log('   Solution: Mettre inStock à true pour tous les produits')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()

