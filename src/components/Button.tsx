/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC, HTMLProps } from 'react';
import { ThemeColors } from '../../theme';

interface ButtonProps extends HTMLProps<HTMLDivElement> {
  color?: ThemeColors;
}

const Button: FC<ButtonProps> = ({ color = 'primary', children, ...restProps }) => (
  <div {...restProps} sx={{ variant: 'button', background: color, color: 'background' }}>
    {children}
  </div>
);

export default Button;
