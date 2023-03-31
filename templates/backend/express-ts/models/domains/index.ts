import { HttpStatusCodes, IPayload } from '../../types/globals';
import login from './login';
import main from './main';
import dummy from './dummy';

export const formatRes = (body: IPayload['payload'], statusCode: HttpStatusCodes) => {
  return {
    body,
    statusCode
  }
}

const catchWrapper = async (callback: any, payload: IPayload) => {
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
  main: (payload: IPayload) => catchWrapper(main, payload),
  login: (payload: IPayload) => catchWrapper(login, payload),
  dummy: (payload: IPayload) => catchWrapper(dummy, payload),
};