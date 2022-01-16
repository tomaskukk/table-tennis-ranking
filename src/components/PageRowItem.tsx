/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC } from 'react';

interface PageRowItemProps {
  title: string;
}
export const PageRowItem: FC<PageRowItemProps> = ({ title, children, ...restProps }) => {
  return (
    <div {...restProps} sx={{ variant: 'containers.pageRowItem' }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
