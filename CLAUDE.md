# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based reservation (booking) management system for "1755 RESA" (Restaurant Baravin 1755). It's a hybrid mobile/web application built with Create React App and Capacitor, allowing both web deployment and native mobile apps (iOS/Android).

**App ID**: `com.baravin1755`
**Backend**: Heroku-hosted API at `https://le-1755.herokuapp.com`

## Development Commands

### Web Development
```bash
# Start development server
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

Global state is managed via Context API (no external state library). Page-level state uses `useState`.

**Context files in `src/context/`:**

- **`AppContext.js`** → `AppProvider` + `useApp()` hook
  - Owns: `user`, `setUser`, `message`, `setMessage`, `pushNotificationToken`, `setPushNotificationToken`
  - Effects: auto-clear message after 3s, auto-reconnect on mount (JWT validation), Capacitor push notification registration
- **`ConfigContext.js`** → `ConfigProvider` + `useConfig()` hook
  - Owns: `config` (fetched via React Query), `loading`, `setConfig`
  - Uses `useQuery(['config'])` from React Query for `getConfig()` API call
  - `setConfig(newConfig)` updates the React Query cache via `queryClient.setQueryData`
- **`QueryProvider.js`** → wraps `QueryClientProvider` with a pre-configured `QueryClient`

**Provider nesting order in `src/index.js`:**
```
QueryProvider → ThemeProvider → AppProvider → ConfigProvider → Router → App
```

**Page-level state:**
- `bookings` - List of all bookings (local to Bookings page)
- Form state - Local to each page (Home, Login)

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

- Registration happens on app load in `AppContext.js` (only on native platforms)
- Token saved to `pushNotificationToken` state in AppContext
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

- Uses HashRouter instead of BrowserRouter for mobile compatibility
- Server URL can be toggled between production (Heroku) and localhost in `src/_const/index.js`
- French language throughout the UI
- **UI Library**: Material-UI (MUI) v7.3.5 - migrated from Semantic UI React (November 2025)
- **Styling**: Emotion CSS-in-JS via `sx` prop
- **Forms**: React Hook Form with Yup validation schemas
- Android build configuration in `android/app/build.gradle`
- iOS configuration in `ios/App/`

## UI/UX Modernization (November 2025)

### Completed Work

#### Phase 1: Foundation & Dependencies (✅ COMPLETED)

**Upgraded Core Dependencies:**
- React 17.0.2 → 18.3.1 (required for React Query v5 and modern features)
- react-dom 17.0.2 → 18.3.1
- react-scripts 4.0.3 → 5.0.1 (enables modern JS syntax, removes need for `--openssl-legacy-provider`)

**Installed New Dependencies:**
- `@mui/material` v7.3.5 - Material-UI component library
- `@mui/icons-material` v7.3.5 - Material Design icons
- `@emotion/react` v11.14.0 - CSS-in-JS styling engine
- `@emotion/styled` v11.14.0 - Styled components API
- `react-hook-form` v7.54.2 - Performant form library
- `@hookform/resolvers` v3.9.1 - Validation resolver integration
- `yup` v1.4.0 - Schema validation library
- `@tanstack/react-query` v5.62.12 - Server state management (implemented for config)

**Created Design System:**
- `src/theme/palette.js` - Complete color palette (dark mode primary, preserves restaurant's darkred/gold brand)
- `src/theme/typography.js` - Responsive typography scale (preserves Dancing Script & Josefin Sans fonts)
- `src/theme/tokens.js` - Centralized design tokens (colors, spacing, shadows, borders)
- `src/theme/index.js` - Main theme configuration with component overrides and responsive font sizes
- Updated `src/index.js` - Integrated ThemeProvider, CssBaseline, and migrated to React 18 createRoot API

#### Phase 2: Component Migration to MUI (✅ COMPLETED - 13/13 components)

All components successfully migrated from Semantic UI to Material-UI with modern patterns:

**Navigation & Layout:**
- `TopAppBar` → MUI AppBar with Toolbar, Tooltips, IconButtons, ARIA labels
- `Copyright` → MUI Box/Stack with semantic `<footer>` tag, heartbeat animation on heart icon

**Notifications & Feedback:**
- `Toast` → MUI Snackbar with Alert component, Slide transition
- `HomeMadeLoader` → MUI CircularProgress with pulse animation
- `NoBookings` → MUI Paper with EventBusy icon, empty state messaging

**Headers & Status:**
- `HomeHeader` → MUI Paper with gradient backgrounds, dynamic icons, ARIA live regions
- `BookingSwitch` → MUI Switch in Paper wrapper, CheckCircle/Cancel icons

**Forms:**
- `AddBooking-form` → React Hook Form + Yup validation, MUI TextFields with InputAdornments
  - Phone number formatting (06 12 34 56 78)
  - Future date validation
  - Time restrictions (after 18:00)
  - Guest count limits (1-20)
  - Real-time validation feedback
- `LoginForm` → React Hook Form + Yup, password visibility toggle, Paper card with lock icon

**Booking Management:**
- `FilterButtons` → MUI Chips with icons, counts, active/inactive states, hover animations
  - 4 filters: Jours Précédents (error), Aujourd'hui (success), Demain (secondary), Jours Suivants (warning)
- `BookingItem` → MUI Card with Chip status indicator, border-left color coding, contact IconButtons
  - Status chips: "New !" (animated pulse), "Acceptée" (success), "Refusée" (error)
  - Phone/Email IconButtons with hover effects
  - Responsive layout with Stack and Box
- `BookingControls` → MUI IconButtons with Tooltips (Accept/Reject/Delete actions)
- `EmptyFormButton` → MUI Button with Refresh icon

**Key Improvements Applied:**
- ✅ **Accessibility**: ARIA labels, semantic HTML, tooltips, keyboard navigation
- ✅ **Responsive Design**: Mobile-first with MUI breakpoints (xs, sm, md, lg, xl)
- ✅ **Performance**: React Hook Form for optimized re-renders, memoized components
- ✅ **User Experience**: Micro-interactions (hover effects, pulse animations, transitions)
- ✅ **Design Consistency**: Centralized theme system with design tokens
- ✅ **Form Validation**: Client-side validation with clear error messages
- ✅ **Visual Feedback**: Dynamic colors, status indicators, loading states

### Remaining Work

#### Phase 3: Cleanup & Optimization (✅ COMPLETED)

**Remove Legacy Dependencies:**
- [x] Uninstalled `semantic-ui-react` and `semantic-ui-css`
- [x] Uninstalled `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/react-fontawesome` (replaced by MUI Icons)
- [x] Removed all legacy CSS files from `src/components/styles/` and `src/pages/styles/`

**State Management Modernization:**
- [x] Implemented Context API — `AppContext` (user, message, push token) + `ConfigContext` (config via React Query)
- [x] React Query `useQuery(['config'])` fetches and caches app config
- [x] `ConfigContext.setConfig()` updates React Query cache for optimistic local updates

**Performance Optimization:**
- [x] Code splitting with `React.lazy()` for Home, Login, Bookings pages
- [x] `<Suspense>` fallback with `HomeMadeLoader` in App.js
- [x] CSS bundle reduced by 96.64 kB (Semantic UI CSS removed)

#### Phase 4: Testing & QA (✅ UNIT TESTS COMPLETE)

**Unit Tests written (55 tests, 6 suites — all passing):**
- [x] `src/utils/index.test.js` — `calculateDate` (5 branches), `bookingsFilter` (5 cases), `reconnector` (4 cases), `logout`
- [x] `src/context/AppContext.test.js` — default values, setUser, setMessage, auto-clear timer (fake timers), error boundary
- [x] `src/components/Small/FilterButtons/FilterButtons.test.js` — 4 chips, counts, click handlers, active state, empty list
- [x] `src/components/Small/BookingItem/BookingItem.test.js` — status chips, links, pluralization, contact info
- [x] `src/components/Forms/LoginForm/LoginForm.test.js` — validation, password toggle, disabled states, submit
- [x] `src/components/Forms/AddBooking-form/AddBookingForm.test.js` — happy path, 3 validation errors, disabled states

**Test infrastructure:**
- `src/setupTests.js` — imports `@testing-library/jest-dom` globally
- `src/test-utils/renderWithProviders.js` — custom render wrapping QueryClient + ThemeProvider + AppProvider + MemoryRouter

**Still pending:**
- [ ] E2E testing with Playwright (booking flow, admin auth, booking management)
- [ ] Lighthouse accessibility audit (target: 95+)
- [ ] Screen reader and keyboard navigation testing

#### Phase 5: Nice-to-Have Enhancements (🔮 OPTIONAL)

- [ ] Light/Dark mode toggle (theme system already supports both)
- [ ] Enhanced animations with Framer Motion
- [ ] Skeleton loading states for async content
- [ ] Error boundary components
- [ ] PWA optimization (service worker, offline support)

### Development Patterns (MUI Migration)

When working with this codebase, follow these modern patterns:

**Styling:**
```javascript
// ✅ DO: Use sx prop for component styling
<Box sx={{ p: 2, mb: 3, backgroundColor: 'primary.main' }}>

// ❌ DON'T: Use external CSS files or inline styles
<div style={{ padding: '16px' }}>
```

**Forms:**
```javascript
// ✅ DO: Use React Hook Form + Yup validation
const schema = yup.object().shape({
  email: yup.string().required().email()
});
const { control, handleSubmit } = useForm({
  resolver: yupResolver(schema)
});

// ❌ DON'T: Use manual state management for forms
const [email, setEmail] = useState('');
```

**Icons:**
```javascript
// ✅ DO: Use MUI Icons
import { Delete as DeleteIcon } from '@mui/icons-material';

// ❌ DON'T: Use FontAwesome
import { faTrash } from '@fortawesome/free-solid-svg-icons';
```

**Theme:**
```javascript
// ✅ DO: Reference theme tokens
sx={{ color: 'primary.main', spacing: 2 }}

// ❌ DON'T: Hardcode colors/spacing
sx={{ color: '#8B0000', padding: '16px' }}
```

**Accessibility:**
```javascript
// ✅ DO: Add ARIA labels and semantic HTML
<IconButton aria-label="Supprimer la réservation">
  <DeleteIcon />
</IconButton>

// ❌ DON'T: Use generic elements without labels
<div onClick={handleDelete}>
  <DeleteIcon />
</div>
```
