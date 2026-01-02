# Guide de déploiement sur Vercel

Ce guide vous explique comment déployer votre application "Fruits et Légumes Mogador" sur Vercel via GitHub.

## 📋 Prérequis

1. Un compte GitHub
2. Un compte Vercel (gratuit)
3. Une base de données PostgreSQL (recommandé: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Supabase](https://supabase.com), ou [Neon](https://neon.tech))

## 🚀 Étapes de déploiement

### 1. Préparer le dépôt GitHub

#### a) Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit - Fruits et Légumes Mogador"
```

#### b) Créer un dépôt sur GitHub

1. Allez sur [GitHub](https://github.com) et créez un nouveau dépôt
2. Nommez-le (ex: `fruits-legumes-mogador`)
3. **Ne cochez PAS** "Initialize with README" (le dépôt existe déjà)
4. Copiez l'URL du dépôt (ex: `https://github.com/votre-username/fruits-legumes-mogador.git`)

#### c) Connecter votre projet local à GitHub

```bash
git remote add origin https://github.com/votre-username/fruits-legumes-mogador.git
git branch -M main
git push -u origin main
```

### 2. Configurer la base de données PostgreSQL

#### Option A: Vercel Postgres (Recommandé - Gratuit)

1. Dans votre projet Vercel, allez dans l'onglet **Storage**
2. Cliquez sur **Create Database** → **Postgres**
3. Choisissez un nom pour votre base de données
4. Vercel créera automatiquement la variable d'environnement `POSTGRES_URL`
5. Notez également `POSTGRES_PRISMA_URL` et `POSTGRES_URL_NON_POOLING` si disponibles

#### Option B: Supabase (Gratuit)

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans **Settings** → **Database**
4. Copiez la **Connection String** (URI mode)
5. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option C: Neon (Gratuit)

1. Créez un compte sur [Neon](https://neon.tech)
2. Créez un nouveau projet
3. Copiez la **Connection String**
4. Format: `postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require`

### 3. Déployer sur Vercel

#### a) Importer le projet

1. Allez sur [Vercel](https://vercel.com) et connectez-vous
2. Cliquez sur **Add New Project**
3. Importez votre dépôt GitHub
4. Sélectionnez le dépôt `fruits-legumes-mogador`

#### b) Configurer les variables d'environnement

Dans la section **Environment Variables**, ajoutez :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `DATABASE_URL` | `postgresql://...` | URL de connexion PostgreSQL (depuis Vercel Postgres, Supabase, ou Neon) |
| `NODE_ENV` | `production` | Environnement de production |

**Important pour Vercel Postgres:**
- Si vous utilisez Vercel Postgres, utilisez `POSTGRES_PRISMA_URL` comme valeur pour `DATABASE_URL`
- Ou utilisez `POSTGRES_URL_NON_POOLING` pour les migrations

#### c) Configurer le build

Vercel détectera automatiquement Next.js. Les scripts suivants sont déjà configurés :
- **Build Command**: `prisma generate && next build` (automatique via `package.json`)
- **Output Directory**: `.next` (automatique)
- **Install Command**: `npm install` (automatique)

#### d) Déployer

1. Cliquez sur **Deploy**
2. Vercel va :
   - Installer les dépendances
   - Générer le client Prisma
   - Builder l'application
   - Déployer

### 4. Initialiser la base de données

Après le premier déploiement, vous devez créer les tables dans votre base de données.

#### Option A: Via Vercel CLI (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Pousser le schéma Prisma
npx prisma db push
```

#### Option B: Via un script de migration

Créez un fichier `scripts/deploy-db.ts` et exécutez-le localement avec les variables d'environnement de production :

```bash
DATABASE_URL="votre-url-production" npx prisma db push
```

#### Option C: Via Prisma Studio (temporaire)

```bash
DATABASE_URL="votre-url-production" npx prisma studio
```

Puis utilisez l'interface pour créer les tables manuellement.

### 5. Remplir la base de données (optionnel)

Pour ajouter des données de test :

```bash
DATABASE_URL="votre-url-production" npm run db:seed
```

## 🔧 Configuration post-déploiement

### Images uploadées

Les images uploadées via l'admin sont stockées dans `/public/uploads/`. Sur Vercel :
- Les fichiers dans `/public` sont servis statiquement
- **Important**: Les uploads ne persistent pas entre les redéploiements (Vercel est serverless)
- **Solution recommandée**: Utiliser un service de stockage cloud (Vercel Blob, Cloudinary, AWS S3)

### Variables d'environnement supplémentaires

Si vous avez besoin d'autres variables (comme `ADMIN_KEY`), ajoutez-les dans :
- **Vercel Dashboard** → **Settings** → **Environment Variables**

## 🔄 Déploiements automatiques

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque pull request → Preview

## 📝 Commandes utiles

```bash
# Voir les logs en production
vercel logs

# Ouvrir Prisma Studio avec la DB de production
DATABASE_URL="votre-url-production" npx prisma studio

# Exécuter une migration
DATABASE_URL="votre-url-production" npx prisma migrate deploy
```

## 🐛 Dépannage

### Erreur: "Prisma Client not generated"

Solution: Le script `postinstall` dans `package.json` génère automatiquement le client Prisma.

### Erreur: "Database connection failed"

Vérifiez:
1. La variable `DATABASE_URL` est correctement configurée dans Vercel
2. La base de données est accessible depuis Internet (pas de restriction IP)
3. Le format de l'URL est correct: `postgresql://user:password@host:port/database`

### Les images ne s'affichent pas

1. Vérifiez que les images sont dans `/public/uploads/`
2. Les chemins doivent être relatifs: `/uploads/filename.jpg`
3. Pour un stockage persistant, migrez vers Vercel Blob ou Cloudinary

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma avec Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## ✅ Checklist de déploiement

- [ ] Dépôt GitHub créé et code poussé
- [ ] Base de données PostgreSQL configurée (Vercel Postgres, Supabase, ou Neon)
- [ ] Projet Vercel créé et connecté à GitHub
- [ ] Variable `DATABASE_URL` configurée dans Vercel
- [ ] Premier déploiement réussi
- [ ] Schéma Prisma poussé vers la base de données (`prisma db push`)
- [ ] Données de test ajoutées (optionnel)
- [ ] Site accessible et fonctionnel

---

**Besoin d'aide?** Consultez la [documentation Vercel](https://vercel.com/docs) ou créez une issue sur GitHub.

