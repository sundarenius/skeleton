import { HttpStatusCodes, IPayload } from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../../types/mongo-types';

// For db schema
export interface CustomerInfoEntity {
  customerId: number
  name: string,
}

// For payload data
interface IPayloadData {
  customerId: number
  name: string,
}

class Customer extends Domain {
  public data = {} as CustomerInfoEntity;

  db = Dbs.BOOKINGS;
  collection = Collections.CUSTOMER_INFO;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = Number(payload.customerId);
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isNumber(this.data.customerId)) this.intError('dummyId');
  }

  verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: IPayloadData): CustomerInfoEntity {
    switch (method) {
      case 'POST':
        this.verifyData(payload, data);
        return data;
      case 'GET':
        this.verifyData(payload, { customerId: data.customerId });
        return data;
      default:
        return this.customError('Could not handle request') as never;
    }
  }
}

const dummy = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Customer = new Customer(payload as IPayloadData);
  const result: CustomerInfoEntity = entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default dummy;
