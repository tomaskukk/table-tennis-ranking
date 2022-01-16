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
    },
    pageRowItem: {
      ':not(:first-of-type)': {
        ml: '2rem',
      },
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
  },
  button: {
    border: 'none',
    padding: '0.5rem',
    borderRadius: '5px',
    display: 'block',
    width: 'fit-content',
    cursor: 'pointer',
  },
  playerListItem: {
    mr: '1.5rem',
    mb: '1.5rem',
    fontSize: '20px',
    cursor: 'pointer',
    border: '2px solid gray',
    p: '0.5rem',
    borderRadius: '10px',
    ':hover': {
      background: 'highlight',
    },
  },
  input: {
    number: {
      width: '5rem',
    },
  },
  styles: {
    ...roboto.styles,
  },
};

export type ThemeColors = keyof typeof theme.colors;

export default theme;
