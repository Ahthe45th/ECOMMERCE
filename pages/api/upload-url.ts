import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { verifyAdmin } from "../../lib/auth";

const bucketName = process.env.GCS_BUCKET_NAME || "";
const storage = new Storage();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const admin = await verifyAdmin(req);
  if (!admin) return res.status(401).end();

  const fileName = req.query.fileName;
  if (!bucketName || typeof fileName !== "string") {
    return res.status(400).json({ error: "Missing bucket or fileName" });
  }

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 10 * 60 * 1000,
    contentType: "application/octet-stream",
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  res.json({ uploadUrl: url, publicUrl });
}
