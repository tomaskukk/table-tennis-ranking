import { NextMiddleware, NextResponse } from 'next/server';
import { connectToDB } from '../db/connect';
import { CustomNextRequest } from '../src/types/next';

export default async function database(req: CustomNextRequest, res: NextResponse, next: any) {
  console.log('connect to db');
  const { db, dbClient } = await connectToDB();
  req.db = db;
  req.dbClient = dbClient;

  next();
}
