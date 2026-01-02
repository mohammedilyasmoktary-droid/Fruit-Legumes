# 🔍 Dépannage : Produits ne s'affichent pas

## ✅ Ce qui a été fait

1. ✅ Base de données initialisée (`prisma db push`)
2. ✅ Données ajoutées (`npm run db:seed`) sur la base de production Neon
3. ✅ 4 catégories avec images créées
4. ✅ 31 produits créés

## 🔄 Actions à essayer

### 1. Rafraîchir la page

- **Rafraîchissement simple** : F5 ou Cmd+R
- **Rafraîchissement forcé** : Cmd+Shift+R (vide le cache)

### 2. Vérifier l'URL

Assurez-vous d'être sur :
- ✅ `https://fruit-legumes.vercel.app/boutique` (production)
- ❌ PAS sur `localhost:3000` (local)

### 3. Vérifier la console du navigateur

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet **Console**
3. Cherchez des erreurs en rouge
4. Allez dans l'onglet **Network**
5. Rechargez la page
6. Cherchez les requêtes vers `/api/products` ou `/boutique`
7. Vérifiez si elles retournent des données

### 4. Vérifier directement l'API

Essayez d'accéder directement à l'API :
```
https://fruit-legumes.vercel.app/api/products
```

Vous devriez voir un JSON avec tous les produits.

### 5. Vérifier la base de données

Si vous avez accès à Neon :
1. Allez sur [neon.tech](https://neon.tech)
2. Connectez-vous
3. Ouvrez votre base de données
4. Vérifiez que les tables `Category` et `Product` contiennent des données

### 6. Vérifier les logs Vercel

1. Allez dans Vercel → votre projet → **Logs**
2. Regardez les logs en temps réel
3. Rechargez la page de la boutique
4. Vérifiez s'il y a des erreurs

## 🐛 Erreurs communes

### Erreur: "Cannot read property of undefined"

→ Vérifiez que les données sont bien dans la base de données

### Erreur: "Failed to fetch"

→ Vérifiez que l'API fonctionne (`/api/products`)

### Aucune erreur mais pas de produits

→ Vérifiez que vous êtes sur la bonne URL (production, pas localhost)

## 🔧 Solution alternative : Vérifier via l'admin

1. Allez sur `https://fruit-legumes.vercel.app/admin`
2. Allez dans "Produits"
3. Vérifiez si les produits sont listés là

Si les produits sont visibles dans l'admin mais pas sur le site public, c'est un problème d'affichage, pas de données.

## 📝 Checklist

- [ ] Page rafraîchie avec Cmd+Shift+R
- [ ] URL correcte (production, pas localhost)
- [ ] Console du navigateur vérifiée (pas d'erreurs)
- [ ] API `/api/products` testée directement
- [ ] Logs Vercel vérifiés
- [ ] Admin vérifié (produits visibles ?)

---

**Essayez d'abord de rafraîchir avec Cmd+Shift+R et vérifiez la console du navigateur !**

