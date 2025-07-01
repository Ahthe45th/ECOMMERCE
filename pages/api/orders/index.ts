import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../lib/models";
import { connect } from "../../../lib/db";
import { sendOrderEmail } from "../../../lib/email";
import { verifyUser } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method === "GET") {
    if (req.query.mine) {
      const user = await verifyUser(req);
      if (!user) return res.status(401).end();
      const orders = await (Order as any).find({ userId: user._id }).lean();
      res.json(orders);
    } else {
      const orders = await (Order as any).find().lean();
      res.json(orders);
    }
  } else if (req.method === "POST") {
    const user = await verifyUser(req);
    const payload = { ...req.body };
    if (user) payload.userId = user._id;
    const order = await (Order as any).create(payload);
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
