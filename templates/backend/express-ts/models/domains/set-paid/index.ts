import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
} from '../../../types/globals';
import { Domain, payloadType } from '../../utils/helpers';
import { formatRes } from '../index';
import { Dbs, Collections } from '../../../types/mongo-types';
import { update } from './service';
import type { AppointmentsEntity } from '../bookings/appointments';

/*
 * @about - for now this will only be set by admin after normal payment.
 * Next feature is to implement payments from the application by sending the a payment url in confirmation SMS after booking appointment
 * also include digital receipts
 */

// For payload data
export type IPayloadData = Pick<AppointmentsEntity,
'customerId' |
'appointmentId' |
'paid' |
'price'
> & { token: string }

class Paid extends Domain {
  public data = {} as AppointmentsEntity; // actually Partial, some values will only be updated

  db = Dbs.BOOKINGS;
  collection = Collections.APPOINTMENTS;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.appointmentId = payload.appointmentId;
    this.data.paid = payload.paid;
    this.data.price = Number(payload.price);
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (!payloadType.isString(this.data.appointmentId)) this.stringError('appointmentId');
    if (!payloadType.isNumber(this.data.price)) this.intError('price');
    if (!payloadType.isBoolean(this.data.paid)) this.booError('paid');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: AppointmentsEntity): Promise<any> {
    switch (method) {
      case 'POST':
        this.verifyData(payload, data);
        return this.handlePost(data, payload.token);
      default:
        return this.customError('Could not handle request') as never;
    }
  }

  async handlePost (data: AppointmentsEntity, token: string) {
    const res = await update<AppointmentsEntity>(data, token, this.db, this.collection);
    return res;
  }
}

const paid = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Paid = new Paid(payload as IPayloadData);
  const result: Promise<AppointmentsEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);

  // entity.data.paid === true. Send out "Thanks for your payment. Please review our services briefly here after your visit. We really appreciate it."
  // sendText("Thanks for your payment. Please review our services briefly here after your visit (www.url-bookified.com). We really appreciate it.")
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default paid;
