import { Prisma, PrismaClient } from '@prisma/client';
import R from 'ramda';
import { newDateString } from './utils';

export const createUser = async (dbClient: PrismaClient, user: { name: string }) => {
  const newUser = await dbClient.users.create({
    data: {
      ...user,
      elo: 1200,
      createdAt: newDateString(),
    },
  });

  return newUser;
};

export const getUsers = async (dbClient: PrismaClient, options: Prisma.usersFindManyArgs = {}) =>
  dbClient.users.findMany(options);

export const findById = async (dbClient: PrismaClient, id: string) =>
  dbClient.users.findUnique({
    where: {
      id,
    },
  });

export const updateUser = async (dbClient: PrismaClient, user: Record<string, any>) => {
  const updatedUser = await dbClient.users.update({
    where: {
      id: user.id,
    },
    data: {
      ...R.omit(['id'], user),
    },
  });

  return updatedUser;
};
