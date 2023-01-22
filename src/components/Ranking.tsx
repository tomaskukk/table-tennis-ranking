/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { users } from '@prisma/client';

import { sortByElo } from '../../src/utils';

const StyledRanking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 3rem;
  font-family: 'HELLODENVERDISPLAYREGULARRg';
  text-transform: uppercase;
  width: 100%;
`;

const Players = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Player = styled.div`
  padding: 0.5rem;
  width: 100%;
`;

const Neon = styled.div<{
  text_color: string;
  shadow_color: string;
}>`
  font-size: 2rem;
  color: ${(props) => props.text_color};
  font-weight: 400;
  letter-spacing: 8px;
`;

export const Ranking: FC<{ players: users[] }> = ({ players }) => {
  const playersSortedByElo = sortByElo(players);
  return (
    <StyledRanking>
      <Players>
        {playersSortedByElo.map((p, i) => (
          <Player key={p.id}>
            <Neon text_color={i === 0 ? '#FEF095' : '#fff'} shadow_color={i === 0 ? '#FFA02D' : '#fff'}>
              {i + 1}.{p.name} {p.elo}
            </Neon>
          </Player>
        ))}
      </Players>
    </StyledRanking>
  );
};
