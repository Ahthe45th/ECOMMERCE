import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../lib/models';
import { connect } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const id = req.query.id as string;
  if (req.method === 'GET') {
    const product = await (Product as any).findById(id).lean();
    res.json(product);
  } else if (req.method === 'PUT') {
    const updated = await (Product as any).findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } else if (req.method === 'DELETE') {
    await (Product as any).findByIdAndDelete(id);
    res.json({});
  } else {
    res.status(405).end();
  }
}
