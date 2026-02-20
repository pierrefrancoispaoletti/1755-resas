// Configuration de la typographie pour MUI
// Conserve les polices du restaurant: Dancing Script et Josefin Sans

const typography = {
  // Police système par défaut
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  // Police pour les headers - Dancing Script (élégant, restaurant)
  fontFamilyHeading: [
    '"Dancing Script"',
    'cursive',
  ].join(','),

  // Police pour les sous-titres - Josefin Sans
  fontFamilySubtitle: [
    '"Josefin Sans"',
    'sans-serif',
  ].join(','),

  // Échelle de tailles responsive
  fontSize: 14, // base

  // Poids de police
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Headings
  h1: {
    fontFamily: '"Dancing Script", cursive',
    fontSize: '2.5rem', // 40px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: '"Dancing Script", cursive',
    fontSize: '2rem', // 32px
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: '"Dancing Script", cursive',
    fontSize: '1.75rem', // 28px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.05em',
  },
  h5: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.06em',
  },
  h6: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '1rem', // 16px
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: '0.08em',
  },

  // Body text
  body1: {
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem', // 14px
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },

  // Boutons
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none', // Pas de uppercase automatique (plus moderne)
  },

  // Caption et overline
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 2.66,
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
  },

  // Subtitle
  subtitle1: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
};

export default typography;
