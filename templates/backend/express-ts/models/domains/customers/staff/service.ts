import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import { Dbs, Collections } from '../../../../types/mongo-types';

export const get = async (customerId: string, db: string, collection: Collections) => {
  const getStaffs = await MongoAPI.simpleGet(
    { customerId },
    db,
    collection,
  );
  if (getStaffs.length === 0) throw new Error(`Staff could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return getStaffs.map((v: any) => {
    const staff = { ...v };
    delete staff._id;
    return staff;
  });
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
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return data;
  throw new Error(`Could not update Staff`);
};
