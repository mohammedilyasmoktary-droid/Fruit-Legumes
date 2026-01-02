# 🚀 Guide étape par étape - Déploiement Vercel

## 📋 Étape 1 : Vérifier les logs d'erreur

1. Dans votre dashboard Vercel, cliquez sur le déploiement qui a échoué (celui avec "Error" en rouge)
2. Cliquez sur "Build Logs" pour voir les erreurs
3. Notez l'erreur exacte (probablement liée à `DATABASE_URL`)

**Erreur attendue :** `Validation Error Count: 1` sur `DATABASE_URL`

---

## 🗄️ Étape 2 : Créer Vercel Postgres

1. Dans votre projet Vercel, allez dans l'onglet **"Storage"** (menu de gauche)
2. Cliquez sur le bouton **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Donnez un nom à votre base de données : `fruits-legumes-db` (ou autre nom)
5. Cliquez sur **"Create"**
6. **Attendez 10-20 secondes** que la base de données soit créée

✅ **Vérification :** Vous devriez voir votre base de données dans la liste avec un statut "Active"

---

## 🔧 Étape 3 : Configurer DATABASE_URL

1. Dans l'onglet **"Storage"**, cliquez sur votre base de données créée (`fruits-legumes-db`)
2. Allez dans l'onglet **"Variables"** (en haut)
3. Vous verrez 3 variables créées automatiquement :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` ← **COPIEZ CETTE VALEUR** (cliquez sur l'icône de copie)
   - `POSTGRES_URL_NON_POOLING`

4. Allez dans **"Settings"** (menu de gauche) → **"Environment Variables"**
5. Cliquez sur **"Add New"**
6. Remplissez le formulaire :
   - **Name**: `DATABASE_URL`
   - **Value**: Collez la valeur de `POSTGRES_PRISMA_URL` que vous avez copiée
   - **Environments**: Cochez les 3 cases :
     - ✅ Production
     - ✅ Preview
     - ✅ Development
7. Cliquez sur **"Save"**

✅ **Vérification :** Vous devriez voir `DATABASE_URL` dans la liste des variables d'environnement

---

## 🔄 Étape 4 : Redéployer

1. Allez dans l'onglet **"Deployments"** (menu de gauche)
2. Trouvez le déploiement qui a échoué (celui avec "Error" en rouge)
3. Cliquez sur les **3 points** (⋯) à droite du déploiement
4. Sélectionnez **"Redeploy"**
5. Confirmez en cliquant sur **"Redeploy"** dans la popup
6. **Attendez 2-3 minutes** que le build se termine

✅ **Vérification :** Le statut devrait passer de "Building..." à "Ready" (vert)

---

## 📊 Étape 5 : Vérifier le déploiement

1. Une fois le déploiement terminé, cliquez dessus
2. Vérifiez que le statut est **"Ready"** (vert)
3. Cliquez sur **"Visit"** ou copiez l'URL (ex: `https://fruit-legumes.vercel.app`)

⚠️ **Note :** Le site peut afficher une erreur car la base de données n'est pas encore initialisée. C'est normal ! Passez à l'étape suivante.

---

## 🗃️ Étape 6 : Initialiser la base de données

Une fois le déploiement réussi, vous devez créer les tables dans la base de données.

### Option A : Via Vercel CLI (Recommandé)

1. Ouvrez votre Terminal
2. Exécutez ces commandes :

```bash
# Aller dans le dossier du projet
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"

# Installer Vercel CLI (si pas déjà fait)
npm install -g vercel

# Se connecter à Vercel
vercel login

# Lier le projet (choisissez votre projet fruit-legumes)
vercel link

# Pousser le schéma Prisma vers la base de données
npx prisma db push
```

### Option B : Via la connection string directement

1. Dans Vercel → Storage → votre base de données → Variables
2. Copiez la valeur de `POSTGRES_PRISMA_URL`
3. Dans votre Terminal :

```bash
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
DATABASE_URL="collez-votre-url-ici" npx prisma db push
```

✅ **Vérification :** Vous devriez voir "Your database is now in sync with your Prisma schema"

---

## 🎉 Étape 7 : Vérifier que tout fonctionne

1. Allez sur l'URL de votre site (ex: `https://fruit-legumes.vercel.app`)
2. Le site devrait maintenant s'afficher correctement !
3. Testez quelques pages :
   - Page d'accueil
   - Boutique
   - Panier

---

## 🐛 Si le déploiement échoue encore

### Vérifier les logs
1. Cliquez sur le déploiement qui a échoué
2. Regardez les **"Build Logs"**
3. Cherchez les erreurs en rouge

### Erreurs communes

**"DATABASE_URL is not set"**
→ Vérifiez que `DATABASE_URL` est bien dans Environment Variables

**"Connection refused"**
→ Vérifiez que la base de données Vercel Postgres est active

**"Table does not exist"**
→ Exécutez `npx prisma db push` (Étape 6)

**"Prisma Client not generated"**
→ Le script `postinstall` dans `package.json` devrait le générer automatiquement

---

## 📝 Checklist de déploiement

- [ ] Étape 1 : Logs d'erreur vérifiés
- [ ] Étape 2 : Vercel Postgres créé
- [ ] Étape 3 : DATABASE_URL configurée
- [ ] Étape 4 : Redéploiement lancé
- [ ] Étape 5 : Déploiement réussi (statut "Ready")
- [ ] Étape 6 : Base de données initialisée (`prisma db push`)
- [ ] Étape 7 : Site fonctionnel et testé

---

## 🎯 Résumé rapide

1. **Storage** → Create Database → Postgres
2. **Storage** → votre DB → Variables → Copier `POSTGRES_PRISMA_URL`
3. **Settings** → Environment Variables → Ajouter `DATABASE_URL`
4. **Deployments** → Redeploy
5. Terminal : `npx prisma db push`
6. Tester le site !

---

**Besoin d'aide ?** Partagez l'erreur exacte des Build Logs et je vous aiderai à la résoudre.

