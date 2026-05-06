# 1755-resas — Upgrade Capacitor + iOS conformity + polish UI

**Date** : 2026-05-05
**Branche cible** : `ios-version` (basée sur `main`)
**Statut** : Design validé, en attente de plan d'implémentation

## Contexte

`1755-resas` est l'app admin React (CRA 4 + Semantic UI + Capacitor) qui sert à gérer les réservations du restaurant Baravin1755. Elle est livrée en deux formes :
- **Web** : déployée via gh-pages (commande `npm run deploy`).
- **iOS natif** : enveloppée Capacitor, distribuée via TestFlight / App Store.

Le back compagnon (`1755-back`, Heroku `le-1755`) reste **hors scope** de ce sprint : tous les endpoints consommés (auth, bookings CRUD, registrationToken FCM) continuent de fonctionner à l'identique.

L'app est **autonome** vis-à-vis de `1755-front` — on s'inspire seulement de son vocabulaire visuel, sans dépendance ni code partagé.

## Problème

1. **Capacitor 3 obsolète** : la version installée ne se compile plus avec Xcode 16, que l'App Store exige depuis 2024. Apple impose aussi le **Privacy Manifest** (`PrivacyInfo.xcprivacy`) sur toute nouvelle soumission.
2. **Deployment target iOS 12** : trop ancien pour les versions récentes de Capacitor et de Firebase iOS SDK.
3. **UI vieillissante** : safe-areas non gérées (notch ignoré), espacements et hiérarchie typo perfectibles, pas de cohérence visuelle avec l'identité Baravin1755 (`#2B2B29`, font système).
4. **WIP non commité** sur `ios-version` : une migration v3 → v4 a été ébauchée (package.json, Podfile, AppDelegate) mais jamais finalisée ni testée.

## Objectifs

- Migrer Capacitor jusqu'à la dernière stable (**v7**) en 4 paliers commités séparément.
- Aligner iOS deployment target sur **15.6** (minimum Capacitor 7).
- Conformer l'app aux exigences App Store 2026 (Xcode 16, Privacy Manifest, Firebase pinning).
- Polir l'UI des 3 écrans (Login / Home / AddBooking) en réutilisant le vocabulaire visuel de `1755-front`, sans dénaturer Semantic UI.
- **Garantir** que la version web reste fonctionnelle à chaque palier.

## Hors scope

- Modifications du back-end `1755-back`.
- Refonte composants Semantic UI ou changement de framework CSS.
- Build / signature Android (déléguée au PC Windows).
- Upload TestFlight (laissé à la main de l'utilisateur).
- Ajout de fonctionnalités produit (la liste de bookings, le formulaire et le flow login restent identiques).

## Design

### 1. Migration Capacitor (4 paliers)

Capacitor impose des sauts major par major. Chaque palier = un commit + un tag local pour rollback chirurgical.

| Palier | `@capacitor/*` | iOS deploy target | Notes |
|--------|----------------|-------------------|-------|
| **v4** | `^4.0.0` | 13.0 | Commit du WIP existant : `package.json`, Podfile (déjà à 15.0), `AppDelegate.swift` (suppression `touchesBegan`). Tag : `capacitor-v4-ok`. |
| **v5** | `^5.0.0` | 13.0 → 14.0 | `npx cap migrate`, pod install, vérif Xcode build. Tag : `capacitor-v5-ok`. |
| **v6** | `^6.0.0` | 14.0 → 15.0 | Xcode 15 minimum. Pas de plugin custom à adapter (push-notifications est officiel). Tag : `capacitor-v6-ok`. |
| **v7** | `^7.0.0` | 15.0 → 15.6 | + Privacy Manifest + Firebase pinning. Tag : `capacitor-v7-ok`. |

Pour chaque palier :
1. Bump `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, `@capacitor/cli` (devDep), `@capacitor/push-notifications`.
2. `npm install`.
3. `npx cap sync ios` (et `cap sync android` pour générer les fichiers).
4. Smoke test web (`npm start` → login → liste résas → create → delete).
5. Smoke test iOS (build Xcode simulateur iOS 18 → mêmes 3 actions + push test).
6. Commit + tag.

### 2. iOS / Pods / conformité Apple

**Podfile final** :
```ruby
platform :ios, '15.6'
use_frameworks!
inhibit_all_warnings!
# … capacitor_pods …
target 'App' do
  capacitor_pods
  pod 'Firebase/Messaging', '~> 11.0'
end
```

**Privacy Manifest** (`ios/App/App/PrivacyInfo.xcprivacy`) — déclare :
- `NSPrivacyTracking` : `false`
- `NSPrivacyCollectedDataTypes` : token push (linked, pas tracking).
- `NSPrivacyAccessedAPITypes` :
  - `UserDefaults` (CA92.1 : storage de prefs app)
  - Aucun fichier timestamp, aucun system boot, aucun disk space.

**Capabilities** (à reconfirmer dans Xcode après chaque palier) :
- Push Notifications.
- Background Modes → Remote notifications.

**Bridge APNs ↔ FCM** : déjà câblé dans `AppDelegate.swift` actuel. Vérifier au palier v4 que la migration ne l'a pas cassé. Si oui, restaurer (~20 lignes Swift, doc Firebase iOS).

**APNs auth key** `.p8` : déjà uploadée côté Firebase Console (projet `resas-d1707`, mémoire `reference_firebase_ios`). Rien à refaire.

**CocoaPods** : prérequis ≥ 1.15 pour Xcode 16. À vérifier (`pod --version`) avant le palier v6.

**Bundle version** en fin de sprint :
- `CFBundleShortVersionString` : `1.0.x` → `1.1.0`
- `CFBundleVersion` : incrémenter.

### 3. Android (préparation seulement)

Le WIP a déjà touché `android/build.gradle`, `app/build.gradle`, `variables.gradle`, `gradle-wrapper.properties`. On finalise pour Capacitor 7 :
- `minSdk = 23`
- `compileSdk = 35`
- Gradle wrapper aligné sur ce que Capacitor 7 génère.

**Aucun build local** côté Mac. Les changements seront validés par l'utilisateur sur PC Windows.

### 4. Polish UI

App autonome — **on copie l'esprit, pas le code** de `1755-front`.

**Vocabulaire visuel commun à porter** :
- Fond shell : `#2B2B29`.
- Stack typo système (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …`).
- Reset Semantic UI : `.ui.segment { border-radius:0; border:0 }`, `.column { padding:0; margin:0 }`.
- TopAppBar : `flex space-between`, border-bottom, fond `#2b2b29`.

**Adaptations iOS natives** :
- `<meta name="viewport" content="… viewport-fit=cover">` dans `public/index.html`.
- `padding-top: env(safe-area-inset-top)` sur le shell + `padding-bottom: env(safe-area-inset-bottom)` sur le footer/boutons sticky.
- Plugin `@capacitor/status-bar` installé : style `dark` (texte clair sur fond sombre), couleur de fond `#2B2B29`. Initialisé au boot dans `App.js`.

**Polish ciblé par écran** (commits séparés) :
- **Login** (`src/pages/Login/index.js`) : centrage vertical, logo Baravin1755, champs respirants, bouton primaire contrasté, état d'erreur soigné.
- **Home** (`src/pages/Home/index.js`) : cards bookings aérées, hiérarchie nom/heure/couverts, badges colorés pour statuts, espacement constant.
- **AddBooking-form** (`src/components/Forms/AddBooking-form/`) : groupage logique (date/heure / contact / commentaires), labels au-dessus, boutons sticky en bas.
- **TopAppBar** (`src/components/Small/TopAppBar/`) : safe-area top, titre centré, bouton burger/logout aligné.

**Hors scope du polish** :
- Pas de Tailwind, Chakra, ou autre.
- Pas de dark/light toggle (seulement dark).
- Pas de refonte des composants Semantic UI eux-mêmes.

### 5. Stratégie de validation

À chaque palier Capacitor, dans l'ordre :

1. **Smoke web** — `npm start`, navigateur :
   - Login admin (compte de test, base prod car pas de séparation dev/prod).
   - Affichage liste bookings.
   - Création d'une résa de test.
   - Suppression de cette résa.
2. **Smoke iOS** — `npm run build && npx cap sync ios && npx cap open ios`, simulateur iOS 18 dans Xcode :
   - Mêmes 3 actions.
   - Vérification push test (`POST /api/bookings/sendNotifTest`).
3. **Commit + tag** : `git tag capacitor-v<N>-ok`.

**Stop conditions** (j'arrête et demande à l'utilisateur) :
- Erreur Xcode rouge non résolue en 2 essais.
- Push notifications qui ne remontent plus (bridge APNs↔FCM).
- Comportement web différent (route cassée, axios différent).

### 6. Ordre d'exécution global du sprint

1. Commit du WIP v4 actuel + smoke web/iOS → tag `capacitor-v4-ok`.
2. Palier v5 → tag `capacitor-v5-ok`.
3. Palier v6 → tag `capacitor-v6-ok`.
4. Palier v7 + Privacy Manifest + Firebase pin + Podfile cleanup → tag `capacitor-v7-ok`.
5. Polish UI : `viewport-fit=cover` + safe-areas + StatusBar plugin (commit), puis Login (commit), Home (commit), AddBooking-form (commit), TopAppBar (commit).
6. Bump `1.0.x` → `1.1.0` + `CFBundleVersion` (commit).
7. Build Xcode → prêt pour archive TestFlight (utilisateur prend la main).

## Risques et mitigations

| Risque | Mitigation |
|--------|------------|
| Bridge APNs → FCM cassé par migration Capacitor | Vérification du flow push à chaque palier. Restauration AppDelegate Swift si besoin (doc Firebase). |
| Privacy Manifest rejeté par App Store Connect | Validation locale via `xcrun privacycheck` (Xcode 16) avant upload. |
| Régression web silencieuse | Smoke test web manuel à chaque palier, pas seulement iOS. |
| WIP corrompu (Podfile / AppDelegate non synchro avec package.json v4) | Au palier v4, après commit, `pod deintegrate && pod install` pour clean state. |
| Lockage Cocoapods version (Xcode 16 exige ≥ 1.15) | `pod --version` vérifié avant palier v6. |

## Ce qui n'est PAS dans ce design

- Refonte du modèle de données bookings.
- Migration auth (JWT reste sur `localStorage` clé `token-1755`).
- Internationalisation.
- Mode hors-ligne.
- Tests automatisés (cf. CLAUDE.md : "pas d'infra de tests").

## Suite

Une fois ce design validé, passage à la skill `writing-plans` pour produire le plan d'implémentation détaillé (étape par étape, fichiers touchés, commandes shell).
