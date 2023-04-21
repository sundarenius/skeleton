import { HttpStatusCodes } from '../../types/globals';
import { MongoAPI } from '../mongo/mongo-api';
import { Dbs, Collections } from '../../types/mongo-types';

export const apiError = (msg: string, status: HttpStatusCodes = HttpStatusCodes.BAD_REQUEST) => {
  throw new Error(`${msg}. Status: ${status}`);
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
  isNumber: (payload: any) => typeof Number(payload) === 'number' && !Number.isNaN(Number(payload)),
  isString: (payload: any) => typeof payload === 'string',
};
