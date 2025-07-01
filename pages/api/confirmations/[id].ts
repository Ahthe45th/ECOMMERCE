import type { NextApiRequest, NextApiResponse } from "next";
import { Confirmation } from "../../../lib/models";
import { connect } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  const { id } = req.query;

  if (req.method === "GET") {
    const confirmation = await (Confirmation as any).findById(id).lean();
    if (!confirmation) return res.status(404).end();
    res.json(confirmation);
  } else if (req.method === "PUT") {
    const updated = await (Confirmation as any).findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );
    res.json(updated);
  } else {
    res.status(405).end();
  }
}
