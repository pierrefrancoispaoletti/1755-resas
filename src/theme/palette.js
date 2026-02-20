// Palette de couleurs pour l'application 1755 RESA
// Design : Glassmorphism + Dark Mode profond + Accents or

const palette = {
  // Mode sombre par défaut
  mode: 'dark',

  // Couleur primaire - rouge bordeaux restaurant
  primary: {
    main: '#8B0000', // darkred
    light: '#B22222', // firebrick
    dark: '#5C0000',
    contrastText: '#FFFFFF',
  },

  // Couleur secondaire - or/gold pour accents
  secondary: {
    main: '#DAA520', // goldenrod
    light: '#FFD700', // gold
    dark: '#B8860B', // darkgoldenrod
    contrastText: '#000000',
  },

  // États de succès
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },

  // États d'erreur
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
    contrastText: '#FFFFFF',
  },

  // Avertissements
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000',
  },

  // Information
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },

  // Arrière-plans glass profond
  background: {
    default: '#0f0a0a',
    paper: 'rgba(255, 255, 255, 0.06)',
    elevated: 'rgba(255, 255, 255, 0.10)',
  },

  // Texte
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },

  // Dividers et bordures
  divider: 'rgba(255, 255, 255, 0.10)',

  // Action states
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },

  // Tokens glass (extension custom)
  glass: {
    surface: 'rgba(255, 255, 255, 0.06)',
    surfaceHover: 'rgba(255, 255, 255, 0.10)',
    border: 'rgba(255, 255, 255, 0.10)',
    borderGold: 'rgba(218, 165, 32, 0.25)',
    glow: 'rgba(218, 165, 32, 0.15)',
    glowStrong: 'rgba(218, 165, 32, 0.30)',
  },
};

// Palette pour le mode clair (optionnel, pour futur toggle dark/light)
export const lightPalette = {
  mode: 'light',
  primary: {
    main: '#8B0000',
    light: '#B22222',
    dark: '#5C0000',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#DAA520',
    light: '#FFD700',
    dark: '#B8860B',
    contrastText: '#000000',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
    elevated: '#FAFAFA',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

export default palette;
