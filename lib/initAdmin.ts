import { AdminUser } from './models';
import bcrypt from 'bcryptjs';

export async function ensureDefaultAdmin() {
  const existing = await (AdminUser as any).findOne({ username: 'qaid' });
  if (!existing) {
    const hash = await bcrypt.hash('jond', 10);
    await (AdminUser as any).create({ username: 'qaid', passwordHash: hash });
  }
}
