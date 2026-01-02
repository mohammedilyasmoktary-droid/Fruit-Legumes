# 🔄 Comment redéployer sur Vercel

## 📍 Où trouver l'option de redéploiement

### Méthode 1 : Depuis la page Deployments (Recommandé)

1. **Allez dans votre projet Vercel**
   - Dashboard → Sélectionnez votre projet **fruit-legumes**

2. **Cliquez sur l'onglet "Deployments"** (en haut de la page)
   - Vous verrez une liste de tous vos déploiements

3. **Trouvez le dernier déploiement** (en haut de la liste)
   - Il devrait avoir un statut "Ready" ou "Building"

4. **Cliquez sur les 3 points (⋯)** à droite du déploiement
   - Ou passez la souris sur le déploiement pour voir les options

5. **Sélectionnez "Redeploy"**
   - Une confirmation peut apparaître
   - Cliquez sur "Redeploy" pour confirmer

6. **Attendez 2-3 minutes**
   - Le statut passera à "Building" puis "Ready"

### Méthode 2 : Depuis la page principale du projet

1. **Page principale du projet**
   - Vous verrez une section "Deployments" avec le dernier déploiement

2. **Cliquez sur les 3 points (⋯)** à côté du dernier déploiement

3. **Sélectionnez "Redeploy"**

### Méthode 3 : Redéploiement automatique

Si vous avez poussé des changements vers GitHub :
- Vercel redéploie **automatiquement** en 1-2 minutes
- Pas besoin de redéployer manuellement !

## ✅ Vérification

Après le redéploiement :
1. Le statut devrait être **"Ready"** (vert)
2. Cliquez sur le lien de votre site pour tester
3. L'upload d'images devrait maintenant fonctionner

## 🎯 Quand redéployer ?

Redéployez si :
- ✅ Vous venez de créer le Blob Storage
- ✅ Vous avez ajouté/modifié des variables d'environnement
- ✅ Vous voulez forcer un nouveau déploiement

**Pas besoin de redéployer si :**
- Vous avez juste poussé du code vers GitHub (redéploiement automatique)

---

**L'option "Redeploy" se trouve dans l'onglet "Deployments" de votre projet Vercel !**

