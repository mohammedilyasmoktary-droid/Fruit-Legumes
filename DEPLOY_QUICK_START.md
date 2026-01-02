# 🚀 Déploiement Rapide - Fruits et Légumes Mogador

## Étapes rapides (5 minutes)

### 1. Créer le dépôt GitHub

```bash
# Créer un nouveau dépôt sur GitHub.com (sans README)
# Puis exécuter ces commandes :

git add .
git commit -m "Initial commit - Fruits et Légumes Mogador"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git
git push -u origin main
```

### 2. Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub
2. Cliquez sur **"Add New Project"**
3. Importez votre dépôt `fruits-legumes-mogador`

### 3. Configurer la base de données

**Option recommandée: Vercel Postgres (Gratuit)**

1. Dans votre projet Vercel → **Storage** → **Create Database** → **Postgres**
2. Vercel créera automatiquement `POSTGRES_PRISMA_URL`
3. Dans **Settings** → **Environment Variables**, ajoutez :
   - `DATABASE_URL` = `POSTGRES_PRISMA_URL` (copiez depuis Storage)

**Alternative: Supabase (Gratuit)**
- Créez un projet sur [supabase.com](https://supabase.com)
- Copiez la connection string
- Ajoutez-la comme `DATABASE_URL` dans Vercel

### 4. Déployer

1. Cliquez sur **Deploy** dans Vercel
2. Attendez la fin du build (2-3 minutes)

### 5. Initialiser la base de données

Après le premier déploiement, exécutez :

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

Ou utilisez la connection string directement :

```bash
DATABASE_URL="votre-url-production" npx prisma db push
```

### 6. Ajouter des données (optionnel)

```bash
DATABASE_URL="votre-url-production" npm run db:seed
```

## ✅ C'est fait !

Votre site est maintenant en ligne sur `https://votre-projet.vercel.app`

## 📝 Notes importantes

- **Images uploadées**: Les fichiers dans `/public/uploads/` ne persistent pas entre redéploiements. Pour un stockage permanent, utilisez [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) ou [Cloudinary](https://cloudinary.com).

- **Variables d'environnement**: Toutes les variables doivent être configurées dans Vercel Dashboard → Settings → Environment Variables

## 📚 Guide complet

Pour plus de détails, consultez [DEPLOYMENT.md](./DEPLOYMENT.md)

