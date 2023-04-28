import MongoInstance from '../mongo';
import {
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleGet = async <IData>(data: IData, db: string, collection: Collections, collectionCallback: any = null) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.FIND,
    dbName: db,
    collectionName: collection,
    dataSearch: data,
    collectionCallback
  });

  if (res.length > 0) logMongoEvent(`Found data in mongo`);
  console.log(res);
  return res;
};

export const MongoGetAPI = {
  simpleGet,
};