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
import { NextRouter, useRouter } from 'next/router';
import { users } from '@prisma/client';
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

const ResultFormItem = styled(PageRowItem)`
  margin-top: 4rem;
`;

const AddPlayerItem = styled(PageRowItem)`
  margin-top: 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #fff;
`;

const Home: NextPage<{ players: users[] }> = ({ players }) => {
  const router = useRouter();
  return (
    <StyledHome>
      <PageColumn>
        <PageRowItem title="">
          <ResultFormItem title="Write results (e.g 2-1 for BO3)">
            <ResultForm players={players} />
          </ResultFormItem>
          <Divider />
          <AddPlayerItem title="Add players">
            <InputForm
              onClick={addPlayer(router)}
              buttonLabel="Add player"
              label="New player? Add yourself to the system"
              placeholder="Jane Doe"
            />
          </AddPlayerItem>
        </PageRowItem>
        <PageRowItem title="">
          <Ranking players={players} />
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
