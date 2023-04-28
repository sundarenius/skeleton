import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
} from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import { get, update } from './service';

// For db schema
export interface TextsEntity {
  customerId: string,
  texts: Record<string, string> // frontend landing page texts
}

// For payload data
export type IPayloadData = Pick<TextsEntity,
'customerId' |
'texts'
>

class Texts extends Domain {
  public data = {} as TextsEntity;

  db = Dbs.CUSTOMERS;
  collection = Collections.TEXTS;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.texts = payload.texts;
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.texts && !payloadType.isArrayWithStrings(Object.values(this.data.texts))) this.stringError('texts', 'an object of strings');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: TextsEntity): Promise<any> {
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

  async handlePost (data: TextsEntity) {
    const res = await update<TextsEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (customerId: string) {
    const res = await get(customerId, this.db, this.collection);
    return res;
  }
}

const texts = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Texts = new Texts(payload as IPayloadData);
  const result: Promise<TextsEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default texts;
