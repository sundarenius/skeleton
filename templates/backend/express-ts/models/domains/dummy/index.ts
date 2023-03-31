import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

interface IResult {}

export interface DummyEntity {
  dummyId: number
  dummyVal: string,
  anotherVal: string,
  someInt: number
}

class Dummy extends Domain {
  public data = {} as DummyEntity;

  db = Dbs.DUMMY;
  collection = Collections.DUMMY;

  constructor (payload: DummyEntity) {
    super();
    this.data.dummyId = Number(payload.dummyId);
    this.data.dummyVal = payload.dummyVal.toString();
    this.data.anotherVal = payload.anotherVal.toString();
    this.data.someInt = Number(payload.someInt);
    this.verifyTypes();
  }

  verifyTypes () {
    if (isNaN(this.data.dummyId)) this.intError('dummyId');
    if (isNaN(this.data.someInt)) this.intError('someInt');
  }

  verifyPayloadAndHandleReq (payload: DummyEntity, method: Request['method'], data: DummyEntity): IResult {
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

const dummy = async ({ payload, method }: IPayload) => {
  const entity: Dummy = new Dummy(payload as DummyEntity);
  const result: IResult = entity.verifyPayloadAndHandleReq(payload as DummyEntity, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default dummy;
