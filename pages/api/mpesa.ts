import type { NextApiRequest, NextApiResponse } from "next";
import { Confirmation } from "../../lib/models";
import { connect } from "../../lib/db";
import "../../lib/cron";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method === "POST") {
    const { orderId, phone, message } = req.body;
    const confirmation = await (Confirmation as any).create({
      orderId,
      phone,
      message,
      source: "mpesa",
      status: "pending",
    });
    res.json(confirmation);
  } else {
    res.status(405).end();
  }
}
