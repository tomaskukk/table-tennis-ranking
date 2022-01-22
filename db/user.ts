import { Db, ObjectId } from 'mongodb';
import * as R from 'ramda';
import { getDocument, newDateString } from './utils';

export const createUser = async (db: Db, user: { name: string }) => {
  const newUser = await db
    .collection('users')
    .insertOne({
      ...user,
      elo: 1200,
      createdAt: newDateString(),
    })
    .then(getDocument(db, 'users'));

  return newUser;
};

export const getUsers = async (db: Db) => db.collection('users').find({}).toArray();

export const getUserAggregation = async (db: Db) =>
  db
    .collection('users')
    .aggregate([
      {
        $lookup: {
          from: 'matches',
          localField: '_id',
          foreignField: 'winnerId',
          as: 'listOfWins',
        },
      },
      {
        $lookup: {
          from: 'matches',
          localField: '_id',
          foreignField: 'loserId',
          as: 'listOfLosses',
        },
      },
      {
        $project: {
          elo: 1,
          name: 1,
          lossCount: { $size: '$listOfLosses' },
          winCount: { $size: '$listOfWins' },
        },
      },
    ])
    .toArray();

export const findById = async (db: Db, _id: string) => db.collection('users').findOne({ _id: new ObjectId(_id) });

export const updateUser = async (db: Db, user: Record<string, any>) => {
  const _id = new ObjectId(user._id);
  await db.collection('users').updateOne({ _id }, { $set: R.omit(['_id'], user) });

  return db.collection('users').findOne({ _id });
};
