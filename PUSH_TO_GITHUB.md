# 📤 Pousser les changements vers GitHub

## 📋 État actuel

Vous avez **4 commits** qui n'ont pas été poussés vers GitHub :

1. `Force dynamic rendering on homepage`
2. `Force dynamic rendering to prevent caching issues`
3. `Fix: Replace img tags with Next.js Image component`
4. `Add images to categories in seed data`

## 🚀 Comment pousser

### Option 1 : Via Terminal (Recommandé)

1. Ouvrez votre Terminal
2. Exécutez :
   ```bash
   cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
   git push origin main
   ```

3. GitHub vous demandera :
   - **Username**: `mohammedilyasmoktary-droid`
   - **Password**: Utilisez votre **Personal Access Token** (pas votre mot de passe GitHub)

### Option 2 : Si vous n'avez plus le token

1. Allez sur [GitHub.com](https://github.com) → votre profil → **Settings**
2. **Developer settings** (en bas du menu de gauche)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Donnez un nom : `Vercel Deployment`
6. Sélectionnez la durée (90 days ou No expiration)
7. Cochez la case **`repo`** (accès complet aux dépôts)
8. Cliquez sur **Generate token**
9. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)
10. Utilisez ce token comme mot de passe lors du `git push`

### Option 3 : Utiliser le token dans l'URL (Alternative)

Si vous préférez, vous pouvez configurer Git pour utiliser le token directement :

```bash
git remote set-url origin https://VOTRE-TOKEN@github.com/mohammedilyasmoktary-droid/Fruit-Legumes.git
git push origin main
```

Puis remettez l'URL normale après :
```bash
git remote set-url origin https://github.com/mohammedilyasmoktary-droid/Fruit-Legumes.git
```

## ✅ Après le push

Une fois le push réussi :

1. Allez sur [GitHub.com/mohammedilyasmoktary-droid/Fruit-Legumes](https://github.com/mohammedilyasmoktary-droid/Fruit-Legumes)
2. Vérifiez que vos commits sont visibles
3. Vercel redéploiera automatiquement (2-3 minutes)
4. Vos produits devraient maintenant s'afficher !

## 🔍 Vérification

Pour vérifier que le push a réussi :

```bash
git status
```

Vous devriez voir :
```
Your branch is up to date with 'origin/main'.
```

---

**Exécutez `git push origin main` dans votre Terminal maintenant !**

