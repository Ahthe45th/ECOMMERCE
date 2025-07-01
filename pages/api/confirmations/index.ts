import type { NextApiRequest, NextApiResponse } from "next";
import { Confirmation } from "../../../lib/models";
import { connect } from "../../../lib/db";
import "../../../lib/cron";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method === "GET") {
    const confirmations = await (Confirmation as any).find().lean();
    res.json(confirmations);
  } else if (req.method === "POST") {
    const confirmation = await (Confirmation as any).create({
      ...req.body,
      source: req.body.source || "user",
      status: "pending",
    });
    res.json(confirmation);
  } else {
    res.status(405).end();
  }
}
