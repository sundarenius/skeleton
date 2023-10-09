import { HttpStatusCodes, IPayload } from '../types/globals';
import main from '../domains/main'
export const formatErrorRes = (body: IPayload<unknown>['payload'], statusCode: HttpStatusCodes) => {
  return {
    body,
    statusCode
  }
}

const catchWrapper = async (handler: any, payload: IPayload<unknown>) => {
  try {
    return await handler(payload);
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
    return formatErrorRes(body, failedStatus);
  }
}

export const methods = {
  GET: 'get',
  POST: 'post'
}

// Custom routes. Grapgql route is defined from main.ts
export const routes = [
  {
    path: '/',
    handler: (payload: IPayload<unknown>) => catchWrapper(main, payload),
    methods: [methods.GET, methods.POST]
  },
];
