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
      borderRadius: 8,
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
      // CssBaseline - gradient radial profond sur body
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: 'radial-gradient(ellipse at top left, #2a0808 0%, #0f0a0a 45%, #0f0d00 100%)',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
          },
        },
      },

      // AppBar - sticky glass + trait or
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(15, 10, 10, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(218, 165, 32, 0.20)',
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.40)',
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
            transition: 'all 0.25s',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #8B6914 0%, #DAA520 50%, #C8941A 100%)',
            color: '#000000',
            '&:hover': {
              background: 'linear-gradient(135deg, #9B7924 0%, #EAB530 50%, #D8A42A 100%)',
              boxShadow: '0 4px 20px rgba(218, 165, 32, 0.40)',
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          containedError: {
            background: 'linear-gradient(135deg, #5C0000 0%, #8B0000 50%, #B22222 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(135deg, #6C0000 0%, #9B1010 50%, #C23232 100%)',
              boxShadow: '0 4px 20px rgba(139, 0, 0, 0.40)',
              transform: 'translateY(-1px)',
            },
          },
          containedSuccess: {
            background: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 50%, #4CAF50 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(135deg, #2B6E30 0%, #489E4C 50%, #5CBF60 100%)',
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.40)',
              transform: 'translateY(-1px)',
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
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },

      // TextField - glass + bordure or au focus
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 8,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.15)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(218, 165, 32, 0.40)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#DAA520',
                borderWidth: 2,
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(218, 165, 32, 0.15)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#DAA520',
            },
          },
        },
        defaultProps: {
          variant: 'outlined',
        },
      },

      // Card - glass
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: 12,
            backgroundImage: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              border: '1px solid rgba(218, 165, 32, 0.30)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.40)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },

      // Paper - glass
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: 8,
          },
          elevation1: {
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.30)',
          },
          elevation2: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.40)',
          },
          elevation3: {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.50)',
          },
        },
      },

      // Chip - glass
      MuiChip: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },

      // Tooltip - glass dark + gold border
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'rgba(15, 10, 10, 0.90)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(218, 165, 32, 0.25)',
            color: '#FFFFFF',
            fontSize: '0.875rem',
          },
          arrow: {
            color: 'rgba(15, 10, 10, 0.90)',
          },
        },
      },

      // Snackbar
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

      // Alert - gradients
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
          filledSuccess: {
            background: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 100%)',
          },
          filledError: {
            background: 'linear-gradient(135deg, #5C0000 0%, #8B0000 100%)',
          },
          standardInfo: {
            backgroundColor: 'rgba(33, 150, 243, 0.10)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(33, 150, 243, 0.20)',
          },
        },
      },

      // Focus visible (accessibilité)
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: themePalette.secondary.main,
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

      // Divider - légèrement doré
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(255, 255, 255, 0.10)',
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
