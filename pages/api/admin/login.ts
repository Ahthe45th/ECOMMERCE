import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { AdminUser } from "../../../lib/models";
import { ensureDefaultAdmin } from "../../../lib/initAdmin";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  await connect();
  await ensureDefaultAdmin();
  const { username, password } = req.body;
  const user = await (AdminUser as any).findOne({ username });
  if (!user) return res.status(401).end("Invalid credentials");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).end("Invalid credentials");
  const token = signToken(user._id.toString());
  res.setHeader(
    "Set-Cookie",
    serialize("admin-token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    }),
  );
  res.json({ ok: true });
}
