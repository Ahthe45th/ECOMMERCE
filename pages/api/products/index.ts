import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await (Product as any).find().lean();
    res.json(products);
  } else if (req.method === 'POST') {
    const product = await (Product as any).create(req.body);
    res.json(product);
  } else {
    res.status(405).end();
  }
}
