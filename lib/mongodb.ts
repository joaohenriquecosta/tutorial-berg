import { MongoClient, Db, MongoClientOptions } from "mongodb";

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const uri = process.env.MONGODB_URI as string;

// Verify if this options are still necessary making some tests with insomnia

interface mco_type extends MongoClientOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const mongoClientOptions: mco_type = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(uri, mongoClientOptions);

export default async function connect(): Promise<ConnectType> {
  // if (client.isConnected()):
  await client.connect();

  const db = client.db("ecommerce");
  return { db, client };
}
