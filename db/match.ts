import { Prisma, PrismaClient } from '@prisma/client';
import * as R from 'ramda';
import { newDateString } from './utils';

export const createMatch = async (
  dbClient: PrismaClient,
  match: { eloDiff: number; winnerId: string; loserId: string },
) => {
  const newMatch = await dbClient.matches.create({
    data: {
      ...match,
      createdAt: newDateString(),
    },
  });

  return newMatch;
};

export const createManyMatches = async (dbClient: PrismaClient, data: any[]) => {
  const createdAt = newDateString();

  const dataWithDates = R.map(R.mergeRight({ createdAt }), data);

  const matches = await dbClient.matches.createMany({
    data: dataWithDates,
  });

  return matches.count;
};

export const getMatches = async (dbClient: PrismaClient, options: Prisma.matchesFindManyArgs = {}) =>
  dbClient.matches.findMany(options);
