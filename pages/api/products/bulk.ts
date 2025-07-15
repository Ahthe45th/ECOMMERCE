import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../lib/models";
import { connect } from "../../../lib/db";
import { verifyAdmin } from "../../../lib/auth";

function parseCSV(csv: string) {
  const lines = csv.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ? values[i].trim() : "";
    });
    return obj;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connect();
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const admin = await verifyAdmin(req);
  if (!admin) return res.status(401).end();

  const contentType = req.headers["content-type"] || "";
  let products: any[] = [];

  if (contentType.includes("application/json")) {
    let body = req.body as any;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    products = Array.isArray(body) ? body : body.products || [];
  } else {
    const text = typeof req.body === "string" ? req.body : "";
    products = parseCSV(text);
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "No products provided" });
  }

  const inserted = await (Product as any).insertMany(products);
  res.json(inserted);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
