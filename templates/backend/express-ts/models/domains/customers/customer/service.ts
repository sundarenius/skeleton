import { v4 as uuidv4 } from 'uuid';
import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import type { Collections } from '../../../../types/mongo-types';

export const get = async (customerId: string, db: string, collection: Collections) => {
  const getCustomer = await MongoAPI.simpleGet(
    { customerId },
    db,
    collection,
  );
  if (!getCustomer[0]) throw new Error(`Customer could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return getCustomer[0];
};

export const update = async <I>(data: I|any, db: string, collection: Collections) => {
  let customerExists = false;
  try {
    const customer = await get(data.customerId || 'x', db, collection);
    if (customer) customerExists = true;
  } catch {}

  const newData = {
    ...data,
  } as I|any;

  if (!customerExists) {
    newData.customerId = `${uuidv4()}0${new Date().getMinutes()}`;
    newData.token = uuidv4();
  }

  const update: any = await MongoAPI.simpleUpdate<I>(
    newData as I,
    { customerId: data.customerId },
    db,
    collection,
  );
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return newData;
  throw new Error(`Could not update customer`);
};
