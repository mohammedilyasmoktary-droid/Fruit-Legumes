# 🔧 Solution : DATABASE_URL est en lecture seule

## ❌ Problème
La variable `DATABASE_URL` est liée à l'intégration Neon et ne peut pas être modifiée directement.

## ✅ Solution : Utiliser POSTGRES_PRISMA_URL

Je vois que vous avez déjà `POSTGRES_PRISMA_URL` dans votre liste ! C'est probablement la bonne variable.

### Option 1 : Vérifier POSTGRES_PRISMA_URL (Recommandé)

1. Dans Environment Variables, trouvez `POSTGRES_PRISMA_URL`
2. Cliquez sur l'icône **œil** pour voir la valeur
3. Vérifiez qu'elle contient votre connection string Neon :
   ```
   postgresql://neondb_owner:npg_rTs3cIFhbfD9@ep-silent-bread-ag2pktnr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

**Si `POSTGRES_PRISMA_URL` a la bonne valeur :**
- C'est parfait ! Vercel devrait l'utiliser automatiquement
- Redéployez simplement

**Si `POSTGRES_PRISMA_URL` n'a pas la bonne valeur :**
- Passez à l'Option 2

### Option 2 : Créer une nouvelle variable DATABASE_URL

1. Dans Environment Variables, cliquez sur **"Add New"**
2. Remplissez :
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_rTs3cIFhbfD9@ep-silent-bread-ag2pktnr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
   - **Environments**: Cochez Production, Preview, Development
3. Cliquez sur **"Save"**

⚠️ **Note :** Si vous obtenez une erreur "already exists", c'est normal. La variable liée à Neon sera prioritaire.

### Option 3 : Modifier le code pour utiliser POSTGRES_PRISMA_URL

Si vous ne pouvez pas créer `DATABASE_URL`, modifiez votre code pour utiliser `POSTGRES_PRISMA_URL` :

1. Dans `prisma/schema.prisma`, changez :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")  // Au lieu de DATABASE_URL
   }
   ```

2. Ou créez un fichier `.env` local qui mappe :
   ```
   DATABASE_URL=${POSTGRES_PRISMA_URL}
   ```

---

## 🎯 Solution la plus simple

**Vérifiez d'abord `POSTGRES_PRISMA_URL` :**

1. Cliquez sur l'icône **œil** à côté de `POSTGRES_PRISMA_URL`
2. Vérifiez que la valeur est correcte
3. Si c'est correct, **redéployez simplement** (Vercel utilisera cette variable)
4. Si ce n'est pas correct, utilisez l'Option 2 pour créer une nouvelle `DATABASE_URL`

---

## 🔄 Après avoir vérifié/configuré

1. **Redéployez** :
   - Deployments → dernier déploiement → ⋯ → Redeploy
   - Attendez 2-3 minutes

2. **Initialisez la base de données** :
   ```bash
   cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
   npx prisma db push
   ```

---

**Commencez par vérifier la valeur de POSTGRES_PRISMA_URL en cliquant sur l'icône œil !**

