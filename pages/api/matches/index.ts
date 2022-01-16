import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import R from 'ramda';
import { createManyMatches, getMatches } from '../../../db/match';
import { findById, updateUser } from '../../../db/user';
import middleware from '../../../middleware/all';
import ratingSystem from '../../../src/ratingSystem';
import { CustomNextRequest } from '../../../src/types/next';

export type Match = {
  // id: string;
  // winnerId: string;
  // loserId: string;
  // createdAt: string;
  [key: string]: any;
};

interface InputMatchData {
  p1Id: string;
  p2Id: string;
  score: number;
}

type Data = {
  data: Match[] | Match;
};

const updatePlayerRatings = async (req: CustomNextRequest, res: NextApiResponse<Data>, matches: InputMatchData[]) => {
  const [{ p1Id, p2Id }] = matches;
  const [p1, p2] = await Promise.all([findById(req.db, p1Id), findById(req.db, p2Id)]);
  if (!p1 || !p2) {
    return res.status(400).end();
  }

  const { p1Elo, p2Elo } = R.reduce(
    (acc, curr) => {
      const { p1Elo, p2Elo } = acc;
      const { nextPlayerARating, nextPlayerBRating } = ratingSystem.getNextRatings(p1Elo, p2Elo, curr.score);

      return { p1Elo: nextPlayerARating, p2Elo: nextPlayerBRating };
    },
    { p1Elo: p1.elo, p2Elo: p2.elo },
    matches,
  );

  await Promise.all(
    [
      { newRating: p1Elo, _id: p1Id },
      { newRating: p2Elo, _id: p2Id },
    ].map(({ newRating, _id }) => {
      updateUser(req.db, { _id, elo: newRating });
    }),
  );
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const matches = await getMatches(req.db);
    res.status(200).json({ data: matches });
  })
  .post(async (req, res) => {
    const matches: InputMatchData[] | undefined = req.body.data;

    if (!matches) {
      return res.status(400).end();
    }

    const matchesFormatted = matches.map(({ score, p1Id, p2Id }) => ({
      winnerId: score === 1 ? p1Id : p2Id,
      loserId: score === 1 ? p2Id : p1Id,
    }));

    const newMatches = await createManyMatches(req.db, matchesFormatted);

    await updatePlayerRatings(req, res, matches);

    res.status(200).json({ data: newMatches });
  });
