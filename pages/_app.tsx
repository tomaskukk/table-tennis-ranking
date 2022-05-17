/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import type { AppProps } from 'next/app';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import '../src/fonts/Denver/stylesheet.css';
import theme from '../theme';
import { Nav } from '../src/components/Nav';
import { Header } from '../src/components/Header';
import Head from 'next/head';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
    background: #070613;
    min-height: 100vh;
    color: #fff;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`;

const App = styled.div`
  background-image: url('/0034-256x256.jpg');
`;

const Page = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #070613 ;
`;

const Content = styled.div`
background-color: #070613 ;
  max-width: 1440px;
  margin: 0 auto;
`;


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Montserrat"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Page>
          <Nav />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Page>
      </ThemeProvider>
    </App>
  );
}

export default MyApp;
