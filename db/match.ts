import { Db } from 'mongodb';
import * as R from 'ramda';
import { getDocument, newDateString } from './utils';

export const createMatch = async (db: Db, match: { winnerId: string; loserId: string }) => {
  const newMatch = await db
    .collection('matches')
    .insertOne({
      ...match,
      createdAt: newDateString(),
    })
    .then(getDocument(db, 'matches'));

  return newMatch;
};

export const createManyMatches = async (db: Db, data: any[]) => {
  const col = db.collection('matches');
  return col
    .insertMany(data)
    .then((res) => res.insertedIds)
    .then(R.values)
    .then((ids) => col.find({ _id: { $in: ids } }))
    .then((res) => res.toArray());
};

export const getMatches = async (db: Db) => db.collection('matches').find({}).toArray();
