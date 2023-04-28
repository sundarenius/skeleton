import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
  Templates,
} from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import { Currencies } from '../../../../types/globals';
import { get, update } from './service';

export interface IServices {
  title: string,
  price: number,
  currency: Currencies,
  durationMinutes: number
}

// For db schema
export interface CustomerEntity {
  customerId: string, // if newly created customer, just send empty string and new id will be generated
  name: string,
  frontEndTemplate: Templates,
  logo: string,
  mail: string,
  phone: string,
  businessHours: string[], // 24H clock eg. ['09:00', '19:00']
  lunchBreak: null | string|number[] // 24H clock like ['12:00', minutesDuration], null if no break
  services: IServices[],
  token: string,
  createdAt: number,
}

// For payload data
export type IPayloadData = Pick<CustomerEntity,
'customerId' |
'name' |
'frontEndTemplate' |
'mail' |
'phone' |
'logo' |
'businessHours' |
'lunchBreak' |
'services'
>

class Customer extends Domain {
  public data = {} as CustomerEntity;

  db = Dbs.CUSTOMERS;
  collection = Collections.CUSTOMER;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.name = payload.name;
    this.data.frontEndTemplate = payload.frontEndTemplate;
    this.data.logo = payload.logo;
    this.data.mail = payload.mail;
    this.data.phone = payload.phone;
    this.data.businessHours = payload.businessHours;
    this.data.lunchBreak = payload.lunchBreak;
    this.data.services = payload.services;
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.name && !payloadType.isString(this.data.name)) this.stringError('name');
    if (this.data.logo && !payloadType.isString(this.data.logo)) this.stringError('logo');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: CustomerEntity): Promise<any> {
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

  async handlePost (data: CustomerEntity) {
    const res = await update<CustomerEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (customerId: string) {
    const res = await get(customerId, this.db, this.collection);
    return res;
  }
}

const customer = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Customer = new Customer(payload as IPayloadData);
  const result: Promise<CustomerEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default customer;
