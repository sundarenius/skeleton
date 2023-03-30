import { HttpStatusCodes, TPayload } from '../types/globals';
import login from './login';
import main from './main';

let httpFailedStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;
export const setHttpFailedStatus = (failedStatus: HttpStatusCodes) => { httpFailedStatus = failedStatus };

export const formatRes = (body: TPayload, statusCode: HttpStatusCodes) => {
  return {
    body,
    statusCode
  }
}

const catchWrapper = async (callback: any, payload: TPayload) => {
  try {
    return await callback(payload);
  } catch (err: any) {
    const body = {
      errorMsg: err.message,
    };
    
    return formatRes(body, httpFailedStatus);
  }
}

export const domains = {
  main: (payload: Record<any, any>) => catchWrapper(main, payload),
  login: (payload: Record<any, any>) => catchWrapper(login, payload),
};