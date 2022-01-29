import { PrismaClient } from '@prisma/client';

global.prisma = global.prisma || null;

export const connectToDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env variable is missing');
  }

  if (!process.env.DATABASE_NAME) {
    throw new Error('DATABASE_NAME env variable is missing');
  }

  if (!global.prisma) {
    console.log('connecting to DB with prisma..');
    const client = new PrismaClient();

    await client.$connect();

    global.prisma = { client };

    console.log('succesfully connected with prisma');
  }

  return { prisma: global.prisma.client };
};
