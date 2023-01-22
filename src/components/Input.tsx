/** @jsxRuntime classic */
/** @jsx jsx */
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { jsx, Label } from 'theme-ui';
import { Input as InputBase } from 'theme-ui';
import styled from 'styled-components'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
}

const Placeholder = styled.div`
  height: 27.5px;
`;
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...restProps }, ref) => {
  return (
    <div>
      {label ? <Label sx={{ mb: '0.5rem' }}>{label}</Label> : <Placeholder />}
      <InputBase ref={ref} {...restProps} />
    </div>
  );
});
