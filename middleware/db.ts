import { connectToDB } from '../db/connect';
import { CustomNextRequest } from '../src/types/next';

export default async function database(req: CustomNextRequest, _: any, next: any) {
  console.log('connect to db');
  const { prisma } = await connectToDB();
  req.dbClient = prisma;

  next();
}
