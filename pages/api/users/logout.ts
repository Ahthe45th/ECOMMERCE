import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize("user-token", "", { path: "/", httpOnly: true, maxAge: 0 }),
  );
  res.json({ ok: true });
}
