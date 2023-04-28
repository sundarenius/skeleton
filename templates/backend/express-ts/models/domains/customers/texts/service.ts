import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import { Dbs, Collections } from '../../../../types/mongo-types';

export const get = async (customerId: string, db: string, collection: Collections) => {
  const getTexts = await MongoAPI.simpleGet(
    { customerId },
    db,
    collection,
  );
  const result = getTexts.map((v: any) => {
    const obj = { ...v };
    delete obj._id;
    return obj;
  });

  if (!result[0]) throw new Error(`Texts could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return result[0];
};

export const update = async <I>(data: I|any, db: string, collection: Collections) => {
  const findCustomer = await MongoAPI.simpleGet(
    { customerId: data.customerId },
    Dbs.CUSTOMERS,
    Collections.CUSTOMER,
  );
  if (!findCustomer[0]) throw new Error(`customerId not found ${HttpStatusCodes.BAD_REQUEST}`);

  let mergeWithCurrentTexts = {};

  try {
    const getTexts = await get(data.customerId, db, collection);

    mergeWithCurrentTexts = {
      ...getTexts.texts && { ...getTexts.texts },
      ...data.texts
    }
  } catch {
    mergeWithCurrentTexts = {
      ...data.texts
    }
  }

  const update: any = await MongoAPI.simpleUpdate<I>(
    {
      customerId: data.customerId,
      texts: mergeWithCurrentTexts
    } as I,
    { customerId: data.customerId },
    db,
    collection,
  );
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return mergeWithCurrentTexts;
  throw new Error(`Could not update Staff`);
};
