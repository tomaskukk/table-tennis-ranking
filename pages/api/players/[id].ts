import { users } from '@prisma/client';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { findById } from '../../../db/user';
import middleware from '../../../middleware/all';
import { CustomNextRequest } from '../../../src/types/next';

type Data = {
  player: users;
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const id = req.query['id'] as string;
    const player = await findById(req.dbClient, id);
    if (!player) {
      return res.status(404).end();
    }
    res.status(200).json({ player });
  });
