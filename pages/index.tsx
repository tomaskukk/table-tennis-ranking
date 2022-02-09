/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { InputForm } from '../src/components/InputForm';
import { config } from '../config';
import { postData, refreshServerSideProps, sortByElo } from '../src/utils';
import { PageRowItem } from '../src/components/PageRowItem';
import { ResultForm } from '../src/components/ResultForm';
import { Player } from './api/players';
import { NextRouter, useRouter } from 'next/router';
import { Ranking } from '../src/components/Ranking';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const addPlayer = (router: NextRouter) => (name: string) => {
  postData(`${baseUrl}/api/players`, { name })
    .then(({ data }) => window.alert(`New player ${data.name} added!`))
    .then(() => refreshServerSideProps(router));
};

const StyledHome = styled.div``;

const PageColumn = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    padding: 1rem;
    width: 500px;
  }
`;

const Home: NextPage<{ players: users[] }> = ({ players }) => {
  const router = useRouter();
  return (
    <StyledHome>
      <PageRowItem title="">
        <Ranking players={players} />
      </PageRowItem>
      <PageColumn>
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
      </PageColumn>
    </StyledHome>
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
