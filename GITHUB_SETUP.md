# 📚 Guide étape par étape - Configuration GitHub

Ce guide vous explique exactement comment créer un dépôt GitHub et y pousser votre code.

## 📋 Prérequis

- Un compte GitHub (créez-en un sur [github.com](https://github.com) si vous n'en avez pas)
- Git installé sur votre Mac (généralement déjà installé)

## 🚀 Étapes détaillées

### Étape 1: Vérifier que Git est installé

Ouvrez le Terminal et exécutez :

```bash
git --version
```

Si vous voyez une version (ex: `git version 2.39.0`), c'est bon ! Sinon, installez Git.

### Étape 2: Configurer Git (si pas déjà fait)

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

Remplacez par votre nom et email GitHub.

### Étape 3: Créer le dépôt sur GitHub.com

1. **Allez sur GitHub.com** et connectez-vous
2. **Cliquez sur le bouton "+"** en haut à droite
3. **Sélectionnez "New repository"**
4. **Remplissez le formulaire** :
   - **Repository name**: `fruits-legumes-mogador` (ou un autre nom)
   - **Description** (optionnel): "Site e-commerce de fruits et légumes avec livraison à domicile"
   - **Visibilité**: Choisissez **Public** ou **Private**
   - ⚠️ **IMPORTANT**: **NE COCHEZ PAS** "Add a README file"
   - ⚠️ **NE COCHEZ PAS** "Add .gitignore"
   - ⚠️ **NE COCHEZ PAS** "Choose a license"
5. **Cliquez sur "Create repository"**

### Étape 4: Copier l'URL du dépôt

Après avoir créé le dépôt, GitHub vous montrera une page avec des instructions. 

**Copiez l'URL HTTPS** qui ressemble à :
```
https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git
```

⚠️ Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub.

### Étape 5: Préparer votre code local

Ouvrez le Terminal et naviguez vers votre projet :

```bash
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"
```

### Étape 6: Vérifier l'état de Git

```bash
git status
```

Vous devriez voir tous vos fichiers listés comme "Untracked files".

### Étape 7: Ajouter tous les fichiers

```bash
git add .
```

Cette commande ajoute tous les fichiers au staging area.

### Étape 8: Créer le premier commit

```bash
git commit -m "Initial commit - Fruits et Légumes Mogador"
```

Cette commande crée un "snapshot" de votre code avec un message de description.

### Étape 9: Renommer la branche principale (si nécessaire)

```bash
git branch -M main
```

Cette commande renomme votre branche en "main" (standard GitHub).

### Étape 10: Connecter votre projet local à GitHub

Remplacez `VOTRE-USERNAME` et `fruits-legumes-mogador` par vos valeurs :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git
```

Par exemple, si votre username est `ilyasmoktary` :
```bash
git remote add origin https://github.com/ilyasmoktary/fruits-legumes-mogador.git
```

### Étape 11: Pousser le code vers GitHub

```bash
git push -u origin main
```

Cette commande envoie votre code vers GitHub.

**Si c'est la première fois**, GitHub vous demandera de vous authentifier :
- **Username**: Votre nom d'utilisateur GitHub
- **Password**: Utilisez un **Personal Access Token** (pas votre mot de passe GitHub)

### Étape 12: Créer un Personal Access Token (si nécessaire)

Si GitHub vous demande un token :

1. Allez sur GitHub.com → **Settings** (icône profil en haut à droite)
2. **Developer settings** (en bas du menu de gauche)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Donnez un nom : `Vercel Deployment`
6. Sélectionnez la durée : **90 days** (ou No expiration)
7. Cochez la case **`repo`** (accès complet aux dépôts)
8. Cliquez sur **Generate token**
9. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)
10. Utilisez ce token comme mot de passe lors du `git push`

### Étape 13: Vérifier que tout est en ligne

1. Rafraîchissez la page de votre dépôt sur GitHub.com
2. Vous devriez voir tous vos fichiers !

## ✅ Vérification finale

Vérifiez que tout est bien connecté :

```bash
git remote -v
```

Vous devriez voir :
```
origin  https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git (fetch)
origin  https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git (push)
```

## 🔄 Commandes utiles pour plus tard

### Voir les changements
```bash
git status
```

### Ajouter des fichiers modifiés
```bash
git add .
```

### Créer un commit
```bash
git commit -m "Description de vos changements"
```

### Pousser vers GitHub
```bash
git push
```

### Voir l'historique
```bash
git log --oneline
```

## 🐛 Dépannage

### Erreur: "remote origin already exists"

Si vous avez déjà ajouté un remote, supprimez-le d'abord :
```bash
git remote remove origin
```
Puis refaites l'étape 10.

### Erreur: "Authentication failed"

1. Vérifiez que vous utilisez un Personal Access Token (pas votre mot de passe)
2. Vérifiez que le token a les permissions `repo`
3. Créez un nouveau token si nécessaire

### Erreur: "Permission denied"

Vérifiez que l'URL du dépôt est correcte et que vous avez les droits d'écriture.

## 📝 Résumé des commandes (copier-coller)

Une fois que vous avez créé le dépôt sur GitHub.com, exécutez ces commandes dans l'ordre :

```bash
# 1. Aller dans le dossier du projet
cd "/Users/ilyasmoktary/Desktop/Fruits&Légumes"

# 2. Vérifier l'état
git status

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le commit
git commit -m "Initial commit - Fruits et Légumes Mogador"

# 5. Renommer la branche
git branch -M main

# 6. Ajouter le remote (REMPLACEZ par votre URL)
git remote add origin https://github.com/VOTRE-USERNAME/fruits-legumes-mogador.git

# 7. Pousser vers GitHub
git push -u origin main
```

## 🎉 C'est fait !

Votre code est maintenant sur GitHub ! Vous pouvez maintenant :
- Partager le lien avec d'autres développeurs
- Connecter le dépôt à Vercel pour le déploiement
- Utiliser GitHub pour suivre les changements

**Prochaine étape**: Consultez `DEPLOY_QUICK_START.md` pour déployer sur Vercel !

