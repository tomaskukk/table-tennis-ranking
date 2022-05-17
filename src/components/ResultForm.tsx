/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { FC, RefObject, useRef, useState, useMemo } from 'react';
import Button from './Button';
import { postData, refreshServerSideProps } from '../utils';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { Input } from './Input';
import styled from 'styled-components';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ResultFormProps {
  players: Player[];
}

const buildMatchResult = (p1: Player, p2: Player, score: number) => () => ({
  p1Id: p1._id,
  p2Id: p2._id,
  score,
});

const buildMatchResults = (p1: Player, p2: Player, p1Score: number, p2Score: number) => {
  const matchResults = R.map(
    ({ score, times }) => R.times(buildMatchResult(p1, p2, score), times),
    [
      { score: 1, times: p1Score },
      { score: 0, times: p2Score },
    ],
  );

  return R.flatten(matchResults);
};

const getRefValueAsNum = (ref: RefObject<HTMLInputElement>) => Number(ref.current?.value) || 0;

const postMatchData = (data: { p1Id: string; p2Id: string; score: number }[]) =>
  postData(`${baseUrl}/api/matches`, { data });

const constructAlertMessage = (players: Player[], p1Score: number, p2Score: number) => () => {
  if (p1Score === p2Score) {
    return `Thanks for submitting the game! It's a tie I see.. 🧐`;
  }

  const winner = p1Score > p2Score ? players[0] : players[1];

  return `Well done ${winner.name}, the game has been saved`;
};

const StyledResultForm = styled.div`
  margin-bottom: 1rem;
`;

const PlayerListItem = styled.div`
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid gray;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
`;

const PlayerVsPlayerRow = styled.div`
  height: 6.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > * {
    margin-right: 1rem;
  }
  margin-bottom: 3rem;
`;

const PlayerPicker = styled.div`
  min-height: 15rem;
`;

const Buttons = styled.div`
  display: flex;
  > :first-of-type {
    margin-right: 1rem;
  }
`;

const PlayerNamesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const AdditionalPlayersText = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
  flex-basis: 100%;
`;
export const ResultForm: FC<ResultFormProps> = ({ players, ...restProps }) => {
  const [matchPlayers, setMatchPlayers] = useState<Player[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const router = useRouter();
  const scoreRefOne = useRef<HTMLInputElement>(null);
  const scoreRefTwo = useRef<HTMLInputElement>(null);

  const nthPlayer = (n: number) => R.nth(n, matchPlayers) as Player;

  const p1 = nthPlayer(0);
  const p2 = nthPlayer(1);

  const handleSendResults = () => {
    const p1Score = getRefValueAsNum(scoreRefOne);
    const p2Score = getRefValueAsNum(scoreRefTwo);

    const matchResults = buildMatchResults(p1, p2, p1Score, p2Score);

    postMatchData(matchResults)
      .then(constructAlertMessage(matchPlayers, p1Score, p2Score))
      .then(window.alert)
      .then(() => refreshServerSideProps(router));

    setMatchPlayers([]);
  };

  const playersFiltered = useMemo(
    () => players.filter(({ name }) => name.toLowerCase().includes(searchFilter.toLowerCase())),
    [players, searchFilter],
  );

  return (
    <StyledResultForm {...restProps}>
      {/* <h3>Choose players:</h3> */}
      <PlayerVsPlayerRow>
        <Input
          label={matchPlayers[0]?.name}
          ref={scoreRefOne}
          type="number"
          defaultValue={0}
          min="0"
          sx={{ variant: 'input.number' }}
        />
        <div>VS</div>
        <Input
          label={matchPlayers[1]?.name}
          ref={scoreRefTwo}
          type="number"
          defaultValue={0}
          min="0"
          sx={{ variant: 'input.number' }}
        />
      </PlayerVsPlayerRow>

      <PlayerPicker>
        {matchPlayers.length === 2 ? (
          <Buttons>
            <Button onClick={handleSendResults}>Send results!</Button>
            <Button
              color="grey"
              onClick={() => {
                setMatchPlayers([]);
              }}
            >
              Cancel
            </Button>
          </Buttons>
        ) : (
          <>
            <Input
              sx={{ mt: '0.5rem', mb: '1rem' }}
              label="Filter players"
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <PlayerNamesList>
              {playersFiltered.slice(0, 6).map((p) => (
                <PlayerListItem
                  key={p.id}
                  onClick={() => {
                    setMatchPlayers((prev) => [...prev, p]);
                    setSearchFilter('');
                  }}
                >
                  {p.name}
                </PlayerListItem>
              ))}
              {playersFiltered.length - 6 > 0 && (
                <AdditionalPlayersText>and {playersFiltered.length - 6} more...</AdditionalPlayersText>
              )}
            </PlayerNamesList>
          </>
        )}
      </PlayerPicker>
    </StyledResultForm>
  );
};
