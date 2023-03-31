import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleDelete = async <IData>(data: IData, db: typeof Dbs, collection: Collections) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.DELETE_ONE,
    dbName: db,
    collectionName: collection,
    dataSearch: data,
  });

  logMongoEvent(`Deleted ${data} from DB`);
  console.log(res);
  return res;
};

export const MongoDeleteAPI = {
  simpleDelete,
};