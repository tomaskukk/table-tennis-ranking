import { Db, InsertOneResult } from 'mongodb';

export const getDocument =
  (db: Db, col: string) =>
  ({ insertedId }: InsertOneResult) =>
    db.collection(col).findOne({ _id: insertedId });

export const newDateString = () => new Date().toISOString();
