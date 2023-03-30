/* eslint-disable max-len */
import { MongoDbTransactionTypes } from '../types/mongo-types';

const mongoTransactions = (collection: any): Record<MongoDbTransactionTypes, any> => ({
  [MongoDbTransactionTypes.INSERT_MANY]: async (newData: any) => {
    const res = await collection.insertMany(newData);
    return res;
  },
  [MongoDbTransactionTypes.INSERT_ONE]: async (newData: any) => {
    const res = await collection.insertOne(newData);
    return res;
  },
  [MongoDbTransactionTypes.FIND]: async (newData: any, dataSearch: any, collectionCallback: any) => {
    if (collectionCallback) {
      const callbackRes = await collectionCallback(collection);
      return callbackRes;
    }
    const res = await collection.find(dataSearch).toArray();
    return res;
  },
  [MongoDbTransactionTypes.DELETE_MANY]: async (newData: any, dataSearch: any) => {
    const res = await collection.deleteMany(dataSearch);
    return res;
  },
  [MongoDbTransactionTypes.DELETE_ONE]: async (newData: any, dataSearch: any) => {
    const res = await collection.deleteOne(dataSearch);
    return res;
  },
  [MongoDbTransactionTypes.UPDATE_ONE]: async (newData: any, dataSearch: any) => {
    const res = await collection.updateOne(dataSearch, { $set: newData }, {
      upsert: true,
    });
    return res;
  },
  [MongoDbTransactionTypes.REPLACE_ONE]: async (newData: any, dataSearch: any) => {
    const res = await collection.replaceOne(dataSearch, newData, {
      upsert: true,
      filter: {},
    });
    return res;
  },
});

export default mongoTransactions;
