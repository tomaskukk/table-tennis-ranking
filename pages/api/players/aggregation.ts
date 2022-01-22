import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { Player } from '.';
import { getUserAggregation } from '../../../db/user';
import middleware from '../../../middleware/all';
import { CustomNextRequest } from '../../../src/types/next';

type Data = {
  data: Player[];
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const players = await getUserAggregation(req.db);

    res.status(200).json({ data: players });
  });
