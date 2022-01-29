import { matches, Prisma, users } from '@prisma/client';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import R from 'ramda';
import { createManyMatches, getMatches } from '../../../db/match';
import { findById, updateUser } from '../../../db/user';
import middleware from '../../../middleware/all';
import ratingSystem from '../../../src/ratingSystem';
import { CustomNextRequest } from '../../../src/types/next';

interface InputMatchData {
  p1Id: string;
  p2Id: string;
  score: number;
}

type Data = {
  data: number | matches[];
};

const calculateNewEloForPlayers = (p1: users, p2: users, matches: InputMatchData[]) => {
  const { p1EloDiff, p2EloDiff, eloDiffs } = R.reduce(
    (acc, curr) => {
      const p1NewEloDiff = R.add(R.prop('p1EloDiff', acc));
      const p2NewEloDiff = R.add(R.prop('p2EloDiff', acc));
      const { playerARatingDiff, playerBRatingDiff } = ratingSystem.getNextRatings(p1.elo, p2.elo, curr.score);

      return {
        p1EloDiff: p1NewEloDiff(playerARatingDiff),
        p2EloDiff: p2NewEloDiff(playerBRatingDiff),
        eloDiffs: [...acc.eloDiffs, playerARatingDiff],
      };
    },
    { p1EloDiff: 0, p2EloDiff: 0, eloDiffs: [] as number[] },
    matches,
  );

  const newP1Elo = R.add(p1EloDiff, p1.elo);
  const newP2Elo = R.add(p2EloDiff, p2.elo);

  return { newP1Elo, newP2Elo, eloDiffs };
};

export default nc<CustomNextRequest, NextApiResponse<Data>>()
  .use(middleware)
  .get(async (req, res) => {
    const matches = await getMatches(req.dbClient, {
      include: {
        winner: true,
        loser: true,
      },
    });

    res.status(200).json({ data: matches });
  })
  .post(async (req, res) => {
    const matches: InputMatchData[] | undefined = req.body.data;
    if (!matches) {
      return res.status(400).end();
    }

    const [{ p1Id, p2Id }] = matches;

    const [p1, p2] = await Promise.all([findById(req.dbClient, p1Id), findById(req.dbClient, p2Id)]);

    if (!p1 || !p2) {
      return res.status(400).end();
    }

    const { newP1Elo, newP2Elo, eloDiffs } = calculateNewEloForPlayers(p1, p2, matches);

    const matchesFormatted = matches.map(({ score, p1Id, p2Id }, i) => ({
      winnerId: score === 1 ? p1Id : p2Id,
      loserId: score === 1 ? p2Id : p1Id,
      eloDiff: Math.abs(eloDiffs[i]),
    }));

    const count = await createManyMatches(req.dbClient, matchesFormatted);

    const updatePlayerInput = [
      { elo: newP1Elo, id: p1Id },
      { elo: newP2Elo, id: p2Id },
    ];

    await Promise.all(updatePlayerInput.map((input) => updateUser(req.dbClient, input)));

    res.status(200).json({ data: count });
  });
