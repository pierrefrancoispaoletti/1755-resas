// Design Tokens - 1755 RESA
// Référence centralisée pour tous les tokens de design
// À utiliser dans les composants pour une cohérence maximale

export const colors = {
  // Identité du restaurant
  brand: {
    darkred: '#8B0000',
    firebrick: '#B22222',
    gold: '#DAA520',
    lightGold: '#FFD700',
  },

  // Palette principale
  primary: {
    main: '#8B0000',
    light: '#B22222',
    dark: '#5C0000',
  },
  secondary: {
    main: '#DAA520',
    light: '#FFD700',
    dark: '#B8860B',
  },

  // États
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Arrière-plans (dark mode)
  background: {
    default: '#2B2B29',
    paper: '#353533',
    elevated: '#3D3D3B',
  },

  // Texte
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },

  // Utilitaires
  white: '#FFFFFF',
  black: '#000000',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

export const spacing = {
  // Échelle basée sur 8px
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  xxl: 48,  // 48px
  xxxl: 64, // 64px

  // Spacing pour composants spécifiques
  button: {
    padding: '10px 24px',
    paddingLarge: '14px 32px',
  },
  card: {
    padding: 16,
    paddingLarge: 24,
  },
  form: {
    fieldSpacing: 16,
    groupSpacing: 24,
  },
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  round: 50, // Boutons ronds
  circle: '50%', // Cercle parfait
};

export const shadows = {
  none: 'none',
  small: '0 2px 8px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
  large: '0 6px 20px rgba(0, 0, 0, 0.15)',
  hover: '0 8px 24px rgba(0, 0, 0, 0.2)',
};

export const typography = {
  // Font families
  fontFamily: {
    default: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '"Dancing Script", cursive',
    subtitle: '"Josefin Sans", sans-serif',
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.75rem', // 28px
    '4xl': '2rem',    // 32px
    '5xl': '2.5rem',  // 40px
  },

  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// Export d'un objet contenant tous les tokens
const tokens = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
  transitions,
  zIndex,
};

export default tokens;
