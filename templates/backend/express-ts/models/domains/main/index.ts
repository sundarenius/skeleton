import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

export interface MainEntity {
  msg: string
}

interface IPayloadData {
  msg: string
}

class Main extends Domain {
  public data = {
    msg: 'Nothing exciting here on main entity',
  } as MainEntity;

  db = Dbs.TEST;
  collection = Collections.TEST;

  constructor (payload: IPayloadData) {
    super();
    this.data.msg = payload.msg.toString();
    this.verifyTypes();
  }

  verifyTypes () {}

  verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: IPayloadData): MainEntity {
    switch (method) {
      case 'POST':
        this.verifyData(payload, {});
        return data;
      case 'GET':
        this.verifyData(payload, {});
        return data;
      default:
        return this.customError('Could not handle request') as never;
    }
  }
}

const main = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Main = new Main(payload as IPayloadData);
  const result: MainEntity = entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default main;
