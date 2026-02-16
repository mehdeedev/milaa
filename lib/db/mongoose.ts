import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

/**
 * Global mongoose cache type
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend NodeJS global type safely
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

const dbOptions = {
  maxPoolSize: 10, // Set the pool size as needed
};

export async function connectDB(): Promise<Mongoose> {
  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, dbOptions);
  }

  globalCache.conn = await globalCache.promise;
  global.mongooseCache = globalCache;

  return globalCache.conn;
}
