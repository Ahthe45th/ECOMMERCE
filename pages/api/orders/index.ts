import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../lib/models";
import { connect } from "../../../lib/db";
import { sendOrderEmail } from "../../../lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method === "GET") {
    const orders = await (Order as any).find().lean();
    res.json(orders);
  } else if (req.method === "POST") {
    const order = await (Order as any).create(req.body);
    try {
      await sendOrderEmail(order);
    } catch (e) {
      console.error("Email send failed", e);
    }
    res.json(order);
  } else {
    res.status(405).end();
  }
}
