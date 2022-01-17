import { Db, ObjectId } from 'mongodb';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import R from 'ramda';
import { createManyMatches, getMatchesAggregated } from '../../../db/match';
import { findById, updateUser } from '../../../db/user';
import middleware from '../../../middleware/all';
import ratingSystem from '../../../src/ratingSystem';
import { CustomNextRequest } from '../../../src/types/next';
import { Player } from '../players';

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

const calculateNewEloForPlayers = (p1: Player, p2: Player, matches: InputMatchData[]) => {
  const { p1EloDiff, p2EloDiff } = R.reduce(
    (acc, curr) => {
      const p1NewEloDiff = R.add(R.prop('p1EloDiff', acc));
      const p2NewEloDiff = R.add(R.prop('p2EloDiff', acc));
      const { playerARatingDiff, playerBRatingDiff } = ratingSystem.getNextRatings(p1.elo, p2.elo, curr.score);

      return { p1EloDiff: p1NewEloDiff(playerARatingDiff), p2EloDiff: p2NewEloDiff(playerBRatingDiff) };
    },
    { p1EloDiff: 0, p2EloDiff: 0 },
    matches,
  );

  const newP1Elo = R.add(p1EloDiff, p1.elo);
  const newP2Elo = R.add(p2EloDiff, p2.elo);

  return { newP1Elo, newP2Elo, diff: p1EloDiff };
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const matches = await getMatchesAggregated(req.db);
    res.status(200).json({ data: matches });
  })
  .post(async (req, res) => {
    const matches: InputMatchData[] | undefined = req.body.data;

    if (!matches) {
      return res.status(400).end();
    }

    const [{ p1Id, p2Id }] = matches;

    const [p1, p2] = await Promise.all([findById(req.db, p1Id), findById(req.db, p2Id)]);

    if (!p1 || !p2) {
      return res.status(400).end();
    }

    const { newP1Elo, newP2Elo, diff } = calculateNewEloForPlayers(p1, p2, matches);

    const matchesFormatted = matches.map(({ score, p1Id, p2Id }) => ({
      winnerId: new ObjectId(score === 1 ? p1Id : p2Id),
      loserId: new ObjectId(score === 1 ? p2Id : p1Id),
      eloDiff: Math.abs(diff),
    }));

    const newMatches = await createManyMatches(req.db, matchesFormatted);

    const updatePlayerInput = [
      { elo: newP1Elo, _id: p1Id },
      { elo: newP2Elo, _id: p2Id },
    ];

    await Promise.all(updatePlayerInput.map((input) => updateUser(req.db, input)));

    res.status(200).json({ data: newMatches });
  });
