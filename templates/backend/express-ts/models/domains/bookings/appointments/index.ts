import { HttpStatusCodes, IPayload } from '../../../../types/globals';
import { Domain, payloadType } from '../../../utils/helpers';
import { formatRes } from '../../index';
import type { Request } from 'express';
import { Dbs, Collections } from '../../../../types/mongo-types';

// For db schema
export interface AppointmentsEntity {
  dummyId: number
}

// For payload data
interface IPayloadData {
  dummyId: number
}

class Appointments extends Domain {
  public data = {} as AppointmentsEntity;

  db = Dbs.BOOKINGS;
  collection = Collections.APPOINTMENTS;

  constructor (payload: IPayloadData) {
    super();
    this.data.dummyId = Number(payload.dummyId);
    this.verifyTypes();
  }

  verifyTypes () {
    if (!payloadType.isNumber(this.data.dummyId)) this.intError('dummyId');
  }

  verifyPayloadAndHandleReq (payload: IPayloadData, method: Request['method'], data: IPayloadData): AppointmentsEntity {
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
  const entity: Appointments = new Appointments(payload as IPayloadData);
  const result: AppointmentsEntity = entity.verifyPayloadAndHandleReq(payload as IPayloadData, method, entity.data);
  
  return formatRes(result, HttpStatusCodes.OK);
}

export default dummy;
