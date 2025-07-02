import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../lib/models";
import { connect } from "../../../lib/db";
import { verifyAdmin } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method === "GET") {
    const products = await (Product as any).find().lean();
    res.json(products);
  } else if (req.method === "POST") {
    const admin = await verifyAdmin(req);
    if (!admin) return res.status(401).end();
    const product = await (Product as any).create(req.body);
    res.json(product);
  } else {
    res.status(405).end();
  }
}
