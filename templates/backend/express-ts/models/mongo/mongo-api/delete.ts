import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../types/mongo-types';
import { logMongoEvent } from './index';

const deleteDummyData = async (dummyVal: string) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.DELETE_ONE,
    dbName: Dbs.TEST_DB,
    collectionName: Collections.TEST_COLLECTION,
    dataSearch: { dummyVal },
  });

  logMongoEvent(`Deleted ${dummyVal} from DB`);
  console.log(res);
  return res;
};

export const MongoDeleteAPI = {
  deleteDummyData,
};