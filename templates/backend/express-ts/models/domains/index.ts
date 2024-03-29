import { HttpStatusCodes, IPayload } from '../../types/globals';
import main from './main';
import staff from './customers/staff';
import users from './customers/users';
import customer from './customers/customer';
import texts from './customers/texts';
import appointments from './bookings/appointments';
import feedback from './bookings/feedback';
import paid from './set-paid';

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
    // status can be set as throw new Error(`some message ${statusCode}`) (last index in message)
    const splitted = err.message.split(' ');
    const statusCodeFromMsg = Number(splitted[splitted.length - 1]);

    const errorMsg = !isNaN(statusCodeFromMsg) ? splitted.filter((val: string) => isNaN(Number(val))).join(' ') : err.message;
    const body = {
      errorMsg,
    };
    
    const failedStatus = statusCodeFromMsg || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    console.log(errorMsg);
    return formatRes(body, failedStatus);
  }
}

export const domains = {
  main: (payload: IPayload<unknown>) => catchWrapper(main, payload),
  staff: (payload: IPayload<unknown>) => catchWrapper(staff, payload),
  users: (payload: IPayload<unknown>) => catchWrapper(users, payload),
  customer: (payload: IPayload<unknown>) => catchWrapper(customer, payload),
  texts: (payload: IPayload<unknown>) => catchWrapper(texts, payload),
  appointments: (payload: IPayload<unknown>) => catchWrapper(appointments, payload),
  feedback: (payload: IPayload<unknown>) => catchWrapper(feedback, payload),
  paid: (payload: IPayload<unknown>) => catchWrapper(paid, payload),
};