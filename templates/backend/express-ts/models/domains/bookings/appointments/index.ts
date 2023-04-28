import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
  Currencies,
} from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import { get, update } from './service';
import type { IFilter } from '../../../../types/globals';

export interface IAttendee {
  name: string,
  phone: string,
}

// For db schema
export interface AppointmentsEntity {
  customerId: string,
  appointmentId: string, // if new appointment, just send in empty string and new id will be generated
  service: string, // the service offered by the customer
  startTime: number,
  durationMinutes: number, // set by the service
  staff: null|string, // the member of the staff of null if not specifically set
  price: number,
  currency: Currencies,
  attendee: IAttendee, // start with just one attendee, if needed make it "attendees"
  comment: string, // attendee can add comment
  paid: boolean, // paid should get updated from different domain with extra layer of security
  seen: boolean,
  cancelled: boolean,
  addedByAdmin: boolean,
  createdAt: number
}

// For payload data
export type IPayloadData = Pick<AppointmentsEntity,
'customerId' |
'appointmentId' |
'service' |
'startTime' |
'durationMinutes' |
'staff' |
'price' |
'currency' |
'attendee' |
'seen' |
'comment' |
'addedByAdmin' |
'cancelled'
> & { filter: IFilter }

class Appointments extends Domain {
  public data = {} as AppointmentsEntity;

  db = Dbs.BOOKINGS;
  collection = Collections.APPOINTMENTS;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.appointmentId = payload.appointmentId;
    this.data.service = payload.service;
    this.data.startTime = payload.startTime;
    this.data.durationMinutes = payload.durationMinutes;
    this.data.staff = payload.staff;
    this.data.price = payload.price;
    this.data.currency = payload.currency;
    this.data.attendee = payload.attendee;
    this.data.seen = payload.seen;
    this.data.comment = payload.comment;
    this.data.addedByAdmin = payload.addedByAdmin || false;
    this.data.cancelled = payload.cancelled;
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.appointmentId && !payloadType.isString(this.data.appointmentId)) this.stringError('appointmentId');
    if (this.data.service && !payloadType.isString(this.data.service)) this.stringError('service');
    if (this.data.addedByAdmin && !payloadType.isBoolean(this.data.addedByAdmin)) this.booError('addedByAdmin');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: AppointmentsEntity): Promise<any> {
    switch (method) {
      case 'POST':
        this.verifyData(payload, data);
        return this.handlePost(data);
      case 'GET':
        this.verifyData(payload, { customerId: data.customerId });
        return this.handleGet({
          customerId: data.customerId,
          ...data.appointmentId && { appointmentId: data.appointmentId },
          ...payload.filter && { filter: payload.filter },
        });
      default:
        return this.customError('Could not handle request') as never;
    }
  }

  async handlePost (data: AppointmentsEntity) {
    const res = await update<AppointmentsEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (data: { customerId: string, appointmentId?: string, filter?: IFilter }) {
    const res = await get(data, this.db, this.collection);
    return res;
  }
}

const appointments = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Appointments = new Appointments(payload as IPayloadData);
  const result: Promise<AppointmentsEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);

  // !entity.data.cancelled === true
  // sendText("Your appointment is confirmed at dd mm yyyy HH:MM");

  // entity.data.cancelled === true
  // sendText("Your appointment has been cancelled at dd mm yyyy HH:MM");
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default appointments;
