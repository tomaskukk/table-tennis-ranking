/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC } from 'react';
import styled from 'styled-components';

import { ThemeColors } from '../../theme';

interface ButtonProps {
  color?: string | ThemeColors;
  onClick?: () => void;
}

const StyledButton = styled.div`
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  display: block;
  width: fit-content;
  cursor: pointer;
`;

const Button: FC<ButtonProps> = ({ onClick, color = 'primary', children, ...restProps }) => {
  return (
    <StyledButton onClick={onClick} {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
