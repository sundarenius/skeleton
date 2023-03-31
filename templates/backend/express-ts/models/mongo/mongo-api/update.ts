import MongoInstance from '../mongo';
import {
  Dbs,
  Collections,
  MongoDbTransactionTypes,
} from '../../../types/mongo-types';
import { logMongoEvent } from './index';

const simpleUpdate = async <IData>(newData: IData, prevData: IData, db: typeof Dbs, collection: Collections) => {
  const res: Array<unknown> = await MongoInstance({
    operation: MongoDbTransactionTypes.UPDATE_ONE,
    dbName: db,
    collectionName: collection,
    dataSearch: prevData,
    newData: newData,
  });

  logMongoEvent(`Updated ${prevData} to ${newData} from DB`);
  console.log(res);
  return res;
};

export const MongoUpdateAPI = {
  simpleUpdate
};