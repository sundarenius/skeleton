import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../types/mongo-types';
import { logMongoEvent } from './index';

const getDummyData = async (dummyVal: string) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.FIND,
    dbName: Dbs.TEST_DB,
    collectionName: Collections.TEST_COLLECTION,
    dataSearch: { dummyVal }
  });

  logMongoEvent(`Found ${dummyVal}`);
  console.log(res);
  return res;
};

export const MongoGetAPI = {
  getDummyData,
};