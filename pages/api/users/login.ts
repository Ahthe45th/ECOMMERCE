import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { Customer } from "../../../lib/models";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  await connect();
  const { email, password } = req.body;
  const user = await (Customer as any).findOne({ email });
  if (!user) return res.status(401).end("Invalid credentials");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).end("Invalid credentials");
  const token = signToken(user._id.toString());
  res.setHeader(
    "Set-Cookie",
    serialize("user-token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    }),
  );
  res.json({ email: user.email, name: user.name });
}
