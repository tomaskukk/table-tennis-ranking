/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.div`
  margin-top: -1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.25rem;
  background: rgba(7, 6, 19, 1); //radial-gradient(ellipse at top, rgba(7,6,19, 0.95) 0%, rgba(7,6,19, 1) 60%);
`;

const NavButton = styled.div`
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;
export const Nav: FC<{}> = () => (
  <StyledNav>
    <NavButton>
      <Link href="/">Home</Link>
    </NavButton>
    <NavButton>
      <Link href="/players">Players</Link>
    </NavButton>
    <NavButton>
      <Link href="/matches">Matches</Link>
    </NavButton>
  </StyledNav>
);
