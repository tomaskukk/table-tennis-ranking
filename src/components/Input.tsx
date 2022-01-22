/** @jsxRuntime classic */
/** @jsx jsx */
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { jsx, Label } from 'theme-ui';
import { Input as InputBase } from 'theme-ui';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...restProps }, ref) => {
  return (
    <div>
      {label && <Label sx={{ mb: '0.5rem' }}>{label}</Label>}
      <InputBase ref={ref} {...restProps} />
    </div>
  );
});
