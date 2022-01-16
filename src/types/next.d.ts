import { NextApiRequest } from 'next';

interface CustomNextRequest extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
}
