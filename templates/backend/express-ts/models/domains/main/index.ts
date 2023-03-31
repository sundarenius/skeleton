import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

export interface MainEntity {
  msg: string
}

class Main extends Domain {
  public data = {
    msg: 'Nothing exciting here on main entity',
  } as MainEntity;

  db = Dbs.TEST;
  collection = Collections.TEST;

  constructor (payload: MainEntity) {
    super();
    this.data.msg = payload.msg.toString();
    this.verifyTypes();
  }

  verifyTypes () {}

  verifyPayloadAndHandleReq (payload: MainEntity, method: Request['method'], data: MainEntity): any {
    switch (method) {
      case 'POST':
        this.verifyData(payload, {});
        return data;
      case 'GET':
        this.verifyData(payload, {});
        return data;
      default:
        return this.customError('Could not handle request');
    }
  }
}

const main = async ({ payload, method }: IPayload) => {
  const entity: Main = new Main(payload as MainEntity);
  const result = entity.verifyPayloadAndHandleReq(payload as MainEntity, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default main;
