import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../../../lib/models';
import { connect } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  if (req.method === 'POST') {
    const order = await (Order as any).create(req.body);
    res.json(order);
  } else {
    res.status(405).end();
  }
}
