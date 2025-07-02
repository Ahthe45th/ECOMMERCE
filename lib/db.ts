import mongoose from "mongoose";

// Connection string for MongoDB. An environment variable can override the
// default local database used in development.
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce";

// Use a global cached connection across hot reloads in development.
let cached = (global as any).mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default mongoose;
