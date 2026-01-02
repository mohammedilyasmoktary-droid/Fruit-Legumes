# 🔧 Correction : Upload d'images ne fonctionne pas sur Vercel

## ❌ Problème

Sur Vercel, le système de fichiers est **en lecture seule**. Vous ne pouvez pas écrire des fichiers dans `/public/uploads/` car Vercel est serverless.

## ✅ Solutions

### Option 1 : Vercel Blob Storage (Recommandé - Gratuit)

Vercel Blob Storage est un service de stockage intégré à Vercel, parfait pour les images.

#### Installation

1. Dans votre projet Vercel → **Storage** → **Create Database**
2. Sélectionnez **"Blob"** (pas Postgres)
3. Créez le blob storage

#### Configuration

1. Vercel créera automatiquement une variable `BLOB_READ_WRITE_TOKEN`
2. Installez le package :
   ```bash
   npm install @vercel/blob
   ```

3. Modifiez `/app/api/admin/upload/route.ts` pour utiliser Vercel Blob

### Option 2 : Cloudinary (Alternative - Gratuit)

Cloudinary offre un stockage gratuit pour les images.

1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Installez le package :
   ```bash
   npm install cloudinary
   ```

3. Configurez les variables d'environnement dans Vercel
4. Modifiez le code d'upload pour utiliser Cloudinary

### Option 3 : Solution temporaire - Utiliser des URLs externes

Pour l'instant, vous pouvez :
1. Uploader vos images sur un service externe (Imgur, Cloudinary, etc.)
2. Copier l'URL de l'image
3. Coller l'URL directement dans le champ `imageUrl` du formulaire

## 🔧 Correction rapide (Vercel Blob)

Je peux modifier le code pour utiliser Vercel Blob Storage. Voulez-vous que je le fasse ?

---

**Note :** Sur Vercel, les fichiers uploadés ne persistent pas entre les redéploiements. Il faut absolument utiliser un service de stockage cloud.

