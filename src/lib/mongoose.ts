import mongoose from 'mongoose';

declare global {
  var _mongooseGlobal:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

export async function connectToDatabase() {
  // Get MONGO_URI at runtime, not at module load time
  const MONGO_URI = process.env.MONGO_URI || process.env.NEXT_PUBLIC_MONGO_URI;

  // Only throw error when actually trying to connect
  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env or NEXT_PUBLIC_MONGO_URI");
  }

  if (global._mongooseGlobal?.conn) {
    return global._mongooseGlobal.conn;
  }

  if (!global._mongooseGlobal)
    global._mongooseGlobal = { conn: null, promise: null };

  if (!global._mongooseGlobal.promise) {
    global._mongooseGlobal.promise = mongoose.connect(MONGO_URI).then((m) => {
      global._mongooseGlobal!.conn = m;
      return m;
    });
  }

  return global._mongooseGlobal.promise;
}
