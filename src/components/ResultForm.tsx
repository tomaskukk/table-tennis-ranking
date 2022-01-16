/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FC, RefObject, useRef, useState } from 'react';
import { Player } from '../../pages/api/players';
import Button from './Button';
import { postData } from '../utils';
import * as R from 'ramda';
import build from 'next/dist/build';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ResultFormProps {
  players: Player[];
}

const buildMatchResult = (winner: Player, loser: Player) => () => ({
  winnerId: winner.id,
  loserId: loser.id,
});

const getRefValueAsNum = (ref: RefObject<HTMLInputElement>) => Number(ref.current?.value) || 0;

const postMatchData = (data: { winnerId: string; loserId: string }) => postData(`${baseUrl}/api/matches`, data);

const constructAlertMessage = (players: Player[], p1Score: number, p2Score: number) => () => {
  if (p1Score === p2Score) {
    return `Thanks for submitting the game! It's a tie I see.. 🧐`;
  }

  const winner = p1Score > p2Score ? players[0] : players[1];

  return `Well done ${winner.name}, the game has been saved`;
};

export const ResultForm: FC<ResultFormProps> = ({ players, ...restProps }) => {
  const [matchPlayers, setMatchPlayers] = useState<Player[]>([]);
  const scoreRefOne = useRef<HTMLInputElement>(null);
  const scoreRefTwo = useRef<HTMLInputElement>(null);

  const nthPlayer = (n: number) => R.nth(n, matchPlayers) as Player;

  const handleSendResults = () => {
    const p1Score = getRefValueAsNum(scoreRefOne);
    const p2Score = getRefValueAsNum(scoreRefTwo);

    const matchResults = R.pipe(
      R.concat(R.times(buildMatchResult(nthPlayer(0), nthPlayer(1)), p1Score)),
      R.concat(R.times(buildMatchResult(nthPlayer(1), nthPlayer(0)), p2Score)),
    )([]);

    Promise.all(R.map(postMatchData, matchResults))
      .then(constructAlertMessage(matchPlayers, p1Score, p2Score))
      .then(window.alert);

    setMatchPlayers([]);
  };

  return (
    <div {...restProps}>
      {/* <h3>Choose players:</h3> */}
      <div sx={{ height: '100px', display: 'flex', justifyContent: 'space-between', '> *': { mr: '1rem' } }}>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>{matchPlayers[0]?.name}</div>
          <input
            ref={scoreRefOne}
            name={`score-${matchPlayers[0]?.id}`}
            type="number"
            min="0"
            sx={{ variant: 'input.number' }}
          ></input>
        </div>
        <div>VS</div>
        <div>
          <div>{matchPlayers[1]?.name}</div>
          <input
            ref={scoreRefTwo}
            name={`score-${matchPlayers[1]?.id}`}
            type="number"
            min="0"
            sx={{ variant: 'input.number' }}
          ></input>
        </div>
      </div>

      {matchPlayers.length === 2 ? (
        <div sx={{ display: 'flex', '> :first-child': { mr: '1rem' } }}>
          <Button onClick={handleSendResults}>Send results!</Button>
          <Button
            color="grey"
            onClick={() => {
              setMatchPlayers([]);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {players.map((p) => (
            <div
              key={p.id}
              sx={{
                variant: 'playerListItem',
              }}
              onClick={() => {
                setMatchPlayers((prev) => [...prev, p]);
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
