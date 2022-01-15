import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export interface Player {
  id: string;
  name: string;
  elo: number;
}

export const players: Player[] = [
  { id: '1', name: 'Tomas', elo: 1233 },
  { id: '2', name: 'Hermanni', elo: 1233 },
  { id: '3', name: 'Saija', elo: 1233 },
];

type Data = {
  data: Player[];
};

export default nc<NextApiRequest, NextApiResponse<Data>>()
  .get((req, res) => {
    res.status(200).json({ data: players });
  })
  .post((req, res) => {
    // TODO
    res.status(200).end();
  });
