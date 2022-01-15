import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import R from 'ramda';
import matches from '../../../src/data/matches';
import players from '../../../src/data/players';
import ratingSystem from '../../../src/ratingSystem';
import { findById } from '../../../src/utils';
import { Player } from '../players';

export type Match = {
  id: string;
  winnerId: string;
  loserId: string;
  createdAt: string;
};

type Data = {
  data: Match[] | Match;
};

const nextId = () => String(Number(matches[matches.length - 1].id) + 1);

const getNewMatch = (props: Match) => {
  const id = nextId();

  const { winnerId, loserId } = props;

  matches.push({
    id,
    winnerId,
    loserId,
    createdAt: new Date().toISOString(),
  });

  const newMatch = findById<Match>(id)(matches);

  if (!newMatch) {
    throw new Error('Something went wrong when creating a new match');
  }

  return newMatch;
};

const updatePlayer = (id: string, props: Partial<Player>) => {
  const player = findById<Player>(id)(players);

  if (!player) {
    throw new Error('Something went terribly wrong :(');
  }

  const indexOfPlayer = players.indexOf(player);

  players[indexOfPlayer] = {
    ...player,
    ...props,
  };
};

const updatePlayerRatings = ({ loserId, winnerId }: Match, res: NextApiResponse<Data>) => {
  const [loser, winner] = [findById<Player>(loserId)(players), findById<Player>(winnerId)(players)];

  if (!loser || !winner) {
    return res.status(400).end();
  }

  const { nextPlayerARating, nextPlayerBRating } = ratingSystem.getNextRatings(winner.elo, loser.elo, 1);

  [
    { newRating: nextPlayerARating, id: winner.id },
    { newRating: nextPlayerBRating, id: loser.id },
  ].forEach(({ newRating, id }) => {
    updatePlayer(id, { elo: newRating });
  });
};

export default nc<NextApiRequest, NextApiResponse<Data>>()
  .get((req, res) => {
    res.status(200).json({ data: matches });
  })
  .post((req, res) => {
    const props = R.pick<Match, any>(['winnerId', 'loserId'], req.body);

    if (R.length(R.values(props)) !== 2) {
      return res.status(400).end();
    }

    const newMatch = getNewMatch(props);

    updatePlayerRatings(props, res);

    res.status(200).json({ data: newMatch });
  });
