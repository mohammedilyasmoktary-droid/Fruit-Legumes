// Script pour créer automatiquement la base de données fruits_legumes
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Lire la configuration depuis .env.local ou utiliser des valeurs par défaut
let connectionString = 'postgresql://postgres@localhost:5432/postgres';

// Essayer de lire .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL="([^"]+)"/);
  if (match) {
    // Extraire la partie de connexion (sans le nom de la base)
    const fullUrl = match[1];
    const url = new URL(fullUrl);
    url.pathname = '/postgres'; // Se connecter à la base postgres par défaut
    connectionString = url.toString();
  }
}

async function createDatabase() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('🔌 Connexion à PostgreSQL...');
    await client.connect();
    console.log('✅ Connecté à PostgreSQL');

    // Vérifier si la base existe déjà
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'fruits_legumes'"
    );

    if (result.rows.length > 0) {
      console.log('ℹ️  La base de données fruits_legumes existe déjà.');
    } else {
      console.log('📦 Création de la base de données fruits_legumes...');
      await client.query('CREATE DATABASE fruits_legumes');
      console.log('✅ Base de données fruits_legumes créée avec succès!');
    }

    await client.end();
    console.log('\n🎉 Terminé! Vous pouvez maintenant exécuter:');
    console.log('   npm run db:push');
    console.log('   npm run db:seed');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Essayez de créer la base manuellement:');
    console.log('   1. Connectez-vous à PostgreSQL via l\'application Postgres');
    console.log('   2. Exécutez: CREATE DATABASE fruits_legumes;');
    process.exit(1);
  }
}

createDatabase();





