import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import { Dbs, Collections } from '../../../../types/mongo-types';

export const get = async (user: { customerId: string, username: string, pwd: string }, db: string, collection: Collections) => {
  const getUser = await MongoAPI.simpleGet(
    user,
    db,
    collection,
  );
  const result = getUser.map((v: any) => {
    const obj = { ...v };
    delete obj._id;
    delete obj.pwd;
    return obj;
  });

  if (!result[0]) throw new Error(`User could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return result[0];
};

export const update = async <I>(data: I|any, db: string, collection: Collections) => {
  const findCustomer = await MongoAPI.simpleGet(
    { customerId: data.customerId },
    Dbs.CUSTOMERS,
    Collections.CUSTOMER,
  );
  if (!findCustomer[0]) throw new Error(`customerId not found ${HttpStatusCodes.BAD_REQUEST}`);

  const update: any = await MongoAPI.simpleUpdate<I>(
    data as I,
    { customerId: data.customerId },
    db,
    collection,
  );
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return { username: data.username, fullname: data.fullname };
  throw new Error(`Could not update user`);
};
