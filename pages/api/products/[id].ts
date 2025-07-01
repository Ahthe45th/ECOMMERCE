import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../lib/models";
import { connect } from "../../../lib/db";

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
    await (Product as any).findByIdAndDelete(req.query.id as string);
    res.json({});
  } else {
    res.status(405).end();
  }
}
