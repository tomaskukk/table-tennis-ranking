/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetServerSideProps, NextPage } from 'next';
import { config } from '../../config';
import { Match } from '../api/matches';
import List from '../../src/components/List';

interface PageProps {
  matches: Match[];
}

export const Page: NextPage<PageProps> = ({ matches }) =>
  List<Match>({
    items: matches,
    title: 'Matches',
    listHeadings: ['WinnerId', 'LoserId', 'Played at'],
    itemRenderer: (match) => (
      <div key={match.id} sx={{ variant: 'containers.listItem' }}>
        <div>{match.winnerId}</div>
        <div>{match.loserId}</div>
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
