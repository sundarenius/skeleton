import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleCreate = async <IData>(newData: IData, db: typeof Dbs, collection: Collections) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.INSERT_ONE,
    dbName: db,
    collectionName: collection,
    newData,
  });

  logMongoEvent(`Created ${newData}`);
  console.log(res);
  return res;
};

export const MongoCreateAPI = {
  simpleCreate
};