/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';

const StyledHeader = styled.div`
  font-family: 'HELLODENVERDISPLAYREGULARRg';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 12rem;
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, rgba(7, 6, 19, 0.95) 80%, rgba(7, 6, 19, 1) 90%),
    radial-gradient(ellipse at top, rgba(7, 6, 19, 0.9) 0%, rgba(7, 6, 19, 0.95) 99%, rgba(7, 6, 19, 1) 100%);
`;

export const Header: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
};
