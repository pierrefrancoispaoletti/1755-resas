import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette, { lightPalette } from './palette';
import typography from './typography';

// Fonction pour créer le thème (permet de switcher dark/light)
const createAppTheme = (mode = 'dark') => {
  const themePalette = mode === 'dark' ? palette : lightPalette;

  let theme = createTheme({
    palette: themePalette,
    typography,

    // Espacement - base 8px (standard MUI)
    spacing: 8,

    // Forme - border radius
    shape: {
      borderRadius: 8, // Cohérent dans toute l'app
    },

    // Breakpoints responsive
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },

    // Composants - Overrides globaux
    components: {
      // AppBar
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },

      // Boutons
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            },
          },
          sizeLarge: {
            padding: '14px 32px',
            fontSize: '1rem',
          },
        },
        defaultProps: {
          disableElevation: false,
        },
      },

      // IconButton
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },

      // TextField
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
        defaultProps: {
          variant: 'outlined',
        },
      },

      // Card
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },

      // Paper
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          elevation2: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },

      // Chip (pour les ribbons de bookings)
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 6,
          },
        },
      },

      // Snackbar (Toast)
      MuiSnackbar: {
        styleOverrides: {
          root: {
            '& .MuiAlert-root': {
              borderRadius: 8,
              fontWeight: 500,
            },
          },
        },
      },

      // Alert
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },

      // Focus visible (accessibilité)
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false, // Garde les ripple effects
        },
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: themePalette.primary.main,
              outlineOffset: '2px',
            },
          },
        },
      },

      // FormLabel
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            marginBottom: 8,
          },
        },
      },

      // Input
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
              },
            },
          },
        },
      },
    },

    // Transitions
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },

    // Z-index
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  });

  // Rendre les font sizes responsive
  theme = responsiveFontSizes(theme);

  return theme;
};

// Export du thème par défaut (dark)
const theme = createAppTheme('dark');

export { createAppTheme };
export default theme;
