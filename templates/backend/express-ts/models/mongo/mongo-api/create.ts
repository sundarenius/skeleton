import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../types/mongo-types';
import { logMongoEvent } from './index';

const createDummyData = async (dummyVal: string) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.INSERT_ONE,
    dbName: Dbs.TEST_DB,
    collectionName: Collections.TEST_COLLECTION,
    newData: { dummyVal },
  });

  logMongoEvent(`Created ${dummyVal}`);
  console.log(res);
  return res;
};

export const MongoCreateAPI = {
  createDummyData
};