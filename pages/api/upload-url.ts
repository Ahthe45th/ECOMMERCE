import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { verifyAdmin } from "../../lib/auth";
import fs from "fs";
import path from "path";

const bucketName = process.env.GCS_BUCKET_NAME || "";

// Vercel does not allow bundling arbitrary files, but the Google Cloud
// client expects GOOGLE_APPLICATION_CREDENTIALS to be a file path. If the
// environment variable contains JSON instead of a path, write it to a
// temporary location and update the variable accordingly before creating the
// Storage instance.
const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (creds && creds.trim().startsWith("{") && creds.includes("private_key")) {
  const tmpPath = path.join("/tmp", "gcp-creds.json");
  try {
    fs.writeFileSync(tmpPath, creds);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath;
  } catch (err) {
    console.error("Failed to write GCP credentials file", err);
  }
}

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
