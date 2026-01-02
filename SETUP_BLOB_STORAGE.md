# 📦 Configuration Vercel Blob Storage pour l'upload d'images

## ✅ Code modifié

Le code d'upload a été modifié pour utiliser **Vercel Blob Storage** au lieu du système de fichiers local.

## 🚀 Configuration en 3 étapes

### Étape 1 : Créer Vercel Blob Storage

1. Allez dans votre projet Vercel → **Storage** (menu de gauche)
2. Cliquez sur **"Create Database"**
3. Sélectionnez **"Blob"** (pas Postgres, pas Neon)
4. Donnez un nom : `fruits-legumes-images` (ou autre)
5. Cliquez sur **"Create"**

### Étape 2 : Vérifier la variable d'environnement

Vercel créera automatiquement :
- `BLOB_READ_WRITE_TOKEN` → Cette variable sera automatiquement disponible

**Vérification :**
1. Allez dans **Settings** → **Environment Variables**
2. Vérifiez que `BLOB_READ_WRITE_TOKEN` existe
3. Si elle n'existe pas, attendez quelques secondes et rafraîchissez

### Étape 3 : Redéployer

1. Les changements de code ont été poussés vers GitHub
2. Vercel redéploiera automatiquement
3. OU allez dans **Deployments** → **Redeploy** manuellement

## ✅ Test

Après le redéploiement :

1. Allez dans `/admin/categories/[id]/modifier`
2. Cliquez sur **"Choisir une image"**
3. Sélectionnez une image
4. L'upload devrait maintenant fonctionner !

## 🎯 Avantages de Vercel Blob

- ✅ **Gratuit** pour commencer
- ✅ **Intégré** à Vercel
- ✅ **Persistant** (les images ne disparaissent pas entre redéploiements)
- ✅ **CDN** automatique (images servies rapidement)
- ✅ **Pas de configuration supplémentaire** nécessaire

## 🐛 Si ça ne fonctionne toujours pas

1. Vérifiez que `BLOB_READ_WRITE_TOKEN` existe dans Environment Variables
2. Vérifiez que Vercel Blob Storage est créé et actif
3. Regardez les logs Vercel pour voir l'erreur exacte
4. Redéployez après avoir créé le Blob Storage

---

**Créez Vercel Blob Storage maintenant et l'upload devrait fonctionner !**

