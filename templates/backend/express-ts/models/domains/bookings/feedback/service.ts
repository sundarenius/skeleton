import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import type { IFilter } from '../../../../types/globals';
import { Dbs, Collections } from '../../../../types/mongo-types';

export const get = async (data: { customerId: string, appointmentId?: string, filter?: IFilter }, db: string, collection: Collections) => {
  // if appointmentId is not set, set a filter based on startTime
  const searchData = {
    customerId: data.customerId,
    ...data.appointmentId && { appointmentId: data.appointmentId },
    ...!data.appointmentId && data.filter && data.filter.from && { createdAt: { $gt: data.filter.from } },
  };
  const getFeedback = await MongoAPI.simpleGet(
    searchData,
    db,
    collection,
  );
  if (!getFeedback[0]) throw new Error(`Feedback could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return getFeedback.length === 1 ? getFeedback[0] : getFeedback.map((v: any) => {
    delete v._id;
    return v;
  });;
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
    { customerId: data.customerId, appointmentId: data.appointmentId },
    db,
    collection,
  );
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return data;
  throw new Error(`Could not update feedback`);
};
