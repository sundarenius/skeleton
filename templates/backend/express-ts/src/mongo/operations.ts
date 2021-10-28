/* eslint-disable max-len */
import { OperationTypes } from '../types/mongo-types';

const mongoOperations = (collection: any): Record<OperationTypes, any> => ({
  [OperationTypes.INSERT_MANY]: async (data: any) => {
    const res = await collection.insertMany(data);
    return res;
  },
  [OperationTypes.INSERT_ONE]: async (data: any) => {
    const res = await collection.insertOne(data);
    return res;
  },
  [OperationTypes.FIND]: async (data = {}) => {
    const res = await collection.find(data).toArray();
    return res;
  },
  [OperationTypes.DELETE_MANY]: async (data: any) => {
    const res = await collection.deleteMany(data);
    return res;
  },
  [OperationTypes.DELETE_ONE]: async (data: any) => {
    const res = await collection.deleteOne(data);
    return res;
  },
  [OperationTypes.UPDATE_ONE]: async (data: any, newData: any) => {
    const res = await collection.updateOne(data, { $set: newData }, {
      upsert: true,
    });
    return res;
  },
  [OperationTypes.REPLACE_ONE]: async (data: any, newData: any) => {
    const res = await collection.replaceOne(data, newData, {
      upsert: true,
      filter: {},
    });
    return res;
  },
});

export default mongoOperations;
