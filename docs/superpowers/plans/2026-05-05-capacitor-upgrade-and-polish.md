# Capacitor 4→7 Upgrade + iOS Conformity + Polish UI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrer `1755-resas` de Capacitor 3 (avec WIP v4) jusqu'à Capacitor 7, conformer le build iOS aux exigences App Store 2026 (Xcode 16, Privacy Manifest), et polir les 3 écrans de l'app au vocabulaire visuel Baravin1755 — tout en gardant la version web fonctionnelle.

**Architecture:** Migration en 4 paliers Capacitor commités et tagués séparément, puis ajout du Privacy Manifest et du pin Firebase, puis polish UI commit par écran. Pas de modification du back, pas de build Android local (délégué PC Windows), pas de tests auto (cf. CLAUDE.md).

**Tech Stack:** React 17, CRA 4, semantic-ui-react, axios, Capacitor 7 (cible), CocoaPods, Xcode 16, Firebase Messaging iOS 11.

**Spec source:** `docs/superpowers/specs/2026-05-05-capacitor-upgrade-and-polish-design.md`

**Branche de travail:** `ios-version` (déjà active).

---

## Notes globales

### Pas de TDD ici

CLAUDE.md du projet : **pas de Jest/Mocha**, vérification manuelle uniquement. Les "tests" du plan sont des **smoke tests manuels** (web dans navigateur + iOS dans Xcode simulateur). Ne pas introduire de framework de test.

### Procédure smoke test standard (référencée par les tâches)

**Smoke web (à faire dans un terminal séparé) :**
1. `npm start` (depuis `/Users/pierrefrancoispaoletti/appdevelopment/1755-resas`)
2. Ouvrir `http://localhost:3000` dans un navigateur.
3. Login admin (creds connues de l'utilisateur).
4. Vérifier affichage liste bookings (`/bookings`).
5. Créer une résa de test depuis `/` (le formulaire AddBooking).
6. Aller sur `/bookings`, supprimer la résa créée.
7. Logout.
8. Si tout OK : palier validé côté web.

**Smoke iOS (Xcode) :**
1. `npm run build` (génère `build/`).
2. `npx cap sync ios`.
3. `npx cap open ios` → ouvre `ios/App/App.xcworkspace` dans Xcode.
4. Sélectionner simulateur **iPhone 16 Pro (iOS 18)**.
5. Cmd+R pour build & run.
6. Login admin → liste bookings → create → delete.
7. Demander à l'utilisateur de tester la push : `POST https://le-1755.herokuapp.com/api/bookings/sendNotifTest` (l'utilisateur a la commande).
8. Si tout OK : palier validé côté iOS.

### Tag local après chaque palier

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git tag capacitor-v<N>-ok
```

### Stop conditions (à respecter par l'agent d'exécution)

- Erreur Xcode rouge non résolue en 2 essais → demander à l'utilisateur.
- Push notifications qui ne remontent plus (bridge APNs↔FCM) → demander à l'utilisateur.
- Comportement web différent (route cassée, axios différent) → demander à l'utilisateur.

---

## Task 1 : Pré-flight et baseline

**But :** Confirmer l'état initial, capturer les versions outils, sécuriser le WIP existant.

**Files:**
- Read only: `package.json`, `ios/App/Podfile`, `ios/App/App/AppDelegate.swift`

- [ ] **Step 1.1 : Vérifier branche et état git**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git branch --show-current
git status --short
```

Attendu : branche `ios-version`, plusieurs fichiers `M` (modifiés non commités) liés au WIP Capacitor 4 (package.json, ios/Podfile, AppDelegate, android/*).

- [ ] **Step 1.2 : Capturer versions outils**

```bash
node --version          # attendu : >= 18
npm --version
pod --version           # attendu : >= 1.15 pour Xcode 16
xcodebuild -version     # attendu : Xcode 16.x
```

Si `pod` < 1.15 : `sudo gem install cocoapods` (l'utilisateur doit valider l'install).

Si Xcode < 16 : **STOP**, demander à l'utilisateur d'updater via App Store.

- [ ] **Step 1.3 : Vérifier qu'aucun build Xcode en cours**

```bash
ls /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/DerivedData 2>/dev/null
```

Si présent et lourd : nettoyer pour repartir propre.

```bash
rm -rf /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/DerivedData
```

- [ ] **Step 1.4 : Sauvegarder baseline (tag avant tout commit)**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git tag pre-capacitor-upgrade-baseline
```

Permet de revenir à l'état initial si tout part en vrille.

---

## Task 2 : Palier Capacitor v4 — finaliser le WIP

**But :** Commit du WIP v3→v4 déjà préparé, smoke test, tag.

**Files:**
- Modify (déjà modifiés non commités) : `package.json`, `package-lock.json`, `ios/App/Podfile`, `ios/App/App/AppDelegate.swift`, `ios/App/App/Info.plist`, `ios/App/App.xcodeproj/project.pbxproj`, `android/*`

- [ ] **Step 2.1 : Inspecter le diff actuel**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git diff --stat
git diff package.json
```

Confirmer : `@capacitor/*` à `^4.0.0`, `@capacitor/cli` déplacé en `devDependencies`.

- [ ] **Step 2.2 : npm install pour matérialiser v4**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm install
```

Attendu : install propre. Si erreur peer dep, ajouter `--legacy-peer-deps` (CRA 4 + React 17 nécessite parfois ce flag).

- [ ] **Step 2.3 : Pod install propre côté iOS**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/App
pod deintegrate
pod install --repo-update
```

Attendu : pods Capacitor v4 installés, `Podfile.lock` régénéré.

- [ ] **Step 2.4 : Vérifier que le bridge APNs→FCM est intact**

Lire `ios/App/App/AppDelegate.swift`. Doit contenir :
- `import Firebase` (ou `import FirebaseCore` + `import FirebaseMessaging`)
- `FirebaseApp.configure()` dans `didFinishLaunchingWithOptions`
- `Messaging.messaging().apnsToken = deviceToken` dans `didRegisterForRemoteNotificationsWithDeviceToken`
- Optionnel : récupération du token FCM via `Messaging.messaging().token`

Si une de ces lignes manque (la migration v4 a pu nettoyer des choses) : **STOP**, signaler à l'utilisateur. Le bridge sera restauré au step 7 si besoin.

- [ ] **Step 2.5 : Build web pour vérifier qu'il compile**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm run build
```

Attendu : build CRA OK, dossier `build/` généré. Avertissements ESLint tolérés, pas d'erreurs.

- [ ] **Step 2.6 : Sync Capacitor iOS**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap sync ios
```

Attendu : `[info] Sync finished in Xs`.

- [ ] **Step 2.7 : Smoke test web**

Suivre la procédure "Smoke web" en haut. Si KO → STOP.

- [ ] **Step 2.8 : Smoke test iOS**

Suivre la procédure "Smoke iOS" en haut. Si KO → STOP.

- [ ] **Step 2.9 : Commit + tag v4**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add package.json package-lock.json ios/App/Podfile ios/App/Podfile.lock ios/App/App/AppDelegate.swift ios/App/App/Info.plist ios/App/App.xcodeproj android
git commit -m "$(cat <<'EOF'
chore(capacitor): migrate to v4

- @capacitor/{core,ios,android,push-notifications} ^4.0.0
- @capacitor/cli déplacé en devDependencies
- iOS deployment target 12 → 15 (Podfile)
- Suppression touchesBegan statusBar dans AppDelegate (Capacitor 4 le gère)
- Aligne android/* sur les targets v4

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git tag capacitor-v4-ok
```

---

## Task 3 : Palier Capacitor v5

**But :** Bump v4→v5, deployment target iOS 14, smoke, tag.

**Files:**
- Modify : `package.json`, `package-lock.json`, `ios/App/Podfile`, `ios/App/Podfile.lock`, fichiers Xcode/Android touchés par `cap migrate`.

- [ ] **Step 3.1 : Bump deps Capacitor v5**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm install @capacitor/core@^5.0.0 @capacitor/ios@^5.0.0 @capacitor/android@^5.0.0 @capacitor/push-notifications@^5.0.0
npm install --save-dev @capacitor/cli@^5.0.0
```

- [ ] **Step 3.2 : Lancer cap migrate**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap migrate
```

`cap migrate` modifie automatiquement Podfile, build.gradle, AndroidManifest. Lire son output, accepter les changements proposés.

- [ ] **Step 3.3 : Forcer iOS deployment target à 14**

Vérifier `ios/App/Podfile` ligne `platform :ios, '14.0'`. Si `cap migrate` n'a pas bumpé, éditer manuellement.

```ruby
platform :ios, '14.0'
```

- [ ] **Step 3.4 : Pod install**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/App
pod install --repo-update
```

- [ ] **Step 3.5 : Build web**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm run build
```

- [ ] **Step 3.6 : Sync iOS**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap sync ios
```

- [ ] **Step 3.7 : Smoke test web** (procédure standard)

- [ ] **Step 3.8 : Smoke test iOS** (procédure standard)

- [ ] **Step 3.9 : Commit + tag v5**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add -A
git commit -m "$(cat <<'EOF'
chore(capacitor): migrate to v5

- @capacitor/* ^5.0.0
- iOS deployment target 13 → 14
- npx cap migrate appliqué

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git tag capacitor-v5-ok
```

---

## Task 4 : Palier Capacitor v6

**But :** Bump v5→v6, deployment target iOS 15, smoke, tag.

- [ ] **Step 4.1 : Vérifier CocoaPods >= 1.15**

```bash
pod --version
```

Si < 1.15 : `sudo gem install cocoapods` (validation utilisateur requise).

- [ ] **Step 4.2 : Vérifier Xcode 15+**

```bash
xcodebuild -version
```

Capacitor 6 nécessite Xcode 15. Si < 15 → STOP.

- [ ] **Step 4.3 : Bump deps Capacitor v6**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm install @capacitor/core@^6.0.0 @capacitor/ios@^6.0.0 @capacitor/android@^6.0.0 @capacitor/push-notifications@^6.0.0
npm install --save-dev @capacitor/cli@^6.0.0
```

- [ ] **Step 4.4 : cap migrate**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap migrate
```

- [ ] **Step 4.5 : Forcer iOS deployment target à 15**

Vérifier `ios/App/Podfile` :

```ruby
platform :ios, '15.0'
```

- [ ] **Step 4.6 : Pod install**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/App
pod install --repo-update
```

- [ ] **Step 4.7 : Build web**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm run build
```

- [ ] **Step 4.8 : Sync iOS**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap sync ios
```

- [ ] **Step 4.9 : Smoke test web** (procédure standard)

- [ ] **Step 4.10 : Smoke test iOS** (procédure standard)

- [ ] **Step 4.11 : Commit + tag v6**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add -A
git commit -m "$(cat <<'EOF'
chore(capacitor): migrate to v6

- @capacitor/* ^6.0.0
- iOS deployment target 14 → 15
- Xcode 15+ requis
- npx cap migrate appliqué

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git tag capacitor-v6-ok
```

---

## Task 5 : Palier Capacitor v7

**But :** Bump v6→v7, deployment target iOS 15.6, smoke, tag.

- [ ] **Step 5.1 : Bump deps Capacitor v7**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm install @capacitor/core@^7.0.0 @capacitor/ios@^7.0.0 @capacitor/android@^7.0.0 @capacitor/push-notifications@^7.0.0
npm install --save-dev @capacitor/cli@^7.0.0
```

- [ ] **Step 5.2 : cap migrate**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap migrate
```

- [ ] **Step 5.3 : Forcer iOS deployment target à 15.6**

Éditer `ios/App/Podfile` :

```ruby
platform :ios, '15.6'
```

- [ ] **Step 5.4 : Pod install**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/App
pod install --repo-update
```

- [ ] **Step 5.5 : Build web**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm run build
```

- [ ] **Step 5.6 : Sync iOS**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap sync ios
```

- [ ] **Step 5.7 : Smoke test web** (procédure standard)

- [ ] **Step 5.8 : Smoke test iOS** (procédure standard)

- [ ] **Step 5.9 : Commit + tag v7**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add -A
git commit -m "$(cat <<'EOF'
chore(capacitor): migrate to v7

- @capacitor/* ^7.0.0 (latest stable, Xcode 16 compatible)
- iOS deployment target 15 → 15.6
- npx cap migrate appliqué

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git tag capacitor-v7-ok
```

---

## Task 6 : Privacy Manifest Apple

**But :** Ajouter `PrivacyInfo.xcprivacy` requis par App Store depuis 2024.

**Files:**
- Create : `ios/App/App/PrivacyInfo.xcprivacy`
- Modify : `ios/App/App.xcodeproj/project.pbxproj` (ajouter le fichier au target App, fait par Xcode)

- [ ] **Step 6.1 : Créer le Privacy Manifest**

Créer `ios/App/App/PrivacyInfo.xcprivacy` avec ce contenu :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <dict>
            <key>NSPrivacyCollectedDataType</key>
            <string>NSPrivacyCollectedDataTypeDeviceID</string>
            <key>NSPrivacyCollectedDataTypeLinked</key>
            <true/>
            <key>NSPrivacyCollectedDataTypeTracking</key>
            <false/>
            <key>NSPrivacyCollectedDataTypePurposes</key>
            <array>
                <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
            </array>
        </dict>
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

- [ ] **Step 6.2 : Ajouter le fichier au target Xcode**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap open ios
```

Dans Xcode : clic droit sur dossier `App` (sous `App` group, là où est `Info.plist`) → **Add Files to "App"...** → sélectionner `PrivacyInfo.xcprivacy` → cocher target `App` → Add.

- [ ] **Step 6.3 : Build Xcode pour valider intégration**

Cmd+B dans Xcode. Pas d'erreur attendue.

- [ ] **Step 6.4 : Smoke test iOS rapide**

Run app dans simulateur, login, vérifier rien cassé.

- [ ] **Step 6.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add ios/App/App/PrivacyInfo.xcprivacy ios/App/App.xcodeproj/project.pbxproj
git commit -m "$(cat <<'EOF'
feat(ios): add Privacy Manifest required by App Store

- NSPrivacyTracking: false
- DeviceID collecté (push token) — linked, non tracking, AppFunctionality
- UserDefaults déclaré (CA92.1)

Sans ce manifest, App Store Connect rejette le binaire depuis 2024.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7 : Pin Firebase + cleanup Podfile

**But :** Versionner Firebase explicitement, nettoyer le Podfile.

**Files:**
- Modify : `ios/App/Podfile`, `ios/App/Podfile.lock`

- [ ] **Step 7.1 : Éditer le Podfile**

Remplacer :
```ruby
pod 'Firebase/Messaging' # Add this line
```

Par :
```ruby
pod 'Firebase/Messaging', '~> 11.0'
```

Et ajouter en haut, juste après `use_frameworks!` :
```ruby
inhibit_all_warnings!
```

- [ ] **Step 7.2 : Pod install**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/ios/App
pod install --repo-update
```

- [ ] **Step 7.3 : Smoke iOS — vérifier push toujours OK**

Procédure "Smoke iOS" complète, en insistant sur le test de push (`POST /api/bookings/sendNotifTest`).

Si push KO : possible que le bridge APNs↔FCM doive être restauré dans `AppDelegate.swift`. Vérifier la présence de :
```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Messaging.messaging().apnsToken = deviceToken
}
```

Si absent, l'ajouter et `import FirebaseMessaging` en haut du fichier.

- [ ] **Step 7.4 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add ios/App/Podfile ios/App/Podfile.lock ios/App/App/AppDelegate.swift
git commit -m "$(cat <<'EOF'
chore(ios): pin Firebase/Messaging ~> 11.0 + inhibit_all_warnings

Pin pour reproductibilité du build et compat Xcode 16.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8 : StatusBar plugin + safe-areas iOS

**But :** Installer `@capacitor/status-bar`, configurer `viewport-fit=cover`, gérer safe-areas.

**Files:**
- Modify : `package.json`, `package-lock.json`, `public/index.html`, `src/components/App/App.js`, `src/components/styles/app.css`

- [ ] **Step 8.1 : Installer le plugin StatusBar**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm install @capacitor/status-bar@^7.0.0
npx cap sync ios
```

- [ ] **Step 8.2 : Modifier `public/index.html`**

Remplacer :
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />
```

Par :
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#2B2B29" />
```

- [ ] **Step 8.3 : Initialiser StatusBar au boot dans `src/components/App/App.js`**

Ajouter dans la zone des imports Capacitor (ligne ~24, après `import { Capacitor }`) :

```js
import { StatusBar, Style } from "@capacitor/status-bar";
```

Ajouter un `useEffect` dédié (juste après le useEffect des push notifications, ligne ~109) :

```js
useEffect(() => {
  if (Capacitor.isNativePlatform()) {
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    StatusBar.setBackgroundColor({ color: "#2B2B29" }).catch(() => {});
    // setBackgroundColor est no-op sur iOS mais utile pour Android
  }
}, []);
```

- [ ] **Step 8.4 : Étendre `src/components/styles/app.css` avec les safe-areas**

Remplacer le contenu existant :
```css
.app {
    background: #2B2B29;
}
```

Par :
```css
.app {
    background: #2B2B29;
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    box-sizing: border-box;
}
```

- [ ] **Step 8.5 : Build et sync**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npm run build
npx cap sync ios
```

- [ ] **Step 8.6 : Smoke iOS**

Lancer dans simulateur iPhone 16 Pro (a un Dynamic Island, donc test du notch). Vérifier :
- Le contenu ne passe plus sous l'island.
- La status bar a un texte clair (style Dark) sur fond sombre.
- En bas, le bouton home indicator a un padding.

- [ ] **Step 8.7 : Smoke web**

`npm start` → vérifier que rien n'est cassé en navigateur (les `env(safe-area-inset-*)` valent 0 hors iOS, donc transparent).

- [ ] **Step 8.8 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add package.json package-lock.json public/index.html src/components/App/App.js src/components/styles/app.css ios/App/Podfile ios/App/Podfile.lock
git commit -m "$(cat <<'EOF'
feat(ios): StatusBar plugin + safe-areas (notch + home indicator)

- @capacitor/status-bar installé, style Dark + bg #2B2B29
- viewport-fit=cover dans index.html
- env(safe-area-inset-*) sur .app shell

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9 : Polish Login

**But :** Centrer verticalement, aérer les champs, soigner le bouton primaire et l'état d'erreur.

**Files:**
- Modify : `src/pages/Login/index.js`, `src/components/Forms/LoginForm/index.js`
- Create : `src/pages/Login/login.css`

- [ ] **Step 9.1 : Créer `src/pages/Login/login.css`**

```css
.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px); /* compense TopAppBar + Copyright */
  padding: 24px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", sans-serif;
}

.login-screen .login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px 24px;
}

.login-screen h1 {
  color: #fff;
  font-size: 1.6em;
  font-weight: 500;
  text-align: center;
  margin: 0 0 24px;
  letter-spacing: 0.5px;
}

.login-screen .ui.form .field {
  margin-bottom: 20px;
}

.login-screen .ui.form label {
  color: #ddd !important;
  font-size: 0.95em !important;
  font-weight: 500 !important;
  margin-bottom: 8px !important;
}

.login-screen .ui.form input {
  background: #1f1f1e !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 8px !important;
  padding: 12px 14px !important;
  font-size: 1em !important;
}

.login-screen .ui.form input:focus {
  border-color: #4a90e2 !important;
  background: #262625 !important;
}

.login-screen .ui.form .field.error input {
  background: #2a1f1f !important;
  border-color: #d9534f !important;
}
```

- [ ] **Step 9.2 : Modifier `src/pages/Login/index.js`**

Remplacer :
```js
return (
  <div className="home">
    <LoginForm
```

Par :
```js
return (
  <div className="login-screen">
    <div className="login-card">
      <h1>Connexion administrateur</h1>
      <LoginForm
```

Et fermer la `</div>` supplémentaire avant `</div>`.

Ajouter en tête de fichier (ligne ~5) :
```js
import "./login.css";
```

Le fichier final :

```js
import React from "react";
import { useState } from "react";
import CallAxios from "../../database/index";
import { tokenName } from "../../_const";
import LoginForm from "../../components/Forms/LoginForm";
import "./login.css";

const Login = ({ setUser, setMessage }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await CallAxios.auth(credentials);
    if (response && response.data.status === 200) {
      const { role, message, token } = response.data;
      setMessage({
        success: true,
        message: message,
      });
      setLoading(false);
      localStorage.setItem(`token-${tokenName}`, token);
      setUser(role);
    } else {
      setLoading(false);
      setMessage({
        success: false,
        message: "Identifiants incorrects",
      });
    }
  };
  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>Connexion administrateur</h1>
        <LoginForm
          handleSubmitForm={handleSubmitForm}
          credentials={credentials}
          setCredentials={setCredentials}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Login;
```

- [ ] **Step 9.3 : Smoke web**

`npm start` → `/login` → vérifier centrage, card lisible, focus sur input bleu, erreur (champ vide) en rouge sombre, bouton "Connexion" toujours fonctionnel.

- [ ] **Step 9.4 : Smoke iOS**

`npm run build && npx cap sync ios` → simulateur → idem.

- [ ] **Step 9.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add src/pages/Login/index.js src/pages/Login/login.css
git commit -m "$(cat <<'EOF'
feat(login): polish — card centrée, inputs sombres, focus bleu

Aligne sur le vocabulaire visuel Baravin1755 (#2B2B29, font système).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10 : Polish Home (vue admin liste résas)

**But :** Aérer le conteneur, hiérarchie typo, espacement constant. (Le composant `BookingItem` n'est pas dans `Home` mais dans `Bookings` — ici on polish le shell de Home et son texte de désactivation.)

**Files:**
- Modify : `src/pages/styles/home.css` (existe déjà), `src/pages/Home/index.js` (uniquement classe sur le Header)

- [ ] **Step 10.1 : Lire le contenu actuel de home.css**

```bash
cat /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/src/pages/styles/home.css
```

Noter ce qui existe pour le préserver. Ne pas écraser à l'aveugle.

- [ ] **Step 10.2 : Étendre `src/pages/styles/home.css`**

Ajouter en bas (ne pas remplacer ce qui est déjà là) :

```css
/* Polish 2026-05 — vocabulaire visuel Baravin1755 */
.home {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", sans-serif;
  padding: 16px 16px 32px;
  color: #f3f3f1;
}

.home .homeheader {
  color: #f3f3f1 !important;
  font-weight: 400 !important;
  letter-spacing: 0.3px;
  margin: 24px auto !important;
  max-width: 480px;
  text-align: center;
  line-height: 1.4;
}

.home .ui.form {
  max-width: 480px;
  margin: 0 auto;
}
```

- [ ] **Step 10.3 : Smoke web**

`npm start` → `/` (sans login pour voir l'écran public, et avec login admin pour voir le BookingSwitch). Vérifier :
- Padding cohérent.
- Texte clair lisible sur fond sombre.
- Form max-width pour ne pas s'étaler en desktop.

- [ ] **Step 10.4 : Smoke iOS**

`npm run build && npx cap sync ios` → simulateur.

- [ ] **Step 10.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add src/pages/styles/home.css
git commit -m "$(cat <<'EOF'
feat(home): polish — padding, typo claire, max-width form

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11 : Polish AddBooking-form

**But :** Labels au-dessus respirants, inputs sombres cohérents, bouton sticky en bas pour iOS.

**Files:**
- Modify : `src/components/Forms/AddBooking-form/index.js`
- Create : `src/components/Forms/AddBooking-form/addbookingform.css`

- [ ] **Step 11.1 : Créer le CSS du form**

Créer `src/components/Forms/AddBooking-form/addbookingform.css` :

```css
.add-booking-form .ui.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.add-booking-form .ui.form .field {
  margin: 0 !important;
}

.add-booking-form .ui.form label {
  color: #ddd !important;
  font-size: 0.95em !important;
  font-weight: 500 !important;
  margin-bottom: 6px !important;
}

.add-booking-form .ui.form input,
.add-booking-form .ui.form .ui.input input {
  background: #1f1f1e !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 8px !important;
  padding: 12px 14px !important;
  font-size: 1em !important;
}

.add-booking-form .ui.form input:focus,
.add-booking-form .ui.form .ui.input input:focus {
  border-color: #4a90e2 !important;
  background: #262625 !important;
}

.add-booking-form .field.error input {
  background: #2a1f1f !important;
  border-color: #d9534f !important;
}

.add-booking-form .submit-row {
  position: sticky;
  bottom: env(safe-area-inset-bottom, 0);
  background: linear-gradient(to bottom, transparent, #2b2b29 30%);
  padding: 16px 0 8px;
  margin-top: 8px;
}

.add-booking-form .submit-row .ui.button {
  width: 100%;
  font-size: 1.1em !important;
}

.add-booking-form .time-hint {
  display: block;
  color: #f3f3f1;
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  margin: 4px 0 6px;
}
```

- [ ] **Step 11.2 : Modifier `src/components/Forms/AddBooking-form/index.js`**

Le fichier complet remplacé :

```js
import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { getFieldValue } from "../../../utils";
import "./addbookingform.css";

const AddBookingForm = ({ handleSubmit, booking, setBooking, loading }) => {
  return (
    <div className="add-booking-form">
      <Form onSubmit={handleSubmit}>
        <Form.Field required error={!booking.bookerName}>
          <label htmlFor="bookerName">Votre nom</label>
          <input
            id="bookerName"
            name="bookerName"
            value={booking.bookerName}
            autoComplete="name"
            placeholder="Votre nom et prénom"
            type="text"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerEmail}>
          <label htmlFor="bookerEmail">Votre email</label>
          <input
            id="bookerEmail"
            name="bookerEmail"
            value={booking.bookerEmail}
            autoComplete="email"
            type="email"
            placeholder="toto@toto.fr"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerPhoneNumber}>
          <label htmlFor="bookerPhoneNumber">Numéro de téléphone</label>
          <input
            id="bookerPhoneNumber"
            name="bookerPhoneNumber"
            value={booking.bookerPhoneNumber}
            autoComplete="tel"
            type="text"
            placeholder="06 ... ... ..."
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerNumber}>
          <label htmlFor="bookerNumber">Nombre de personnes</label>
          <input
            id="bookerNumber"
            name="bookerNumber"
            value={booking.bookerNumber}
            min={1}
            step={1}
            placeholder="5"
            type="number"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookingDate}>
          <label htmlFor="bookingDate">Date de la réservation</label>
          <Input
            id="bookingDate"
            name="bookingDate"
            value={booking.bookingDate}
            type="date"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookingTime}>
          <label htmlFor="bookingTime">Heure de la réservation</label>
          <span className="time-hint">Minimum 18h00</span>
          <Input
            id="bookingTime"
            name="bookingTime"
            value={booking.bookingTime}
            min="0"
            type="time"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <div className="submit-row">
          <Button
            circular
            size="massive"
            loading={loading}
            disabled={
              loading ||
              !booking.bookerName ||
              !booking.bookerNumber ||
              !booking.bookerEmail ||
              !booking.bookingDate ||
              !booking.bookerPhoneNumber ||
              !booking.bookingTime
            }
            color="blue"
            type="submit"
            content="Je réserve !"
          />
        </div>
      </Form>
    </div>
  );
};

export default AddBookingForm;
```

Note : on a retiré le style inline sur le span (remplacé par classe `.time-hint`), supprimé les `placeholder` redondants vis-à-vis des labels, et déplacé le bouton dans un wrapper sticky.

- [ ] **Step 11.3 : Smoke web**

`npm start` → `/` → ouvrir le form (résas activées) → vérifier :
- Espacement entre champs constant.
- Inputs sombres, focus bleu.
- Bouton "Je réserve !" reste visible en scroll (sticky).
- Submit OK → push reçue côté admin (si on est admin connecté).

- [ ] **Step 11.4 : Smoke iOS**

`npm run build && npx cap sync ios` → simulateur. Tester avec clavier ouvert : le bouton sticky doit rester visible.

- [ ] **Step 11.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add src/components/Forms/AddBooking-form/index.js src/components/Forms/AddBooking-form/addbookingform.css
git commit -m "$(cat <<'EOF'
feat(booking-form): polish — inputs sombres, bouton sticky, gap constant

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12 : Polish TopAppBar

**But :** Safe-area top, alignement icônes, espacement, taille des icônes plus discrète sur mobile.

**Files:**
- Modify : `src/components/styles/topappbar.css`

- [ ] **Step 12.1 : Lire le CSS actuel**

```bash
cat /Users/pierrefrancoispaoletti/appdevelopment/1755-resas/src/components/styles/topappbar.css
```

Capturer le contenu existant pour partir d'une base.

- [ ] **Step 12.2 : Réécrire `src/components/styles/topappbar.css`**

```css
.topappbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin: 0 0 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #2b2b29;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topappbar-image img {
  height: 44px;
  width: auto;
  display: block;
}

.topappbar-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.topappbar-icons .ui.button.basic {
  box-shadow: none !important;
  background: transparent !important;
}

.topappbar-icons .ui.button svg {
  font-size: 1.6em !important;
}
```

(Le padding-top safe-area est déjà géré sur `.app` via Task 8 — pas besoin de redoubler ici.)

- [ ] **Step 12.3 : Smoke web**

`npm start` → vérifier que la TopAppBar reste sticky en scroll, que le logo a une taille raisonnable, que les boutons icônes ne sont plus des cercles 3x oversize.

- [ ] **Step 12.4 : Smoke iOS**

`npm run build && npx cap sync ios` → simulateur iPhone 16 Pro. Vérifier que la barre est sous l'island (grâce au safe-area-inset-top sur `.app`), pas masquée.

- [ ] **Step 12.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add src/components/styles/topappbar.css
git commit -m "$(cat <<'EOF'
feat(topappbar): polish — sticky, icônes discrètes, alignement aéré

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13 : Bump bundle version + build final

**But :** Préparer une nouvelle TestFlight.

**Files:**
- Modify : `ios/App/App.xcodeproj/project.pbxproj` (via Xcode UI : Marketing Version + Build Number), `package.json` (version)

- [ ] **Step 13.1 : Bump version dans `package.json`**

Éditer `package.json`, remplacer :
```json
"version": "0.1.0",
```

Par :
```json
"version": "1.1.0",
```

- [ ] **Step 13.2 : Bump version iOS via Xcode**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
npx cap open ios
```

Dans Xcode : sélectionner target `App` → onglet `General` → section `Identity` :
- **Version** (CFBundleShortVersionString) : passer à `1.1.0`.
- **Build** (CFBundleVersion) : incrémenter (ex. `1` → `2`, ou la valeur courante + 1).

- [ ] **Step 13.3 : Build Xcode propre**

Cmd+Shift+K (Clean Build Folder) puis Cmd+B (Build). Pas d'erreur attendue.

- [ ] **Step 13.4 : Smoke iOS final**

Run dans simulateur. Vérifier la version affichée si l'app l'expose, sinon valider via Xcode `About` du target.

- [ ] **Step 13.5 : Commit**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/1755-resas
git add package.json ios/App/App.xcodeproj/project.pbxproj
git commit -m "$(cat <<'EOF'
chore(release): bump to 1.1.0

Migration Capacitor 3→7 + Privacy Manifest + polish UI.
Prêt pour archive TestFlight (utilisateur prend la main).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 13.6 : Notifier l'utilisateur**

Message à l'utilisateur :
> Sprint terminé. Tags posés : `capacitor-v4-ok`, `capacitor-v5-ok`, `capacitor-v6-ok`, `capacitor-v7-ok`.
>
> Pour livrer TestFlight : Xcode → Product → Archive → Distribute App → App Store Connect.
>
> Pour le web : `npm run deploy`.
>
> Côté Android : les fichiers Gradle ont été touchés par les `cap migrate`, à valider sur ton PC Windows avant build.

---

## Task 14 : Mise à jour mémoires (post-sprint)

**But :** Conformément aux préférences globales (`feedback_update_memory_after_feature.md`), mettre à jour la mémoire projet.

**Files:**
- Update : `~/.claude/projects/-Users-pierrefrancoispaoletti-appdevelopment-1755-front/memory/MEMORY.md` et fichiers liés

- [ ] **Step 14.1 : Créer un nouveau fichier mémoire projet**

Créer `~/.claude/projects/-Users-pierrefrancoispaoletti-appdevelopment-1755-front/memory/project_resas_capacitor7_2026-05.md` :

```markdown
---
name: 1755-resas migré Capacitor 7 (mai 2026)
description: App admin résas passée de Capacitor 3 à 7 + Privacy Manifest + polish UI sur branche ios-version
type: project
---

Sprint 2026-05-05 sur `1755-resas` (branche `ios-version`) :

- Migration Capacitor 3 → 4 → 5 → 6 → 7 en 4 paliers commités séparément, tags locaux `capacitor-vN-ok`.
- iOS deployment target 12 → 15.6.
- Privacy Manifest ajouté (`ios/App/App/PrivacyInfo.xcprivacy`) — requis App Store depuis 2024.
- Firebase/Messaging pinné `~> 11.0`.
- Plugin `@capacitor/status-bar` installé, style Dark, bg `#2B2B29`.
- Safe-areas iOS gérées via `viewport-fit=cover` + `env(safe-area-inset-*)` sur `.app`.
- Polish UI sur Login (card centrée), Home (padding+typo), AddBooking-form (inputs sombres, bouton sticky), TopAppBar (sticky, icônes discrètes).
- App reste **autonome** vis-à-vis de `1755-front` (vocabulaire visuel copié, pas de dépendance).
- Back-end `1755-back` non touché — endpoints `bookings/registrationToken`, `auth`, `bookings/*` inchangés.

**Why:** Apple exige Xcode 16 + Privacy Manifest pour toute soumission App Store en 2026 ; l'ancienne version Capacitor 3 ne compilait plus.

**How to apply:** Pour toute future modif iOS de cette app, partir de Capacitor 7. Build Android toujours sur PC Windows. Push notifications dépendent du bridge APNs↔FCM dans `AppDelegate.swift` — vérifier sa présence avant tout autre upgrade.
```

- [ ] **Step 14.2 : Ajouter l'entrée dans MEMORY.md**

Ajouter cette ligne dans `~/.claude/projects/-Users-pierrefrancoispaoletti-appdevelopment-1755-front/memory/MEMORY.md` (proche des autres entrées project) :

```
- [1755-resas migré Capacitor 7 (mai 2026)](project_resas_capacitor7_2026-05.md) — Cap 3→7, Privacy Manifest, polish UI, branche ios-version
```

- [ ] **Step 14.3 : Notifier l'utilisateur des fichiers mémoire touchés**

> Mémoire mise à jour : `project_resas_capacitor7_2026-05.md` (nouveau) + entrée dans `MEMORY.md`.

---

## Self-review du plan

**Couverture spec :**
- Section 1 (4 paliers) → Tasks 2-5 ✅
- Section 2 (Pods, Privacy Manifest, Firebase pin, capabilities, APNs key, bundle version) → Tasks 6, 7, 13 ✅
- Section 3 (Android préparation) → couvert par les `cap migrate` dans Tasks 3-5, validation explicite côté PC laissée à l'utilisateur (Step 13.6) ✅
- Section 4 (Polish UI : viewport, safe-areas, StatusBar, Login, Home, AddBooking, TopAppBar) → Tasks 8-12 ✅
- Section 5 (validation à chaque palier) → procédures standard référencées dans chaque smoke step ✅
- Section 6 (ordre d'exécution) → respecté ✅

**Pas de placeholders** — chaque step a son code exact ou commande exacte.

**Cohérence :** noms de fichiers stables (`addbookingform.css`, `login.css`), classes CSS cohérentes (`.add-booking-form`, `.login-screen`).

**Stop conditions** rappelées en haut, applicables à toutes les tasks de migration.

**Pas de TDD** — explicité au début, conforme à CLAUDE.md du projet.
