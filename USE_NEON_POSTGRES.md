# 🗄️ Utiliser Neon Postgres (via Marketplace Vercel)

## ✅ Solution : Utiliser Neon

Vercel a déplacé Postgres vers le Marketplace. **Neon** est une excellente option gratuite pour Postgres serverless.

## 📋 Étapes pour créer Neon Postgres

### Étape 1 : Sélectionner Neon

1. Dans la modal "Browse Storage", cherchez la section **"Marketplace Database Providers"**
2. Cliquez sur **"Neon"** (avec l'icône verte carrée)
3. Cliquez sur **"Continue"** en bas de la modal

### Étape 2 : Créer un compte Neon (si nécessaire)

1. Si c'est la première fois, vous devrez créer un compte Neon
2. Vous pouvez vous connecter avec GitHub (recommandé)
3. Autorisez l'intégration avec Vercel

### Étape 3 : Créer la base de données

1. Donnez un nom à votre base de données : `fruits-legumes-db`
2. Choisissez une région (choisissez la plus proche, ex: "Europe")
3. Cliquez sur **"Create"** ou **"Create Database"**

### Étape 4 : Récupérer la connection string

1. Une fois créée, Neon vous donnera une connection string
2. **Copiez cette connection string** (elle commence par `postgresql://`)
3. Elle ressemblera à : `postgresql://user:password@host/database?sslmode=require`

---

## 🔧 Configurer DATABASE_URL dans Vercel

### Étape 1 : Ajouter la variable

1. Dans votre projet Vercel → **Settings** → **Environment Variables**
2. Cliquez sur **"Add New"**
3. Remplissez :
   - **Name**: `DATABASE_URL`
   - **Value**: Collez la connection string Neon que vous avez copiée
   - **Environments**: Cochez les 3 cases :
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Cliquez sur **"Save"**

### Étape 2 : Redéployer

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Attendez 2-3 minutes

---

## ✅ Alternative : Trouver Postgres dans le Marketplace

Si vous voulez chercher Postgres directement :

1. Dans la modal "Browse Storage", regardez dans **"Marketplace Database Providers"**
2. Cherchez une option qui dit "Postgres" ou "PostgreSQL"
3. Si vous ne trouvez pas, **utilisez Neon** (c'est Postgres serverless, ça fonctionne parfaitement)

---

## 🎯 Pourquoi Neon est une bonne option

- ✅ **Gratuit** pour commencer
- ✅ **Postgres serverless** (compatible avec Prisma)
- ✅ **Facile à configurer** via Vercel
- ✅ **Connection string standard** (fonctionne avec Prisma)
- ✅ **Intégration Vercel** native

---

## 📝 Après la configuration

Une fois `DATABASE_URL` configurée et le déploiement réussi :

```bash
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
DATABASE_URL="votre-connection-string-neon" npx prisma db push
```

Ou si vous avez configuré la variable dans Vercel, utilisez Vercel CLI :

```bash
npx vercel link
npx prisma db push
```

---

**En résumé : Cliquez sur "Neon" dans le Marketplace, créez la base de données, copiez la connection string, et ajoutez-la comme DATABASE_URL dans Vercel !**

