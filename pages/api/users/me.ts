import type { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "../../../lib/auth";
import { connect } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  const user = await verifyUser(req);
  if (!user) return res.status(401).end();
  res.json({ email: user.email, name: user.name, _id: user._id });
}
