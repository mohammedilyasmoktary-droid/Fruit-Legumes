# Fruits & Légumes - Application E-commerce

Application web en français pour une épicerie en ligne de fruits et légumes avec livraison à domicile.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** (ORM)
- **PostgreSQL** (base de données)

## 📋 Prérequis

- Node.js 18+ et npm
- PostgreSQL installé et en cours d'exécution

## 🛠️ Installation

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configurer la base de données PostgreSQL :**
   
   Créez un fichier `.env` à la racine du projet avec :
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/fruits_legumes?schema=public"
   ADMIN_KEY="votre-cle-secrete-admin"
   ```
   
   Remplacez `user`, `password`, `localhost`, `5432` et `fruits_legumes` par vos propres valeurs.
   **Important :** Définissez une `ADMIN_KEY` sécurisée pour accéder au panneau d'administration.
   
   Puis créez la base de données :
   ```bash
   npm run db:create
   npm run db:push
   ```

3. **Remplir la base de données avec des données de test :**
   ```bash
   npm run db:seed
   ```

4. **Ajouter les images de produits (optionnel) :**
   
   Placez les images des produits dans le dossier `public/products/` ou utilisez l'upload dans l'admin.
   Les images uploadées via l'admin seront stockées dans `public/uploads/`.

## 🏃 Démarrage

Lancer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── boutique/          # Page boutique
│   ├── produit/[slug]/    # Page détail produit
│   ├── panier/            # Page panier
│   ├── commande/          # Page commande
│   ├── confirmation/      # Page confirmation
│   └── admin/             # Pages admin (protégées)
├── components/            # Composants React réutilisables
│   ├── ui/                # Composants UI primitifs
│   └── admin/             # Composants admin
├── contexts/              # Contextes React (panier)
├── lib/                   # Utilitaires (Prisma client)
├── prisma/                # Schéma Prisma et seed
└── public/                # Fichiers statiques
    ├── products/          # Images produits (seed)
    └── uploads/           # Images uploadées via admin
```

## 🎨 Pages disponibles

### Pages utilisateur

- **/** - Accueil avec hero et catégories vedettes
- **/boutique** - Catalogue produits avec recherche et filtres
- **/produit/[slug]** - Détail d'un produit
- **/panier** - Panier d'achat
- **/commande** - Formulaire de commande
- **/confirmation/[id]** - Page de confirmation de commande

### Pages admin (protégées)

- **/admin/login** - Connexion admin (requiert ADMIN_KEY)
- **/admin** - Tableau de bord avec KPIs
- **/admin/commandes** - Liste des commandes avec filtres
- **/admin/commandes/[id]** - Détail d'une commande
- **/admin/produits** - Gestion des produits (CRUD)
- **/admin/produits/nouveau** - Créer un nouveau produit
- **/admin/produits/[id]/modifier** - Modifier un produit

## 🔐 Authentification Admin

L'accès à l'administration est protégé par une clé secrète :

1. Définissez `ADMIN_KEY` dans votre fichier `.env`
2. Accédez à `/admin/login`
3. Entrez la clé d'accès
4. Une session cookie sera créée (valide 7 jours)

## 📤 Upload d'images

Les administrateurs peuvent uploader des images de produits via l'interface admin :

1. Accédez à la création/modification d'un produit
2. Cliquez sur "Choisir une image"
3. Sélectionnez une image (max 5MB, formats: JPG, PNG, WebP)
4. L'image sera sauvegardée dans `public/uploads/` et l'URL sera automatiquement remplie

Les images sont accessibles publiquement via `/uploads/[filename]`.

## 🗄️ Base de données

Le projet utilise **PostgreSQL** comme base de données.

Le schéma Prisma inclut :

- **Category** - Catégories de produits
- **Product** - Produits
- **Order** - Commandes
- **OrderItem** - Articles d'une commande

### Configuration PostgreSQL

Assurez-vous d'avoir PostgreSQL installé et en cours d'exécution. Créez une base de données :

```sql
CREATE DATABASE fruits_legumes;
```

Puis configurez la variable d'environnement `DATABASE_URL` dans `.env`.

## 📝 Commandes disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run start` - Lancer le serveur de production
- `npm run db:create` - Créer la base de données PostgreSQL
- `npm run db:push` - Pousser le schéma vers la base de données (sans migration)
- `npm run db:migrate` - Créer et appliquer une migration
- `npm run db:seed` - Remplir la base avec des données de test
- `npm run db:studio` - Ouvrir Prisma Studio (interface graphique)

## 🎯 Fonctionnalités

### Utilisateur

- ✅ Navigation dans le catalogue avec design "primeur" moderne
- ✅ Recherche et filtres (catégorie, prix)
- ✅ Ajout au panier avec gestion des quantités
- ✅ Formulaire de commande avec validation
- ✅ Sélection de créneau de livraison
- ✅ Page de confirmation
- ✅ Images avec fallback automatique

### Admin

- ✅ Authentification par clé secrète (ADMIN_KEY)
- ✅ Tableau de bord avec statistiques (KPIs)
- ✅ Gestion des commandes (liste, détail, mise à jour du statut)
- ✅ Gestion des produits (CRUD complet)
- ✅ Upload d'images pour les produits
- ✅ Interface admin séparée avec sidebar et header
- ✅ Filtres et recherche

## 🎨 Design

Le design s'inspire d'un marché de fruits et légumes ("primeur") avec :

- **Couleurs** : Verts frais (#22c55e), accents orange (#fb923c), highlights baies (#ec4899)
- **Composants** : Cartes arrondies, ombres subtiles, gradients doux
- **Typographie** : Hiérarchie claire, espacements cohérents
- **Interactions** : Transitions fluides, hover effects, micro-animations
- **Responsive** : Mobile-first, adaptatif à tous les écrans

## ⚠️ Notes importantes

- **Authentification Admin** : L'admin est protégé par ADMIN_KEY (définie dans .env)
- **Pas de paiement** : Les commandes sont créées mais aucun paiement n'est traité
- **Images** : Les images peuvent être uploadées via l'admin ou placées manuellement dans `public/products/`
- **Base de données** : PostgreSQL est utilisé (configurez `DATABASE_URL` dans `.env`)
- **Sessions** : Les sessions admin sont stockées dans des cookies (valides 7 jours)

## 📄 Licence

Ce projet est un MVP de démonstration.
