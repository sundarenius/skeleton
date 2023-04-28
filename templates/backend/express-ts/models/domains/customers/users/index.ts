import type { Request } from 'express';
import {
  HttpStatusCodes,
  IPayload,
} from '../../../../types/globals';
import { Domain, payloadType, encryptPwd } from '../../../utils/helpers';
import { formatRes } from '../../index';
import { Dbs, Collections } from '../../../../types/mongo-types';
import { get, update } from './service';

// customers may create one generic admin account and one limited for all to use
export enum Roles {
  ADMIN = 'admin',
  LIMITED = 'limited'
}

// For db schema
export interface UsersEntity {
  customerId: string,
  fullname: string,
  role: Roles,
  username: string,
  pwd: string,
  createdAt: number
}

// For payload data
export type IPayloadData = Pick<UsersEntity,
'customerId' |
'fullname' |
'role' |
'username' |
'pwd'
> & {
  createdBy: Roles // only ADMIN role can create new users or a when customer is created that can be used by most staff
}

class Users extends Domain {
  public data = {} as UsersEntity;

  db = Dbs.CUSTOMERS;
  collection = Collections.USERS;

  constructor (payload: IPayloadData) {
    super();
    this.data.customerId = payload.customerId;
    this.data.fullname = payload.fullname;
    this.data.role = payload.role;
    this.data.username = payload.username;
    this.data.pwd = payload.pwd && encryptPwd(payload.pwd);

    if (payload.createdBy && payload.createdBy !== Roles.ADMIN) throw new Error('User has no permission to add new user');
    
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isString(this.data.customerId)) this.stringError('customerId');
    if (this.data.fullname && !payloadType.isString(this.data.fullname)) this.stringError('fullname');
    if (this.data.username && !payloadType.isString(this.data.username)) this.stringError('username');
    if (this.data.pwd && !payloadType.isString(this.data.pwd)) this.stringError('pwd');
  }

  async verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: UsersEntity): Promise<any> {
    switch (method) {
      case 'POST':
        this.verifyData(payload, {
          ...data,
          createdBy: payload.createdBy
        });
        return this.handlePost(data);
      case 'GET':
        this.verifyData(payload, { customerId: data.customerId, username: data.username, pwd: data.pwd });
        return this.handleGet({
          customerId: data.customerId,
          username: data.username,
          pwd: data.pwd,
        });
      default:
        return this.customError('Could not handle request') as never;
    }
  }

  async handlePost (data: UsersEntity) {
    const res = await update<UsersEntity>(data, this.db, this.collection);
    return res;
  }
  
  async handleGet (user: { customerId: string, username: string, pwd: string }) {
    const res = await get(user, this.db, this.collection);
    return res;
  }
}

const users = async ({ payload, method }: IPayload<IPayloadData>) => {
  const entity: Users = new Users(payload as IPayloadData);
  const result: Promise<UsersEntity> = await entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default users;
