import { HttpStatusCodes, IPayload } from '../../../types/globals';
import { Domain, payloadType } from '../../utils/helpers';
import { formatRes } from '../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../types/mongo-types';

export interface LoginEntity {
  id: number
  msg: string
}

interface IPayloadData {
  msg: string
}

class Login extends Domain {
  public data = {
    msg: 'Login logic not implemented'
  } as LoginEntity;

  db = Dbs.USERS;
  collection = Collections.ALL_USERS;

  constructor (payload: IPayloadData) {
    super();
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isNumber(this.data.id)) this.intError('id');
  }

  verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: LoginEntity): LoginEntity {
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

const login = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Login = new Login(payload as IPayloadData);
  const result: LoginEntity = entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);

  console.log('result');
  console.log(result);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default login;
