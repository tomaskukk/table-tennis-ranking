/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC } from 'react';
import styled from 'styled-components';

interface PageRowItemProps {
  title: string;
}

const StyledPageRowItem = styled.div`
  :not(:first-of-type) {
    margin-left: '2rem';
  }
`;
export const PageRowItem: FC<PageRowItemProps> = ({ title, children, ...restProps }) => {
  return (
    <StyledPageRowItem {...restProps} >
      <h2 style={{marginTop: '0rem'}}>{title}</h2>
      {children}
    </StyledPageRowItem>
  );
};
