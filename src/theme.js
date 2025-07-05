import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // The star of the show: enable dark mode
    primary: {
      main: '#665DDE', // A modern, vibrant purple
    },
    secondary: {
      main: '#00C896', // A complementary teal/green
    },
    background: {
      default: '#121212', // A deep, dark background
      paper: '#1E1E1E',   // The color for cards, menus, etc.
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
        fontWeight: 500,
    }
  },

  components: {
    // Override default styles for specific components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No more ALL CAPS buttons
          borderRadius: '8px',
          // Add micro-interaction
          transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none', // Remove gradients from paper-based components
            }
        }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid #333', // Subtle border for depth
        },
      },
    },
  },
});

export default theme;