/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

import styled, { css, keyframes } from 'styled-components';

const PINK_COLOR_SHADOW = '#d42cca';
const PINK_COLOR = '#ffd5ff';
const CYAN_COLOR_SHADOW = '#48BCF7';
const CYAN_COLOR = '#d1eefc';

const flicker = keyframes`
	0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
      opacity: .99;
	}
	20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
	  opacity: 0.4;
	}
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getFlickerAnimation = (flickerType?: 'slow' | 'fast') => {
  switch (flickerType) {
    case 'slow':
      return css`
        animation: ${flicker} 5s linear infinite;
        `;
    case 'fast':
      return css`
        animation: ${flicker} 3s linear infinite;
      `;
    default:
      return '';
  }
};

const Neon = styled.div<{
  text_color: string;
  shadow_color: string;
  flicker?: 'slow' | 'fast';
}>`
  font-size: 6rem;
  color: ${(props) => props.text_color};
  font-weight: 400;
  letter-spacing: 8px;
  text-shadow: 
    //1px 0px 4px ${(props) => props.text_color}, 
    //-1px 0px 4px ${(props) => props.text_color}, 
    // 0px 0px 2px ${(props) => props.text_color},
    2px 0px 2px ${(props) => props.shadow_color},
    -2px 0px 2px ${(props) => props.shadow_color},
    2px 3px 15px ${(props) => props.shadow_color}, 
    2px 0px 15px ${(props) => props.shadow_color} , 
    5px 0px 80px ${(props) => props.shadow_color},
    10px 0vw 20px ${(props) => props.shadow_color}, 
    4px 0vw 200px ${(props) => props.shadow_color};
  
  ${(props) => getFlickerAnimation(props.flicker)}
`;

const BORDER_COLOR = '#8a0e0e'
const Border = styled.div`
  display: flex;
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 0.8rem ${BORDER_COLOR}, 0 0 0.8rem ${BORDER_COLOR}, 0 0 0.8rem ${BORDER_COLOR},
    inset 0 0 1rem ${BORDER_COLOR};
`;

export const Logo: React.FC<{}> = () => {
  return (
    <StyledLogo>
      <Border>
        <Neon text_color={PINK_COLOR} shadow_color={PINK_COLOR_SHADOW}>
          H
        </Neon>
        <Neon text_color={PINK_COLOR} shadow_color={PINK_COLOR_SHADOW} flicker="slow">
          O
        </Neon>
        <Neon text_color={PINK_COLOR} shadow_color={PINK_COLOR_SHADOW}>
          X
        </Neon>
        <Neon text_color={CYAN_COLOR} shadow_color={CYAN_COLOR_SHADOW}>
          PO
        </Neon>
        <Neon text_color={CYAN_COLOR} shadow_color={CYAN_COLOR_SHADOW} flicker="fast">
          N
        </Neon>
        <Neon text_color={CYAN_COLOR} shadow_color={CYAN_COLOR_SHADOW}>
          G
        </Neon>
      </Border>
    </StyledLogo>
  );
};
