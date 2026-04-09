#!/bin/bash

# ==============================
# CONFIG
# ==============================
PROJECT_DIR="/Users/seb/Documents/Workspaces/forge"
COMMAND="pnpm forge"

# ==============================
# COLORS
# ==============================
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}🚀 Lancement du projet Forge...${NC}"

# ==============================
# CHECK DOSSIER
# ==============================
if [ ! -d "$PROJECT_DIR" ]; then
  echo -e "${RED}❌ Dossier introuvable : $PROJECT_DIR${NC}"
  exit 1
fi

cd "$PROJECT_DIR" || exit 1

# ==============================
# CHECK PNPM
# ==============================
if ! command -v pnpm &> /dev/null; then
  echo -e "${RED}❌ pnpm n'est pas installé.${NC}"
  exit 1
fi

# ==============================
# UPDATE OH MY ZSH (OPTIONNEL)
# ==============================
if [ -n "$ZSH" ]; then
  echo -e "${YELLOW}⚙️ Mise à jour Oh My Zsh disponible ?${NC}"
  read -p "👉 Voulez-vous vérifier les mises à jour ? (y/N) : " update_choice

  if [[ "$update_choice" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🔄 Mise à jour en cours...${NC}"
    omz update
  else
    echo -e "${YELLOW}⏭️ Mise à jour ignorée.${NC}"
  fi
fi

# ==============================
# LANCEMENT PROJET
# ==============================
echo -e "${GREEN}📦 Démarrage du projet...${NC}"
$COMMAND

# ==============================
# FIN
# ==============================
echo -e "${GREEN}✅ Script terminé.${NC}"