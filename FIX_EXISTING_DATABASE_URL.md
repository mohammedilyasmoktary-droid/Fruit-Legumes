# ✅ Solution : DATABASE_URL existe déjà

## ❌ Erreur
"A variable with the name 'DATABASE_URL' already exists"

Cela signifie que `DATABASE_URL` existe déjà (celle liée à Neon).

## ✅ Solution : Vérifier la valeur existante

### Étape 1 : Annuler cette modal

1. Cliquez sur "Cancel" ou fermez cette modal
2. Retournez à la liste des variables d'environnement

### Étape 2 : Vérifier la valeur de DATABASE_URL existante

1. Dans la liste, trouvez `DATABASE_URL`
2. Cliquez sur l'icône **œil** à côté pour voir la valeur
3. Vérifiez qu'elle contient :
   ```
   postgresql://neondb_owner:npg_rTs3cIFhbfD9@ep-silent-bread-ag2pktnr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
   ```

### Étape 3 : Actions selon la valeur

**Si DATABASE_URL a la BONNE valeur :**
- ✅ Parfait ! Vous n'avez rien à faire
- Redéployez simplement (Deployments → ⋯ → Redeploy)

**Si DATABASE_URL a une MAUVAISE valeur :**
- Il faudra supprimer l'intégration Neon et la recréer
- OU modifier le schéma Prisma pour utiliser `POSTGRES_PRISMA_URL`

---

## 🔄 Redéployer maintenant

Même si vous ne pouvez pas modifier `DATABASE_URL`, si `POSTGRES_PRISMA_URL` a la bonne valeur, Vercel devrait fonctionner.

**Essayez de redéployer :**

1. Allez dans **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** (⋯) → **"Redeploy"**
4. Attendez 2-3 minutes

Si le déploiement réussit, c'est que tout est correct !

---

## 🐛 Si le déploiement échoue encore

Si vous obtenez toujours l'erreur `DATABASE_URL not found`, alors :

### Option A : Modifier le schéma Prisma

Modifiez `prisma/schema.prisma` pour utiliser `POSTGRES_PRISMA_URL` :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")  // Changez ici
}
```

Puis poussez vers GitHub :
```bash
git add prisma/schema.prisma
git commit -m "Use POSTGRES_PRISMA_URL instead of DATABASE_URL"
git push
```

### Option B : Supprimer et recréer l'intégration Neon

1. Allez dans **Storage** → votre base de données Neon
2. Supprimez l'intégration
3. Recréez-la avec la bonne connection string

---

## 🎯 Action immédiate

1. **Annulez cette modal** (Cancel)
2. **Vérifiez la valeur de DATABASE_URL** (icône œil)
3. **Redéployez** (Deployments → Redeploy)
4. **Voyez si ça fonctionne**

Si ça ne fonctionne pas, on modifiera le schéma Prisma pour utiliser `POSTGRES_PRISMA_URL`.

---

**Commencez par annuler et vérifier la valeur de DATABASE_URL existante !**

