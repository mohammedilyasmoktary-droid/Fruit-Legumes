#!/bin/bash

# Script pour configurer GitHub - Fruits et Légumes Mogador
# Utilisation: ./setup-github.sh VOTRE-USERNAME NOM-DU-DEPOT

echo "🚀 Configuration GitHub pour Fruits et Légumes Mogador"
echo ""

# Vérifier les arguments
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Erreur: Vous devez fournir votre username GitHub et le nom du dépôt"
    echo ""
    echo "Usage: ./setup-github.sh VOTRE-USERNAME NOM-DU-DEPOT"
    echo "Exemple: ./setup-github.sh ilyasmoktary fruits-legumes-mogador"
    exit 1
fi

USERNAME=$1
REPO_NAME=$2
REPO_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo "📋 Configuration:"
echo "   Username: $USERNAME"
echo "   Dépôt: $REPO_NAME"
echo "   URL: $REPO_URL"
echo ""

# Vérifier que Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Installez Git d'abord."
    exit 1
fi

echo "✅ Git est installé: $(git --version)"
echo ""

# Aller dans le dossier du projet
cd "$(dirname "$0")"
echo "📁 Dossier actuel: $(pwd)"
echo ""

# Vérifier l'état
echo "📊 Vérification de l'état Git..."
git status --short | head -10
echo ""

# Demander confirmation
read -p "Voulez-vous continuer? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Annulé."
    exit 1
fi

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .
echo "✅ Fichiers ajoutés"
echo ""

# Créer le commit
echo "💾 Création du commit..."
git commit -m "Initial commit - Fruits et Légumes Mogador"
echo "✅ Commit créé"
echo ""

# Renommer la branche
echo "🌿 Renommage de la branche en 'main'..."
git branch -M main
echo "✅ Branche renommée"
echo ""

# Vérifier si le remote existe déjà
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Un remote 'origin' existe déjà."
    read -p "Voulez-vous le remplacer? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo "✅ Remote supprimé"
    else
        echo "❌ Annulé. Le remote existant n'a pas été modifié."
        exit 1
    fi
fi

# Ajouter le remote
echo "🔗 Ajout du remote GitHub..."
git remote add origin "$REPO_URL"
echo "✅ Remote ajouté: $REPO_URL"
echo ""

# Pousser vers GitHub
echo "⬆️  Envoi du code vers GitHub..."
echo "⚠️  GitHub vous demandera vos identifiants:"
echo "   - Username: $USERNAME"
echo "   - Password: Utilisez un Personal Access Token (pas votre mot de passe)"
echo ""
read -p "Appuyez sur Entrée pour continuer..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Succès! Votre code est maintenant sur GitHub!"
    echo "🔗 Dépôt: https://github.com/${USERNAME}/${REPO_NAME}"
    echo ""
    echo "📝 Prochaine étape: Déployez sur Vercel (voir DEPLOY_QUICK_START.md)"
else
    echo ""
    echo "❌ Erreur lors du push. Vérifiez:"
    echo "   1. Que le dépôt existe sur GitHub"
    echo "   2. Que vous avez les bonnes permissions"
    echo "   3. Que vous utilisez un Personal Access Token"
    echo ""
    echo "Consultez GITHUB_SETUP.md pour plus d'aide."
fi

