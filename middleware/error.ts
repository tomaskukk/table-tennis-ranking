import { NextApiResponse } from 'next';
import { CustomNextRequest } from '../src/types/next';

export default async function onError(error: Error, req: CustomNextRequest, res: NextApiResponse) {
  console.log(error);
  res.status(500).end();
}
