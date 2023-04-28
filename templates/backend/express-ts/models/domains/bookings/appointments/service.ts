import { v4 as uuidv4 } from 'uuid';
import { MongoAPI } from '../../../mongo/mongo-api';
import { HttpStatusCodes } from '../../../../types/globals';
import { Dbs, Collections } from '../../../../types/mongo-types';
import type { IFilter } from '../../../../types/globals';

export const get = async (data: { customerId: string, appointmentId?: string, filter?: IFilter }, db: string, collection: Collections) => {
  // if appointmentId is not set, set a filter based on startTime (today)
  const searchData = {
    customerId: data.customerId,
    ...data.appointmentId && { appointmentId: data.appointmentId },
    ...!data.appointmentId && data.filter && data.filter.from && { startTime: { $gt: data.filter.from } },
  };
  const collectionCallback = async (collection: any) => {
    const res = await collection.find(searchData).sort({ startTime: -1 }).toArray();
    return res;
  }
  const getAppointment = await MongoAPI.simpleGet(
    {},
    db,
    collection,
    collectionCallback,
  );

  if (!getAppointment[0]) throw new Error(`Appointment could not be found ${HttpStatusCodes.BAD_REQUEST}`);
  return getAppointment.length === 1 ? getAppointment[0] : getAppointment.map((v: any) => {
    delete v._id;
    return v;
  });
};

export const update = async <I>(data: I|any, db: string, collection: Collections) => {
  const findCustomer = await MongoAPI.simpleGet(
    { customerId: data.customerId },
    Dbs.CUSTOMERS,
    Collections.CUSTOMER,
  );
  if (!findCustomer[0]) throw new Error(`customerId not found ${HttpStatusCodes.BAD_REQUEST}`);

  let appointmentExists = false;
  try {
    const appointment = await get({ customerId: data.customerId, appointmentId: data.appointmentId || 'x' }, db, collection );
    if (appointment) appointmentExists = true;
  } catch {}

  const newData = {
    ...data,
  } as I|any;

  if (!appointmentExists) {
    newData.appointmentId = uuidv4();
  }


  const update: any = await MongoAPI.simpleUpdate<I>(
    newData as I,
    { customerId: data.customerId, appointmentId: data.appointmentId },
    db,
    collection,
  );
  if (update.modifiedCount || update.matchedCount || update.upsertedCount) return newData;
  throw new Error(`Could not update appointment`);
};
