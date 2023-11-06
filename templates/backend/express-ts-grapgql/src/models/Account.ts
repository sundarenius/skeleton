import { Collections } from '../mongodb/mongo-config';
import { getModelData } from '../utils/helpers';

export interface AccountEntity {
  customerId: string,
  pwd: string,
  username: string,
  mail: string,
  created: string,
  lastLogin: string,
}

class Account implements AccountEntity {
  public static collection = Collections.ACCOUNTS;

  customerId: string;

  pwd: string;

  username: string;

  mail: string;

  created: string;

  lastLogin: string;

  constructor(payload: AccountEntity) {
    this.customerId = payload.customerId;
    this.pwd = payload.pwd;
    this.username = payload.username;
    this.mail = payload.mail;
    this.created = payload.created;
    this.lastLogin = payload.lastLogin;
  }

  getData(allRequired = false): Partial<AccountEntity> {
    const data: any = {
      customerId: this.customerId,
      pwd: this.pwd,
      username: this.username,
      mail: this.mail,
      created: this.created,
      lastLogin: this.lastLogin,
    };

    return getModelData<AccountEntity>(allRequired, data);
  }
}

export default Account;
