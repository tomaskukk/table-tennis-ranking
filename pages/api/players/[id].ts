import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Player } from '.';
import players from '../../../src/data/players';
import { findById } from '../../../src/utils';

type Data = {
  player: Player;
};

export default nc<NextApiRequest, NextApiResponse<Data>>().get((req, res) => {
  const id = req.query['id'] as string;
  const player = findById<Player>(id)(players);
  if (!player) {
    return res.status(404).end();
  }
  res.status(200).json({ player });
});
