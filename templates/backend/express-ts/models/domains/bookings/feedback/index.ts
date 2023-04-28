import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
  Currencies,
} from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import type { IFilter } from '../../../../types/globals';
import { get, update } from './service';

export interface IAttendee {
  name: string,
  phone: string,
}

// For db schema
export interface FeedbackEntity {
  customerId: string,
  appointmentId: string,
  service: string, // the service offered by the customer
  startTime: number,
  staff: null|string, // the member of the staff of null if not specifically set
  price: number,
  currency: Currencies,
  attendee: IAttendee, // start with just one attendee, if needed make it "attendees"
  review: string,
  rating: number, // 0 - 5
  public: boolean, // should it be displayed on website?
  seen: boolean,
  createdAt: number
}

// For payload data
export type IPayloadData = Pick<FeedbackEntity,
'customerId' |
'appointmentId' |
'service' |
'startTime' |
'staff' |
'price' |
'currency' |
'attendee' |
'review' |
'public' |
'seen' |
'rating'
> & { filter?: IFilter }

class Feedback extends Domain {
  public data = {} as FeedbackEntity;

  db = Dbs.BOOKINGS;
  collection = Collections.FEEDBACK;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.appointmentId = payload.appointmentId;
    this.data.service = payload.service;
    this.data.startTime = payload.startTime;
    this.data.staff = payload.staff;
    this.data.price = payload.price;
    this.data.currency = payload.currency;
    this.data.attendee = payload.attendee;
    this.data.review = payload.review;
    this.data.public = payload.public;
    this.data.seen = payload.seen;
    this.data.rating = payload.rating;
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.appointmentId && !payloadType.isString(this.data.appointmentId)) this.stringError('appointmentId');
    if (this.data.service && !payloadType.isString(this.data.service)) this.stringError('service');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: FeedbackEntity): Promise<any> {
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

  async handlePost (data: FeedbackEntity) {
    const res = await update<FeedbackEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (data: { customerId: string, appointmentId?: string, filter?: IFilter }) {
    const res = await get(data, this.db, this.collection);
    return res;
  }
}

const feedback = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Feedback = new Feedback(payload as IPayloadData);
  const result: Promise<FeedbackEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default feedback;
