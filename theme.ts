import { roboto } from '@theme-ui/presets';

const theme = {
  ...roboto,
  containers: {
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      mt: '1rem',
      mb: '1rem',
      borderBottom: '1px solid gray',
      p: '1rem',
    },
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '4px',
      p: 2,
    },
    page: {
      width: '100%',
      height: '100vh',
    },
    content: {
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'center',
    },
  },
  button: {
    border: 'none',
    padding: '0.5rem',
    borderRadius: '5px',
    display: 'inline-flex',
    cursor: 'pointer',
  },
  styles: {
    ...roboto.styles,
  },
};

export type ThemeColors = keyof typeof theme.colors;

export default theme;
