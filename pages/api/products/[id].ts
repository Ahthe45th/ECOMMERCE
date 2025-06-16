import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await (Product as any).findByIdAndDelete(req.query.id as string);
    res.json({});
  } else {
    res.status(405).end();
  }
}
