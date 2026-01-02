# Guide de démarrage rapide

## 1. Créer la base de données PostgreSQL

Dans l'application Postgres, connectez-vous et exécutez :
```sql
CREATE DATABASE fruits_legumes;
```

## 2. Configurer .env.local

Le fichier `.env.local` a été créé. Modifiez-le pour mettre votre mot de passe PostgreSQL :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/fruits_legumes?schema=public"
```

**Si vous n'avez pas de mot de passe**, utilisez :
```env
DATABASE_URL="postgresql://postgres@localhost:5432/fruits_legumes?schema=public"
```

## 3. Initialiser la base de données

```bash
# Installer les dépendances (si pas encore fait)
npm install

# Créer les tables
npm run db:push

# Remplir avec les données de test
npm run db:seed
```

## 4. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## Vérification

Pour voir vos données dans Prisma Studio :
```bash
npm run db:studio
```





