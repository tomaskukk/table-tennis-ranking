/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import type { GetServerSideProps, NextPage } from 'next';
import { InputForm } from '../src/components/InputForm';
import { config } from '../config';
import { postData, refreshServerSideProps, sortByElo } from '../src/utils';
import { PageRowItem } from '../src/components/PageRowItem';
import { ResultForm } from '../src/components/ResultForm';
import { Player } from './api/players';
import { NextRouter, useRouter } from 'next/router';

const medalEmojis = ['🥇', '🥈', '🥉'];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const addPlayer = (router: NextRouter) => (name: string) => {
  postData(`${baseUrl}/api/players`, { name })
    .then(({ data }) => window.alert(`New player ${data.name} added!`))
    .then(() => refreshServerSideProps(router));
};

const Home: NextPage<{ players: Player[] }> = ({ players }) => {
  const router = useRouter();
  return (
    <div>
      <h1 sx={{ textAlign: 'center' }}>Table tennis ranking system</h1>

      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // flex: '1 1 0px',
          '> *': {
            p: '1rem',
            width: '500px',
          },
        }}
      >
        <PageRowItem title="Add players">
          <InputForm
            onClick={addPlayer(router)}
            buttonLabel="Add player"
            label="New player? Add yourself to the system"
            placeholder="Jane Doe"
          />
        </PageRowItem>
        <PageRowItem title="Write results (e.g 2-1 for BO3)">
          <ResultForm players={players} />
        </PageRowItem>
        <PageRowItem title="Player rankings">
          <ol sx={{ pl: '1rem' }}>
            {sortByElo(players as any).map((p, i) => (
              <li key={p._id}>
                {medalEmojis[i]} {p.name} ({p.elo} elo)
              </li>
            ))}
          </ol>
        </PageRowItem>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = () => {
  return fetch(`${config.baseUrl}/api/players`)
    .then((res) => res.json())
    .then(({ data }) => ({
      props: {
        players: data,
      },
    }));
};
