import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
  const fruits = await prisma.category.create({
    data: {
      name: 'Fruits',
      slug: 'fruits',
      description: 'Fruits frais de saison',
    },
  })

  const legumes = await prisma.category.create({
    data: {
      name: 'Légumes',
      slug: 'legumes',
      description: 'Légumes frais du jardin',
    },
  })

  const herbes = await prisma.category.create({
    data: {
      name: 'Herbes',
      slug: 'herbes',
      description: 'Herbes aromatiques fraîches',
    },
  })

  const paniers = await prisma.category.create({
    data: {
      name: 'Paniers',
      slug: 'paniers',
      description: 'Paniers et assortiments',
    },
  })

  // Create products
  const products = [
    // Fruits
    { name: 'Pommes Golden', slug: 'pommes-golden', description: 'Pommes Golden délicieuses et croquantes', price: 3.50, unit: 'kg', imageUrl: '/products/pommes.jpg', categoryId: fruits.id },
    { name: 'Poires Williams', slug: 'poires-williams', description: 'Poires juteuses et sucrées', price: 4.20, unit: 'kg', imageUrl: '/products/poires.jpg', categoryId: fruits.id },
    { name: 'Fraises', slug: 'fraises', description: 'Fraises gariguette de saison', price: 6.90, unit: 'barquette 500g', imageUrl: '/products/fraises.jpg', categoryId: fruits.id },
    { name: 'Cerises', slug: 'cerises', description: 'Cerises Burlat sucrées', price: 8.50, unit: 'kg', imageUrl: '/products/cerises.jpg', categoryId: fruits.id },
    { name: 'Abricots', slug: 'abricots', description: 'Abricots Bergeron parfumés', price: 5.90, unit: 'kg', imageUrl: '/products/abricots.jpg', categoryId: fruits.id },
    { name: 'Pêches', slug: 'peches', description: 'Pêches jaunes juteuses', price: 5.50, unit: 'kg', imageUrl: '/products/peches.jpg', categoryId: fruits.id },
    { name: 'Nectarines', slug: 'nectarines', description: 'Nectarines blanches sucrées', price: 5.80, unit: 'kg', imageUrl: '/products/nectarines.jpg', categoryId: fruits.id },
    { name: 'Raisin blanc', slug: 'raisin-blanc', description: 'Raisin Chasselas croquant', price: 4.90, unit: 'kg', imageUrl: '/products/raisin-blanc.jpg', categoryId: fruits.id },
    { name: 'Melon', slug: 'melon', description: 'Melon Charentais parfumé', price: 2.90, unit: 'pièce', imageUrl: '/products/melon.jpg', categoryId: fruits.id },
    { name: 'Pastèque', slug: 'pasteque', description: 'Pastèque rafraîchissante', price: 4.50, unit: 'pièce', imageUrl: '/products/pasteque.jpg', categoryId: fruits.id },
    
    // Légumes
    { name: 'Tomates', slug: 'tomates', description: 'Tomates cerises et rondes', price: 3.90, unit: 'kg', imageUrl: '/products/tomates.jpg', categoryId: legumes.id },
    { name: 'Carottes', slug: 'carottes', description: 'Carottes nouvelles croquantes', price: 2.50, unit: 'kg', imageUrl: '/products/carottes.jpg', categoryId: legumes.id },
    { name: 'Courgettes', slug: 'courgettes', description: 'Courgettes fraîches du jardin', price: 2.90, unit: 'kg', imageUrl: '/products/courgettes.jpg', categoryId: legumes.id },
    { name: 'Aubergines', slug: 'aubergines', description: 'Aubergines violettes', price: 4.50, unit: 'kg', imageUrl: '/products/aubergines.jpg', categoryId: legumes.id },
    { name: 'Poivrons', slug: 'poivrons', description: 'Poivrons colorés', price: 4.90, unit: 'kg', imageUrl: '/products/poivrons.jpg', categoryId: legumes.id },
    { name: 'Salade verte', slug: 'salade-verte', description: 'Salade verte croquante', price: 1.90, unit: 'pièce', imageUrl: '/products/salade.jpg', categoryId: legumes.id },
    { name: 'Concombres', slug: 'concombres', description: 'Concombres frais', price: 2.20, unit: 'pièce', imageUrl: '/products/concombres.jpg', categoryId: legumes.id },
    { name: 'Radis', slug: 'radis', description: 'Radis roses piquants', price: 2.90, unit: 'botte', imageUrl: '/products/radis.jpg', categoryId: legumes.id },
    { name: 'Haricots verts', slug: 'haricots-verts', description: 'Haricots verts extra-fins', price: 5.90, unit: 'kg', imageUrl: '/products/haricots-verts.jpg', categoryId: legumes.id },
    { name: 'Pommes de terre', slug: 'pommes-de-terre', description: 'Pommes de terre nouvelles', price: 2.20, unit: 'kg', imageUrl: '/products/pommes-de-terre.jpg', categoryId: legumes.id },
    { name: 'Oignons', slug: 'oignons', description: 'Oignons jaunes', price: 2.50, unit: 'kg', imageUrl: '/products/oignons.jpg', categoryId: legumes.id },
    { name: 'Ail', slug: 'ail', description: 'Ail frais', price: 3.50, unit: 'tête', imageUrl: '/products/ail.jpg', categoryId: legumes.id },
    
    // Herbes
    { name: 'Basilic', slug: 'basilic', description: 'Basilic frais', price: 2.50, unit: 'pot', imageUrl: '/products/basilic.jpg', categoryId: herbes.id },
    { name: 'Persil', slug: 'persil', description: 'Persil plat', price: 1.90, unit: 'botte', imageUrl: '/products/persil.jpg', categoryId: herbes.id },
    { name: 'Ciboulette', slug: 'ciboulette', description: 'Ciboulette fraîche', price: 2.20, unit: 'pot', imageUrl: '/products/ciboulette.jpg', categoryId: herbes.id },
    { name: 'Menthe', slug: 'menthe', description: 'Menthe verte', price: 2.50, unit: 'pot', imageUrl: '/products/menthe.jpg', categoryId: herbes.id },
    { name: 'Thym', slug: 'thym', description: 'Thym frais', price: 2.20, unit: 'pot', imageUrl: '/products/thym.jpg', categoryId: herbes.id },
    { name: 'Romarin', slug: 'romarin', description: 'Romarin frais', price: 2.20, unit: 'pot', imageUrl: '/products/romarin.jpg', categoryId: herbes.id },
    
    // Paniers
    { name: 'Panier Fruits de saison', slug: 'panier-fruits-saison', description: 'Assortiment de fruits de saison (3-4 variétés)', price: 15.90, unit: 'panier', imageUrl: '/products/panier-fruits.jpg', categoryId: paniers.id },
    { name: 'Panier Légumes du jardin', slug: 'panier-legumes-jardin', description: 'Assortiment de légumes frais (5-6 variétés)', price: 18.90, unit: 'panier', imageUrl: '/products/panier-legumes.jpg', categoryId: paniers.id },
    { name: 'Panier Complet', slug: 'panier-complet', description: 'Panier mixte fruits et légumes', price: 32.90, unit: 'panier', imageUrl: '/products/panier-complet.jpg', categoryId: paniers.id },
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })





