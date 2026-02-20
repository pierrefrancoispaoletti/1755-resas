# 1755 RESA — Application de réservation Baravin

Application hybride web/mobile de gestion des réservations pour le restaurant **Baravin Le 1755** à Ajaccio.

## Stack technique

- **React 18** avec Create React App
- **Material-UI (MUI) v7** — composants UI, thème, système de design
- **React Hook Form + Yup** — formulaires avec validation
- **React Query v5** — gestion de l'état serveur (config)
- **Context API** — état global (utilisateur, notifications, messages)
- **Capacitor 6** — builds natifs iOS et Android
- **React Router v5** (HashRouter) — navigation compatible mobile
- **Emotion** — CSS-in-JS via `sx` prop MUI

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Lancer les tests
npm test

# Build production
npm run build
```

## Développement mobile (Capacitor)

```bash
# Synchroniser le build web avec les plateformes natives
npm run build && npx cap sync

# Ouvrir Android Studio
npx cap open android

# Ouvrir Xcode
npx cap open ios
```

## Architecture

Voir [CLAUDE.md](./CLAUDE.md) pour la documentation complète de l'architecture, des patterns de développement et de l'historique des décisions techniques.

## Backend

API hébergée sur Heroku : `https://le-1755.herokuapp.com`

App ID Capacitor : `com.baravin1755`
