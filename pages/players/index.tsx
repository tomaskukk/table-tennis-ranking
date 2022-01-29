/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetServerSideProps, NextPage } from 'next';
import { config } from '../../config';
import List from '../../src/components/List';
import { sortByElo } from '../../src/utils';
import { PlayerWithMatchCounts } from '../../src/types/models';

interface PageProps {
  players: PlayerWithMatchCounts[];
}

export const Page: NextPage<PageProps> = ({ players }) =>
  List<PlayerWithMatchCounts>({
    items: sortByElo(players),
    title: 'Players',
    listHeadings: ['Name', 'Wins (rounds)', 'Losses (rounds)', 'Elo'],
    itemRenderer: (player, i) => (
      <div
        key={player.id}
        sx={{
          variant: 'containers.listItem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        <div>{player.name}</div>
        <div>{player._count.wins}</div>
        <div>{player._count.losses}</div>
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
