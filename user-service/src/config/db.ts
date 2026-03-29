import { MongoClient, Db } from "mongodb";

let db: Db;

export const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI as string);

    await client.connect();
    db = client.db(); // uses DB name from URI

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};
