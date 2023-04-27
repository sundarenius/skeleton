import { HttpStatusCodes, IPayload } from '../../types/globals';
import main from './main';
import staff from './customers/staff';
import users from './customers/users';
import customerInfo from './customers/customer-info';
import texts from './customers/texts';
import appointments from './bookings/appointments';
import feedback from './bookings/feedback';

export const formatRes = (body: IPayload<unknown>['payload'], statusCode: HttpStatusCodes) => {
  return {
    body,
    statusCode
  }
}

const catchWrapper = async (callback: any, payload: IPayload<unknown>) => {
  try {
    return await callback(payload);
  } catch (err: any) {
    const body = {
      errorMsg: err.message,
    };
    
    // status can be set as throw new Error(`some message ${statusCode}`) (last index in message)
    const splitted = err.message.split(' ');
    const failedStatus = Number(splitted[splitted.length - 1]) || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    return formatRes(body, failedStatus);
  }
}

export const domains = {
  main: (payload: IPayload<unknown>) => catchWrapper(main, payload),
  staff: (payload: IPayload<unknown>) => catchWrapper(staff, payload),
  users: (payload: IPayload<unknown>) => catchWrapper(users, payload),
  customerInfo: (payload: IPayload<unknown>) => catchWrapper(customerInfo, payload),
  texts: (payload: IPayload<unknown>) => catchWrapper(texts, payload),
  appointments: (payload: IPayload<unknown>) => catchWrapper(appointments, payload),
  feedback: (payload: IPayload<unknown>) => catchWrapper(feedback, payload),
};