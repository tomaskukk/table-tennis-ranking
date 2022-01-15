import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Match, matches } from '.';
import { findById } from '../../../src/utils';

type Data = {
  data: Match;
};

export default nc<NextApiRequest, NextApiResponse<Data>>().get((req, res) => {
  const id = req.query['id'] as string;
  const match = findById<Match>(id)(matches);
  if (!match) {
    return res.status(404).end();
  }
  res.status(200).json({ data: match });
});
