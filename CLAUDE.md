# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based reservation (booking) management system for "1755 RESA" (Restaurant Baravin 1755). It's a hybrid mobile/web application built with Create React App and Capacitor, allowing both web deployment and native mobile apps (iOS/Android).

**App ID**: `com.baravin1755`
**Backend**: Heroku-hosted API at `https://le-1755.herokuapp.com`

## Development Commands

### Web Development
```bash
# Start development server (uses --openssl-legacy-provider flag)
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

### Mobile Development (Capacitor)

The app uses Capacitor 6.x to build native mobile applications.

```bash
# Sync web build with native platforms
npx cap sync

# Open Android Studio for Android development
npx cap open android

# Open Xcode for iOS development
npx cap open ios

# Add native platforms (if needed)
npx cap add android
npx cap add ios
```

**Important**: Always run `npm run build` before `npx cap sync` to ensure the latest web build is synced to the native platforms.

## Architecture

### Application Structure

- **Entry Point**: `src/index.js` - Uses HashRouter for routing compatibility with mobile apps
- **Main Component**: `src/components/App/App.js` - Root component managing global state and routing
- **Pages**: `src/pages/` - Three main pages: Home, Login, Bookings
- **Components**: `src/components/` - Organized into Small (reusable components) and Forms
- **Database Layer**: `src/database/index.js` - CallAxios class centralizes all API calls
- **Utils**: `src/utils/index.js` - Form handling, date calculations, authentication helpers
- **Methods**: `src/methods/index.js` - Business logic for bookings operations
- **Constants**: `src/_const/index.js` - Server URL and token configuration

### State Management

The app uses React's built-in state management (useState/useEffect) without external libraries. Key global state is managed in App.js and passed down via props:

- `user` - Current user role (admin/user) - controls access to /bookings route
- `message` - Toast notifications (auto-clear after 3s)
- `config` - Application configuration from backend (includes `resaOpen` status)
- `bookings` - List of all bookings (admin only)
- `pushNotificationToken` - FCM/APNS registration token for push notifications

### Authentication Flow

1. JWT tokens stored in localStorage with key `token-resas-1755`
2. Auto-reconnection on app load via `reconnector()` utility (validates token expiration)
3. Token decoded to extract user role and expiration
4. Protected routes redirect to `/login` if not authenticated
5. Logout clears localStorage and resets user state

### API Integration

All API calls are centralized in `src/database/index.js` (CallAxios class):

- **Auth**: `auth(credentials)` - POST login
- **Bookings**: `getAllBookings(token)`, `postBooking(booking, pushToken)`, `updateBooking(update, token)`, `deleteBooking(update, token)`
- **Config**: `getConfig()`, `updateConfig(update, token)`
- **Push Notifications**: `postAdminRegistrationToken(token, registrationKey)`

All methods return response object or `false` on error.

### Push Notifications (Mobile Only)

Push notifications are handled via `@capacitor/push-notifications`:

- Registration happens on app load in App.js (only on native platforms)
- Token saved to `pushNotificationToken` state
- Admin users register their device token on Bookings page load
- Notifications cleared when viewing bookings page

### Date Handling

The `calculateDate()` utility (src/utils/index.js) calculates difference between booking date and today:

- Returns `[0, "Aujourd'hui"]` for today
- Returns `[1, "Demain"]` for tomorrow
- Returns `[-1, "Il y à X jours"]` for past dates
- Returns `[2, "Dans X jours"]` for future dates

Bookings are filtered by this calculation on the Bookings page using the `bookingsFilter()` utility.

## Capacitor Configuration

Located in `capacitor.config.json`:

- **webDir**: `build` - Points to Create React App build output
- **androidScheme**: `https` - Required for secure contexts in Android WebView
- **Plugins configured**: SplashScreen (disabled), PushNotifications (badge, sound, alert)

## Important Notes

- The app uses `--openssl-legacy-provider` flag in npm scripts due to OpenSSL compatibility with React Scripts 4.0.3
- Uses HashRouter instead of BrowserRouter for mobile compatibility
- Server URL can be toggled between production (Heroku) and localhost in `src/_const/index.js`
- French language throughout the UI
- Semantic UI React for component library
- Android build configuration in `android/app/build.gradle`
- iOS configuration in `ios/App/`
