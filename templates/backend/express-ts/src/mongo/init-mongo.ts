import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import mongoOperations from './operations';
import { OperationTypes } from '../types/mongo-types';

dotenv.config();

const url:string = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_ATLAS_URL as string
  : 'mongodb://admin:admin@localhost:27017';

const client = new MongoClient(url);

const connectMongo = async ({
  operation,
  data,
  dbName,
  collectionName,
  newData,
}: any) => {
  await client.connect();
  console.log('Connected successfully to mongodb server');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const operations = mongoOperations(collection);

  const res = await operations[operation as OperationTypes || OperationTypes.FIND](data, newData);

  const resData = {
    success: true,
    db: dbName,
    collection: collectionName,
    type: `Type of operation: ${operation || OperationTypes.FIND}`,
    res,
  };

  console.log('Log from connectMongo function:');
  console.log(JSON.stringify(resData, null, 4));

  return res;
};

const closeClient = async () => {
  if (client) {
    // await client.close()
    console.log('Closed mongoDb client');
  }
};

const mongoInstance = async (parameters: any) => {
  try {
    const res = await connectMongo(parameters);
    return res;
  } catch (err) {
    console.error(err);
    closeClient();
    throw new Error(err as any);
  } finally {
    closeClient();
  }
};

if (process.argv[2] === 'run') {
  console.log(process.argv);
  mongoInstance({});
}

export default mongoInstance;
