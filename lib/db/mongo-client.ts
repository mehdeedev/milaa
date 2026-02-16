import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not defined");

let client: MongoClient;
let db: Db;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoDb(): Promise<Db> {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  const connectedClient = await global._mongoClientPromise;
  db = connectedClient.db(); // <-- THIS is what better-auth needs

  return db;
}
