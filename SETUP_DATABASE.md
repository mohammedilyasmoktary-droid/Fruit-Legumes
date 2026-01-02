# Configuration de la base de données PostgreSQL

## Option 1 : Via l'application Postgres (Recommandé)

1. **Ouvrez l'application Postgres** (déjà ouverte sur votre Mac)

2. **Connectez-vous à votre serveur PostgreSQL** :
   - Cliquez sur "Connect..." dans l'application Postgres
   - Utilisez vos identifiants PostgreSQL (généralement `postgres` comme utilisateur)

3. **Créez la base de données** :
   - Une fois connecté, vous devriez voir une interface SQL ou un explorateur de bases de données
   - Exécutez la commande SQL suivante :
     ```sql
     CREATE DATABASE fruits_legumes;
     ```
   - Ou utilisez l'interface graphique pour créer une nouvelle base de données nommée `fruits_legumes`

4. **Vérifiez la création** :
   - La base de données `fruits_legumes` devrait apparaître dans la liste des bases de données

## Option 2 : Via psql en ligne de commande

Si vous préférez utiliser la ligne de commande, trouvez d'abord le chemin de psql :

```bash
# Chercher psql (généralement dans /Applications/Postgres.app/Contents/Versions/*/bin/)
find /Applications -name psql 2>/dev/null
```

Puis connectez-vous :

```bash
# Remplacez le chemin par celui trouvé ci-dessus
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U postgres

# Une fois connecté, exécutez :
CREATE DATABASE fruits_legumes;
\q
```

## Option 3 : Via une autre application (pgAdmin, DBeaver, etc.)

Si vous utilisez une autre application de gestion PostgreSQL :
1. Connectez-vous à votre serveur PostgreSQL
2. Créez une nouvelle base de données nommée `fruits_legumes`
3. Utilisez le schéma par défaut `public`

## Après la création de la base de données

1. **Créez le fichier `.env.local`** à la racine du projet :
   ```env
   DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/fruits_legumes?schema=public"
   ```
   Remplacez `VOTRE_MOT_DE_PASSE` par votre mot de passe PostgreSQL.

2. **Initialisez le schéma** :
   ```bash
   npm run db:push
   ```

3. **Remplissez avec les données de test** :
   ```bash
   npm run db:seed
   ```

## Vérification

Pour vérifier que tout fonctionne :

```bash
npm run db:studio
```

Cela ouvrira Prisma Studio où vous pourrez voir vos tables et données.





