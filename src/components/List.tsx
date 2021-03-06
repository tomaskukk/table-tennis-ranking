/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { HTMLProps, ReactNode } from 'react';

interface ListProps<T> extends HTMLProps<HTMLDivElement> {
  items: T[];
  title: string;
  listHeadings: string[];
  itemRenderer: (item: T, i: number) => ReactNode;
}

const List = <T extends {}>({
  items,
  title,
  listHeadings,
  itemRenderer,
  ...restProps
}: React.PropsWithChildren<ListProps<T>>) => (
  <div {...restProps} sx={{ variant: 'containers.list' }}>
    {/* <h1>{title}</h1> */}
    <div
      sx={{
        variant: 'containers.listItem',
        background: 'none',
        pt: '0',
        pb: '0',
        mb: '0',
        display: 'grid',
        gridTemplateColumns: `repeat(${listHeadings.length}, 1fr)`,
      }}
    >
      {listHeadings.map((lh) => (
        <h3 key={lh}>{lh}</h3>
      ))}
    </div>
    {items.map(itemRenderer)}
  </div>
);

export default List;
