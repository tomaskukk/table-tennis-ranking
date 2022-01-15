/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';

import '../styles/globals.css';
import theme from '../theme';
import Nav from '../src/components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <div sx={{ variant: 'containers.page' }}>
        <div sx={{ variant: 'containers.content' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
