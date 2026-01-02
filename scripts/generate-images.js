// Script pour générer des images placeholder
// Nécessite: npm install canvas (optionnel, peut être ignoré si vous avez vos propres images)

const fs = require('fs');
const path = require('path');

const products = [
  'pommes', 'poires', 'fraises', 'cerises', 'abricots', 'peches',
  'nectarines', 'raisin-blanc', 'melon', 'pasteque', 'tomates',
  'carottes', 'courgettes', 'aubergines', 'poivrons', 'salade',
  'concombres', 'radis', 'haricots-verts', 'pommes-de-terre',
  'oignons', 'ail', 'basilic', 'persil', 'ciboulette', 'menthe',
  'thym', 'romarin', 'panier-fruits', 'panier-legumes', 'panier-complet'
];

const productsDir = path.join(__dirname, '..', 'public', 'products');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

console.log('📁 Dossier créé:', productsDir);
console.log('\n📝 Images nécessaires:');
products.forEach(product => {
  console.log(`  - ${product}.jpg`);
});

console.log('\n💡 Pour générer des images placeholder:');
console.log('   1. Ouvrez scripts/generate-placeholder-images.html dans votre navigateur');
console.log('   2. Cliquez sur "Télécharger toutes les images"');
console.log('   3. Déplacez les images téléchargées dans public/products/');
console.log('\n   OU');
console.log('   Ajoutez vos propres images dans public/products/ avec les noms ci-dessus.');





