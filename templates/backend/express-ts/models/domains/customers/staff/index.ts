import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
} from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import { get, update } from './service';

export interface IStaffAvailability {
  startDate: number; // start date of the availability period
  endDate: number; // end date of the availability period
  availability: Array<{
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    startTime: string; // start time in format "HH:MM" (24-hour clock)
    lunchTime: string[];  // [startTime, endTime] in format "HH:MM" (24-hour clock)
    endTime: string; // end time in format "HH:MM" (24-hour clock)
  }>;
}

export enum Notification {
  PHONE = 'phone',
  MAIL = 'mail'
}
// For db schema
export interface StaffEntity {
  customerId: string,
  fullname: string,
  picture: string,
  availability: null|IStaffAvailability|false, // if false, this person is off from work, vacation etc ...
  rating: number // 0 to 5 average value - set separately from another domain (this calculates as separate job)
  mail: null|string,
  phone: null|string,
  notificationBy: false|Notification, // if false notification is turned off
  createdAt: number,
}

// For payload data
export type IPayloadData = Pick<StaffEntity,
'customerId' |
'fullname' |
'picture' |
'mail' |
'phone' |
'notificationBy' |
'availability'
>

class Staff extends Domain {
  public data = {} as StaffEntity;

  db = Dbs.CUSTOMERS;
  collection = Collections.STAFF;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.fullname = payload.fullname;
    this.data.picture = payload.picture;
    this.data.mail = payload.mail;
    this.data.phone = payload.phone;
    this.data.notificationBy = payload.notificationBy;
    this.data.availability = payload.availability;
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.fullname && !payloadType.isString(this.data.fullname)) this.stringError('fullname');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: StaffEntity): Promise<any> {
    switch (method) {
      case 'POST':
        this.verifyData(payload, data);
        return this.handlePost(data);
      case 'GET':
        this.verifyData(payload, { customerId: data.customerId });
        return this.handleGet(data.customerId);
      default:
        return this.customError('Could not handle request') as never;
    }
  }

  async handlePost (data: StaffEntity) {
    const res = await update<StaffEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (customerId: string) {
    const res = await get(customerId, this.db, this.collection);
    return res;
  }
}

const staff = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Staff = new Staff(payload as IPayloadData);
  const result: Promise<StaffEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default staff;
