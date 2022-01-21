/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetServerSideProps, NextPage } from 'next';
import { config } from '../../config';
import { Player } from '../api/players';
import List from '../../src/components/List';

interface PageProps {
  players: Player[];
}

export const Page: NextPage<PageProps> = ({ players }) =>
  List<Player>({
    items: players,
    title: 'Players',
    listHeadings: ['Name', 'Elo'],
    itemRenderer: (player, i) => (
      <div
        key={player._id}
        sx={{
          variant: 'containers.listItem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
        }}
      >
        <div>{player.name}</div>
        <div>{player.elo}</div>
      </div>
    ),
  });

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  return await fetch(`${config.baseUrl}/api/players`)
    .then((res) => res.json())
    .then(({ data }) => ({
      props: {
        players: data,
      },
    }));
};
