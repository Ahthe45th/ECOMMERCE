import jwt from "jsonwebtoken";
import { AdminUser } from "./models";
import { connect } from "./db";

const SECRET = process.env.JWT_SECRET || "secret";

export function signToken(id: string) {
  return jwt.sign({ id }, SECRET, { expiresIn: "3d" });
}

export async function verifyAdmin(req: { headers: { cookie?: string } }) {
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin-token="))
    ?.split("=")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET) as any;
    await connect();
    const admin = await (AdminUser as any).findById(decoded.id).lean();
    return admin;
  } catch {
    return null;
  }
}
