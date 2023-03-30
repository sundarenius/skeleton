import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../types/mongo-types';
import { logMongoEvent } from './index';

const updateDummyData = async (newDummyVal: string, dummyVal: string) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.UPDATE_ONE,
    dbName: Dbs.TEST_DB,
    collectionName: Collections.TEST_COLLECTION,
    dataSearch: { dummyVal },
    newData: { dummyVal: newDummyVal },
  });

  logMongoEvent(`Updated ${dummyVal} to ${newDummyVal} from DB`);
  console.log(res);
  return res;
};

export const MongoUpdateAPI = {
  updateDummyData
};