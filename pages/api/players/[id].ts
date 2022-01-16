import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { Player } from '.';
import { findById } from '../../../db/user';
import middleware from '../../../middleware/all';
import { CustomNextRequest } from '../../../src/types/next';

type Data = {
  player: Player;
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get((req, res) => {
    const id = req.query['id'] as string;
    const player = findById(req.db, id);
    if (!player) {
      return res.status(404).end();
    }
    res.status(200).json({ player });
  });
