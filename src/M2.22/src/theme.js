import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
      light: '#9D97FF',
      dark: '#4B44CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6584',
      light: '#FF92A8',
      dark: '#CC3F60',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F6FB',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5A5A7A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(108,99,255,0.08)',
    '0px 4px 16px rgba(108,99,255,0.12)',
    '0px 8px 24px rgba(108,99,255,0.16)',
    '0px 12px 32px rgba(108,99,255,0.20)',
    ...Array(20).fill('0px 16px 40px rgba(108,99,255,0.24)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0px 4px 16px rgba(108,99,255,0.30)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(108,99,255,0.10)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 12px rgba(108,99,255,0.12)',
        },
      },
    },
  },
});

export default theme;
