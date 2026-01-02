# 🔧 Correction : Environment variable not found: DATABASE_URL

## ❌ Problème
L'erreur `Environment variable not found: DATABASE_URL` signifie que la variable n'est pas configurée dans Vercel.

## ✅ Solution en 3 étapes

### Étape 1 : Créer Vercel Postgres

1. Dans votre projet Vercel, allez dans **"Storage"** (menu de gauche)
2. Cliquez sur **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Nommez-la : `fruits-legumes-db`
5. Cliquez sur **"Create"**
6. **Attendez 10-20 secondes** que la base de données soit créée

✅ **Vérification :** Vous devriez voir votre base de données dans la liste avec le statut "Active"

---

### Étape 2 : Copier POSTGRES_PRISMA_URL

1. Dans **Storage**, cliquez sur votre base de données créée (`fruits-legumes-db`)
2. Allez dans l'onglet **"Variables"** (en haut de la page)
3. Vous verrez 3 variables :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` ← **COPIEZ CETTE VALEUR** (cliquez sur l'icône de copie à droite)
   - `POSTGRES_URL_NON_POOLING`

4. **Copiez la valeur complète de `POSTGRES_PRISMA_URL`** (elle commence par `postgresql://`)

---

### Étape 3 : Ajouter DATABASE_URL dans Environment Variables

1. Allez dans **"Settings"** (menu de gauche) → **"Environment Variables"**
2. Cliquez sur le bouton **"Add New"** (en haut à droite)
3. Remplissez le formulaire :
   - **Name**: `DATABASE_URL` (exactement comme ça, en majuscules)
   - **Value**: Collez la valeur de `POSTGRES_PRISMA_URL` que vous avez copiée
   - **Environments**: **Cochez les 3 cases** :
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
4. Cliquez sur **"Save"**

✅ **Vérification :** Vous devriez maintenant voir `DATABASE_URL` dans la liste des variables d'environnement

---

### Étape 4 : Redéployer

1. Allez dans **"Deployments"** (menu de gauche)
2. Trouvez le déploiement qui a échoué (celui avec "Error" en rouge)
3. Cliquez sur les **3 points** (⋯) à droite du déploiement
4. Sélectionnez **"Redeploy"**
5. Confirmez en cliquant sur **"Redeploy"** dans la popup
6. **Attendez 2-3 minutes** que le build se termine

✅ **Résultat attendu :** Le statut devrait passer de "Building..." à "Ready" (vert)

---

## 🎯 Checklist rapide

- [ ] Étape 1 : Vercel Postgres créé (Storage → Create Database → Postgres)
- [ ] Étape 2 : `POSTGRES_PRISMA_URL` copiée (Storage → votre DB → Variables)
- [ ] Étape 3 : `DATABASE_URL` ajoutée (Settings → Environment Variables)
  - [ ] Name: `DATABASE_URL`
  - [ ] Value: collée depuis `POSTGRES_PRISMA_URL`
  - [ ] Tous les environnements cochés (Production, Preview, Development)
- [ ] Étape 4 : Redéploiement lancé (Deployments → Redeploy)

---

## ⚠️ Points importants

1. **Le nom doit être exactement `DATABASE_URL`** (en majuscules, avec underscore)
2. **Cochez les 3 environnements** (Production, Preview, Development) pour que ça fonctionne partout
3. **Utilisez `POSTGRES_PRISMA_URL`** (pas `POSTGRES_URL` ou `POSTGRES_URL_NON_POOLING`)
4. **Redéployez après avoir ajouté la variable** pour que les changements prennent effet

---

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier que la variable est bien configurée

1. Settings → Environment Variables
2. Vérifiez que `DATABASE_URL` est dans la liste
3. Cliquez dessus pour voir les détails
4. Vérifiez que les 3 environnements sont cochés

### Vérifier que la base de données est active

1. Storage → votre base de données
2. Vérifiez que le statut est "Active"
3. Si ce n'est pas le cas, attendez quelques secondes

### Vérifier les logs après redéploiement

1. Deployments → dernier déploiement → Build Logs
2. Cherchez si l'erreur `DATABASE_URL` est toujours là
3. Si oui, vérifiez que vous avez bien redéployé APRÈS avoir ajouté la variable

---

## 📝 Après le déploiement réussi

Une fois le déploiement réussi (statut "Ready"), vous devrez initialiser la base de données :

```bash
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
npx prisma db push
```

Ou avec la connection string directement :
```bash
DATABASE_URL="votre-url-postgres-prisma" npx prisma db push
```

---

**Suivez ces étapes dans l'ordre et votre déploiement devrait réussir !** 🚀

