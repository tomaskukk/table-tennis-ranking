/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';

import theme from '../theme';
import Nav from '../src/components/Nav';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div sx={{ variant: 'containers.page' }}>
        <Nav />
        <div sx={{ variant: 'containers.content' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
