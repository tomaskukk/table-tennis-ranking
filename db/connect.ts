import { MongoClient } from 'mongodb';

global.mongo = global.mongo || null;

export const connectToDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env variable is missing');
  }

  if (!global.mongo) {
    console.log('connecting to DB');

    const client = new MongoClient(process.env.DATABASE_URL, {
      connectTimeoutMS: 10000,
    });

    global.mongo = { client };
    await global.mongo.client.connect();
    console.log('connected to DB');
  }

  const db = global.mongo.client.db(process.env.DATABASE_NAME);

  return { db, dbClient: global.mongo.client };
};
