import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../../../lib/models';
import { connect } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const id = req.query.id as string;
  if (req.method === 'PUT') {
    const updated = await (Order as any).findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } else if (req.method === 'GET') {
    const order = await (Order as any).findById(id).lean();
    res.json(order);
  } else {
    res.status(405).end();
  }
}
