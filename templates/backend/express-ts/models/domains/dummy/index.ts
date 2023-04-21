import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain, payloadType } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

// For db schema
export interface DummyEntity {
  dummyId: number
  dummyVal: string,
  anotherVal: string,
  someInt: number
}

// For payload data
interface IPayloadData {
  dummyId: number
  dummyVal: string,
  anotherVal: string,
  someInt: number
}

class Dummy extends Domain {
  public data = {} as DummyEntity;

  db = Dbs.DUMMY;
  collection = Collections.DUMMY;

  constructor (payload: IPayloadData) {
    super();
    this.data.dummyId = Number(payload.dummyId);
    this.data.dummyVal = payload.dummyVal.toString();
    this.data.anotherVal = payload.anotherVal.toString();
    this.data.someInt = Number(payload.someInt);
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isNumber(this.data.dummyId)) this.intError('dummyId');
    if (!payloadType.isNumber(this.data.someInt)) this.intError('someInt');
  }

  verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: DummyEntity): DummyEntity {
    switch (method) {
      case 'POST':
        this.verifyData(payload, data);
        return data;
      case 'GET':
        this.verifyData(payload, { dummyId: data.dummyId });
        return data;
      default:
        return this.customError('Could not handle request') as never;
    }
  }
}

const dummy = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Dummy = new Dummy(payload as IPayloadData);
  const result: DummyEntity = entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default dummy;
