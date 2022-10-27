import { MongoClient, Db } from "mongodb";

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const uri_env = process.env.MONGODB_URI;
const uri_literal =
  "mongodb+srv://Palinha:xfcQEJMb5amwUXCc@cluster0.f8bthtq.mongodb.net/test";

const client = new MongoClient(uri_literal, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

const connect = async (): Promise<ConnectType> => {
  // if (client.isConnected()):
  await client.connect();

  const db = client.db("ecommerce");
  return { db, client };
};

export default connect;
