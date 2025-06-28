import type { NextApiRequest, NextApiResponse } from 'next';
import { Order, Confirmation } from '../../../lib/models';
import { connect } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const order = await (Order as any).findById(id).lean();
    if (!order) return res.status(404).end();
    const confirmation = await (Confirmation as any)
      .findOne({ orderId: id })
      .lean();
    res.json({ order, confirmation });
  } else {
    res.status(405).end();
  }
}
