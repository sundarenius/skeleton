import MongoInstance from '../mongo';
import {
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleUpdate = async <IData>(newData: IData, prevData: any, db: string, collection: Collections, collectionCallback: any = false) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.UPDATE_ONE,
    dbName: db,
    collectionName: collection,
    dataSearch: prevData,
    newData: newData,
    collectionCallback
  });

  logMongoEvent(`Updated or insterted data in MongoDB`);
  console.log(res);
  return res;
};

export const MongoUpdateAPI = {
  simpleUpdate
};