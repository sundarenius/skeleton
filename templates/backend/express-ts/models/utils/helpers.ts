import { HttpStatusCodes } from '../../types/globals';
import { MongoAPI } from '../mongo/mongo-api';
import { Dbs, Collections } from '../../types/mongo-types';

export const apiError = (msg: string, status: HttpStatusCodes = HttpStatusCodes.BAD_REQUEST) => {
  throw new Error(`${msg} ${status}`);
}

export abstract class Domain {
  abstract db: any;
  abstract collection: Collections;

  MongoTransactions = {
    simpleGet: <IData>(data: IData) => MongoAPI.simpleGet<IData>(data, this.db, this.collection),
    simpleUpdate: <IData>(newData: IData, prevData: IData) => MongoAPI.simpleUpdate<IData>(newData, prevData, this.db, this.collection),
    simpleCreate: <IData>(newData: IData) => MongoAPI.simpleCreate<IData>(newData, this.db, this.collection),
    simpleDelete: <IData>(data: IData) => MongoAPI.simpleDelete<IData>(data, this.db, this.collection),
  }

  intError (key: string) {
    apiError(`${key} should be a number`);
  }

  stringError (key: string, extra?: string) {
    apiError(`${key} should be a string ${extra}`);
  }

  booError (key: string, extra?: string) {
    apiError(`${key} should be a boolean ${extra}`);
  }
  
  customError (msg: string, status: HttpStatusCodes = HttpStatusCodes.BAD_REQUEST) {
    apiError(msg, status);
  }
  
  methodNotImplementedError (method: Request['method']) {
    apiError(`Method: ${method} not implemented for this route`)
  }

  protected verifyData <IPayload>(payload: IPayload, mandatoryData: Partial<IPayload>) {
    const payloadKeys = Object.keys(payload as any);
    const entityKeys = Object.keys(mandatoryData as any);

    entityKeys.forEach(key => {
      if (!payloadKeys.includes(key)) {
        apiError(`Payload has missing keys, for example: ${key}`);
      }
    })
    
  }
}

export const payloadType = {
  isNumber: (payload: any) => (typeof Number(payload) === 'number' && !Number.isNaN(Number(payload))),
  isString: (payload: any) => typeof payload === 'string',
  isArrayWithStrings: (payload: any) => Array.isArray(payload) && payload.filter(v => typeof v !== 'string').length === 0,
  isBoolean: (payload: any) => typeof payload === 'boolean',
};

export const encryptPwd = (pwd: string) => pwd
  .replace(/1/g, 'Z').replace(/2/g, '9').replace(/3/g, 'G').replace(/4/g, '1sx')
  .replace(/5/g, '9q').replace(/6/g, 'kll').replace(/7/g, '3').replace(/8/g, 'p2')
  .replace(/9/g, 'sdf').replace(/0/g, 'Jdf').replace(/q/g, 'Z').replace(/w/g, '2dcc')
  .replace(/e/g, 'vvd').replace(/r/g, 'Mdfs').replace(/t/g, 'hgfh').replace(/y/g, '23dd')
  .replace(/u/g, 'hhg').replace(/i/g, '9').replace(/o/g, 'dfs').replace(/p/g, '4')
  .replace(/å/g, '8').replace(/a/g, 'W').replace(/s/g, '7').replace(/d/g, '8')
  .replace(/f/g, 'Chgf').replace(/g/g, 'R').replace(/h/g, '9').replace(/j/g, '6')
  .replace(/k/g, 'R').replace(/l/g, 'adg').replace(/ö/g, 'C').replace(/ä/g, '3fd')
  .replace(/z/g, 'V').replace(/x/g, 'Adf').replace(/c/g, 'W').replace(/v/g, '89')
  .replace(/b/g, 'M').replace(/g/g, '5').replace(/m/g, '7').replace(/,/g, '90cc')
  .replace(/-/g, '1S');


export const extractDayFromCustomerId = (customerId: string) => {
  const split = customerId.toString().split('0');
  const day = split[split.length - 1];
  return day;
}

export const base64String = (str: string) => Buffer.from(str).toString("base64");
export const decodeBase64 = (str: string) => Buffer.from(str, "base64").toString("utf-8");

