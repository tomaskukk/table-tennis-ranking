import { users } from '@prisma/client';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { createUser, getUsers } from '../../../db/user';
import middleware from '../../../middleware/all';
import { CustomNextRequest } from '../../../src/types/next';

type Data = {
  data: users[] | users;
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const players = await getUsers(req.dbClient);

    res.status(200).json({ data: players });
  })
  .post(async (req, res) => {
    const name = req.body?.name;

    if (!name) {
      return res.status(400).end();
    }

    const player = await createUser(req.dbClient, { name });

    if (!player) {
      throw new Error('Something went wrong when creating a new player');
    }

    res.status(200).json({ data: player });
  });
