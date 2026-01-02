# 📦 Créer Vercel Blob Storage - Guide étape par étape

## 🎯 Objectif
Créer Vercel Blob Storage pour permettre l'upload d'images dans l'interface admin.

## 📋 Étapes détaillées

### Étape 1 : Aller dans Storage

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Sélectionnez votre projet **fruit-legumes**
3. Dans le menu de gauche, cliquez sur **"Storage"**

### Étape 2 : Créer Blob Storage

1. Dans la page Storage, vous verrez plusieurs options
2. Cherchez la section **"Create Database"** ou **"Create"**
3. Cliquez sur **"Create Database"** (ou le bouton "Create" si visible)

### Étape 3 : Sélectionner Blob

1. Une modal ou une page s'ouvrira avec les options de stockage
2. Vous verrez plusieurs options :
   - **Postgres** (déjà créé pour la base de données)
   - **Blob** ← **SÉLECTIONNEZ CELUI-CI**
   - **Edge Config**
   - **KV**
   - Neon, AWS, etc.

3. Cliquez sur **"Blob"** (avec l'icône de stockage d'objets)

### Étape 4 : Configurer le Blob Storage

1. Donnez un nom : `fruits-legumes-images` (ou autre nom de votre choix)
2. Cliquez sur **"Create"** ou **"Continue"**

### Étape 5 : Attendre la création

1. Attendez 10-20 secondes que le Blob Storage soit créé
2. Vous verrez le statut "Active" une fois créé

### Étape 6 : Vérifier la variable d'environnement

1. Allez dans **Settings** → **Environment Variables**
2. Vérifiez que **`BLOB_READ_WRITE_TOKEN`** existe
3. Cette variable est créée automatiquement par Vercel

### Étape 7 : Redéployer (si nécessaire)

1. Si le Blob Storage a été créé après le dernier déploiement :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** (⋯) du dernier déploiement
   - Sélectionnez **"Redeploy"**

## ✅ Vérification

Une fois créé, vous devriez voir :
- Le Blob Storage dans la liste Storage avec le statut "Active"
- La variable `BLOB_READ_WRITE_TOKEN` dans Environment Variables

## 🧪 Test

Après la création et le redéploiement :

1. Allez dans `/admin/categories/[id]/modifier`
2. Cliquez sur **"Choisir une image"**
3. Sélectionnez une image
4. L'upload devrait maintenant fonctionner ! ✅

## 🐛 Si vous ne voyez pas l'option "Blob"

1. Vérifiez que vous êtes dans le bon projet Vercel
2. Rafraîchissez la page Storage
3. Cherchez dans "Create Database" ou "Browse Storage"
4. L'option Blob devrait être visible dans la liste

## 📝 Note importante

- **Blob Storage** est différent de **Postgres** (base de données)
- Vous avez déjà **Postgres** (Neon) pour les données
- Vous devez créer **Blob** séparément pour les images

---

**Suivez ces étapes et l'upload d'images devrait fonctionner !**

