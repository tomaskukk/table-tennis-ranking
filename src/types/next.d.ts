import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

interface CustomNextRequest extends NextApiRequest {
  dbClient: PrismaClient;
}
