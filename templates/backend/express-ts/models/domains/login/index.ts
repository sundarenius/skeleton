import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

export interface LoginEntity {
  id: number
  msg: string
}

class Login extends Domain {
  public data = {
    msg: 'Login logic not implemented'
  } as LoginEntity;

  db = Dbs.USERS;
  collection = Collections.ALL_USERS;

  constructor (payload: LoginEntity) {
    super();
    this.data.id = Number(payload.id) || 1;
    this.verifyTypes();
  }

  verifyTypes () {
    if (isNaN(this.data.id)) this.intError('id');
  }

  verifyPayloadAndHandleReq (payload: LoginEntity, method: Request['method'], data: LoginEntity): any {
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

const login = async ({ payload, method }: IPayload) => {
  const entity: Login = new Login(payload as LoginEntity);
  const result = entity.verifyPayloadAndHandleReq(payload as LoginEntity, method, entity.data);

  console.log('result');
  console.log(result);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default login;
