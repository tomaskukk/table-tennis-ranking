/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetServerSideProps, NextPage } from 'next';
import { config } from '../../config';
import { Player } from '../api/players';
import List from '../../src/components/List';
import { sortByElo } from '../../src/utils';

interface PageProps {
  players: Player[];
}

export const Page: NextPage<PageProps> = ({ players }) =>
  List<Player>({
    items: sortByElo(players),
    title: 'Players',
    listHeadings: ['Name', 'Wins (rounds)', 'Losses (rounds)', 'Elo'],
    itemRenderer: (player, i) => (
      <div
        key={player._id}
        sx={{
          variant: 'containers.listItem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        <div>{player.name}</div>
        <div>{player.winCount}</div>
        <div>{player.lossCount}</div>
        <div>{player.elo}</div>
      </div>
    ),
  });

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  return await fetch(`${config.baseUrl}/api/players/aggregation`)
    .then((res) => res.json())
    .then(({ data }) => ({
      props: {
        players: data,
      },
    }));
};
