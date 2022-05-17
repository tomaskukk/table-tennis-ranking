/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

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
  text-shadow: 
   // 1px 0px 4px ${(props) => props.text_color}, 
   // -1px 0px 4px ${(props) => props.text_color}, 
   // 0px 0px 2px ${(props) => props.text_color},
   2px 0px 2px ${(props) => props.shadow_color}, -2px 0px 2px ${(props) => props.shadow_color},
   2px 3px 15px ${(props) => props.shadow_color}, 2px 0px 15px ${(props) => props.shadow_color},
   5px 0px 80px ${(props) => props.shadow_color}, 10px 0vw 20px ${(props) => props.shadow_color},
   4px 0vw 200px ${(props) => props.shadow_color};
`;

export const Ranking: FC<{ players: any[] }> = ({ players }) => {
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
