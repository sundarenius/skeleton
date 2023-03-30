import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import mongoTransactions from './transactions';
import { MongoDbTransactionTypes } from '../types/mongo-types';

dotenv.config();

const url:string = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_ATLAS_URL as string
  : 'mongodb://localhost:27017';

const connectMongo = async ({
  operation,
  newData,
  dataSearch,
  dbName,
  collectionName,
  collectionCallback,
}: any) => {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to mongodb server');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const transactions = mongoTransactions(collection);

  const res = await transactions[operation as MongoDbTransactionTypes
    || MongoDbTransactionTypes.FIND](newData, dataSearch, collectionCallback);

  const resData = {
    success: true,
    db: dbName,
    collection: collectionName,
    type: `Type of operation: ${operation || MongoDbTransactionTypes.FIND}`,
    res,
  };

  console.log('Log from connectMongo function:');
  console.log(JSON.stringify(resData, null, 4));

  await client.close()

  return res;
};

const mongoInstance = async (parameters: any) => {
  try {
    const res = await connectMongo(parameters);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error(err as any);
  }
};

if (process.argv[2] === 'run') {
  console.log(process.argv);
  mongoInstance({});
}

export default mongoInstance;
