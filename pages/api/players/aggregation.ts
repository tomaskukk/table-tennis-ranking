import { users } from '@prisma/client';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { getUsers } from '../../../db/user';
import middleware from '../../../middleware/all';
import { CustomNextRequest } from '../../../src/types/next';

type Data = {
  data: users[];
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const players = await getUsers(req.dbClient, {
      include: {
        _count: {
          select: {
            wins: true,
            losses: true,
          },
        },
      },
    });

    res.status(200).json({ data: players });
  });
