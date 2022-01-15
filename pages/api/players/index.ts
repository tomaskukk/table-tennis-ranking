import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import players from '../../../src/data/players';
import { findById } from '../../../src/utils';

export interface Player {
  id: string;
  name: string;
  elo: number;
  provisional: boolean;
}

type Data = {
  data: Player[] | Player;
};

const nextId = () => String(Number(players[players.length - 1].id) + 1);

export default nc<NextApiRequest, NextApiResponse<Data>>()
  .get((req, res) => {
    res.status(200).json({ data: players });
  })
  .post((req, res) => {
    const name = req.body?.name;

    if (!name) {
      return res.status(400).end();
    }

    const id = nextId();

    players.push({
      id,
      name,
      elo: 1000,
      provisional: true,
    });

    const newPlayer = findById<Player>(id)(players);

    if (!newPlayer) {
      throw new Error('Something went wrong when creating a new player');
    }

    res.status(200).json({ data: newPlayer });
  });
