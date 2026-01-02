# 🚀 Créer Vercel Blob Storage - Instructions précises

## ⚠️ Important
Je ne peux pas créer le Blob Storage directement car cela nécessite d'être connecté à votre compte Vercel. Suivez ces étapes exactes :

## 📋 Instructions étape par étape

### 1. Ouvrez Vercel Dashboard
- Allez sur [vercel.com](https://vercel.com)
- Connectez-vous
- Sélectionnez votre projet **fruit-legumes**

### 2. Allez dans Storage
- Menu de gauche → **"Storage"** (icône de base de données)

### 3. Créer Blob Storage

**Option A : Si vous voyez "Create Database"**
1. Cliquez sur **"Create Database"**
2. Dans la liste, cherchez **"Blob"** (icône de stockage d'objets)
3. Cliquez sur **"Blob"**
4. Nom : `fruits-legumes-images`
5. Cliquez sur **"Create"**

**Option B : Si vous voyez "Browse Storage"**
1. Cliquez sur **"Browse Storage"**
2. Onglet **"Create New"**
3. Cherchez **"Blob"** dans la liste
4. Cliquez sur **"Blob"**
5. Nom : `fruits-legumes-images`
6. Cliquez sur **"Continue"** puis **"Create"**

### 4. Attendre
- Attendez 10-20 secondes
- Le statut devrait passer à **"Active"**

### 5. Vérifier la variable
1. **Settings** → **Environment Variables**
2. Cherchez **`BLOB_READ_WRITE_TOKEN`**
3. Elle devrait être créée automatiquement

### 6. Redéployer
1. **Deployments** → dernier déploiement
2. **⋯** → **"Redeploy"**

## ✅ C'est tout !

Après ces étapes, l'upload d'images devrait fonctionner.

---

**Si vous avez des difficultés à trouver l'option Blob, dites-moi ce que vous voyez dans la page Storage et je vous aiderai !**

