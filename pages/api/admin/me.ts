import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAdmin } from "../../../lib/auth";
import { AdminUser } from "../../../lib/models";
import { connect } from "../../../lib/db";
import { ensureDefaultAdmin } from "../../../lib/initAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  await ensureDefaultAdmin();
  const admin = await verifyAdmin(req);
  if (!admin) return res.status(401).end();
  res.json({ username: admin.username });
}
