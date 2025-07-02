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
    const product = await (Product as any)
      .findById(req.query.id as string)
      .lean();
    res.json(product);
  } else if (req.method === "DELETE") {
    const admin = await verifyAdmin(req);
    if (!admin) return res.status(401).end();
    await (Product as any).findByIdAndDelete(req.query.id as string);
    res.json({});
  } else {
    res.status(405).end();
  }
}
