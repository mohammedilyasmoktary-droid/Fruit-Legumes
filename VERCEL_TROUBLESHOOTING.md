# 🔧 Guide de dépannage Vercel - Erreur "Something went wrong"

## 🎯 Problème
Vous voyez l'erreur "Something went wrong" sur Vercel. Cela est généralement dû à :
1. `DATABASE_URL` manquante ou incorrecte
2. Base de données non initialisée
3. Erreurs de build

## ✅ Solution étape par étape

### Étape 1 : Vérifier les variables d'environnement

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Sélectionnez votre projet **fruit-legumes**
3. Allez dans **Settings** (en haut à droite) → **Environment Variables**
4. Vérifiez si `DATABASE_URL` existe

**Si `DATABASE_URL` n'existe pas** → Passez à l'Étape 2
**Si `DATABASE_URL` existe** → Vérifiez qu'elle est correcte et passez à l'Étape 4

### Étape 2 : Créer Vercel Postgres

1. Dans votre projet Vercel, allez dans l'onglet **"Storage"** (menu de gauche)
2. Cliquez sur **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Nommez-la : `fruits-legumes-db` (ou autre nom)
5. Cliquez sur **"Create"**
6. **Attendez quelques secondes** que la base de données soit créée

### Étape 3 : Configurer DATABASE_URL

1. Dans l'onglet **Storage**, vous verrez votre base de données créée
2. Cliquez sur votre base de données
3. Allez dans l'onglet **"Variables"**
4. Vous verrez 3 variables créées automatiquement :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` ← **COPIEZ CETTE VALEUR**
   - `POSTGRES_URL_NON_POOLING`

5. **Copiez la valeur de `POSTGRES_PRISMA_URL`**

6. Allez dans **Settings** → **Environment Variables**
7. Cliquez sur **"Add New"**
8. Remplissez :
   - **Name**: `DATABASE_URL`
   - **Value**: Collez la valeur de `POSTGRES_PRISMA_URL` que vous avez copiée
   - **Environments**: Cochez **Production**, **Preview**, et **Development**
9. Cliquez sur **"Save"**

### Étape 4 : Redéployer

1. Allez dans l'onglet **"Deployments"** (menu de gauche)
2. Trouvez le dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points** (⋯) à droite
4. Sélectionnez **"Redeploy"**
5. **OU** faites un petit changement et poussez vers GitHub :
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

### Étape 5 : Attendre le build

- Le build prendra 2-3 minutes
- Surveillez les logs pour voir si ça fonctionne
- Si le build réussit, passez à l'Étape 6

### Étape 6 : Initialiser la base de données

Une fois le déploiement réussi, vous devez créer les tables dans la base de données :

**Option A : Via Vercel CLI (Recommandé)**

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet (choisissez votre projet fruit-legumes)
vercel link

# Pousser le schéma Prisma
npx prisma db push
```

**Option B : Via la connection string directement**

1. Copiez votre `DATABASE_URL` depuis Vercel
2. Dans votre Terminal local, exécutez :
   ```bash
   cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
   DATABASE_URL="votre-url-copiée" npx prisma db push
   ```

### Étape 7 : Vérifier que tout fonctionne

1. Allez sur votre URL Vercel (ex: `https://fruit-legumes.vercel.app`)
2. Le site devrait maintenant s'afficher correctement

## 🐛 Si le problème persiste

### Vérifier les logs de build

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Regardez les **Build Logs** pour voir les erreurs exactes

### Erreurs communes

**Erreur: "DATABASE_URL is not set"**
→ Vérifiez que `DATABASE_URL` est bien configurée dans Environment Variables

**Erreur: "Connection refused"**
→ Vérifiez que la base de données Vercel Postgres est bien créée et active

**Erreur: "Table does not exist"**
→ Exécutez `npx prisma db push` pour créer les tables

**Erreur: "Prisma Client not generated"**
→ Le script `postinstall` dans `package.json` devrait le générer automatiquement

## 📞 Besoin d'aide ?

Si le problème persiste après avoir suivi ces étapes :
1. Vérifiez les logs de build dans Vercel
2. Partagez l'erreur exacte que vous voyez
3. Vérifiez que toutes les variables d'environnement sont correctement configurées

