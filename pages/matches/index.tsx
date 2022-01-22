/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetServerSideProps, NextPage } from 'next';
import { config } from '../../config';
import { Match } from '../api/matches';
import List from '../../src/components/List';
import { sortByDate } from '../../src/utils';

interface PageProps {
  matches: Match[];
}

export const Page: NextPage<PageProps> = ({ matches }) =>
  List<Match>({
    items: sortByDate('createdAt', matches),
    title: 'Matches (rounds)',
    listHeadings: ['Winner', 'Loser', 'Won / lost elo', 'Played at'],
    itemRenderer: (match) => (
      <div
        key={match._id}
        sx={{ variant: 'containers.listItem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
      >
        <div>{match.winner.name}</div>
        <div>{match.loser.name}</div>
        <div>{match.eloDiff}</div>
        <div>{new Date(match.createdAt).toLocaleDateString()}</div>
      </div>
    ),
  });

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  return await fetch(`${config.baseUrl}/api/matches`)
    .then((res) => res.json())
    .then(({ data }) => ({
      props: {
        matches: data,
      },
    }));
};
