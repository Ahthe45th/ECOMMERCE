import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../lib/db';
import { AdminUser } from '../../../lib/models';
import { verifyAdmin } from '../../../lib/auth';
import { ensureDefaultAdmin } from '../../../lib/initAdmin';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  await ensureDefaultAdmin();
  const admin = await verifyAdmin(req);
  if (!admin) return res.status(401).end();

  if (req.method === 'GET') {
    const users = await (AdminUser as any).find().select('username').lean();
    res.json(users);
  } else if (req.method === 'POST') {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await (AdminUser as any).create({ username, passwordHash: hash });
    res.json({ username: user.username });
  } else if (req.method === 'DELETE') {
    const { username } = req.body;
    await (AdminUser as any).deleteOne({ username });
    res.json({ ok: true });
  } else {
    res.status(405).end();
  }
}
