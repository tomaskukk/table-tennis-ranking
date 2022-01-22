/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, useState } from 'react';
import { jsx } from 'theme-ui';
import Button from './Button';
import { Input } from './Input';

interface InputFormProps {
  onClick: (inputValue: string) => void;
  label?: string;
  placeholder?: string;
  buttonLabel: string;
}

export const InputForm: FC<InputFormProps> = ({ onClick, label, placeholder, buttonLabel, ...restProps }) => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    onClick(inputValue);
    setInputValue('');
  };

  return (
    <div
      {...restProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '> :not(:first-child)': {
          mt: '0.5rem !important',
        },
      }}
    >
      <Input
        label={label}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ width: '20rem', mb: '1rem' }}
      />
      <Button onClick={handleClick}>{buttonLabel}</Button>
    </div>
  );
};
