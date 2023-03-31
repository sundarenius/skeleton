import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleGet = async <IData>(data: IData, db: typeof Dbs, collection: Collections) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.FIND,
    dbName: db,
    collectionName: collection,
    dataSearch: data
  });

  logMongoEvent(`Found ${data}`);
  console.log(res);
  return res;
};

export const MongoGetAPI = {
  simpleGet,
};