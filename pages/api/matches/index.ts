import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export type Match = {
  id: string;
  winnerId: string;
  loserId: string;
  createdAt: string;
};

export const matches: Match[] = [
  {
    id: '1',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
];

type Data = {
  data: Match[];
};

export default nc<NextApiRequest, NextApiResponse<Data>>()
  .get((req, res) => {
    res.status(200).json({ data: matches });
  })
  .post((req, res) => {
    // TODO
    res.status(200).end();
  });
