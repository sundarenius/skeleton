import { HttpStatusCodes, TPayload } from '../types/globals';
import { formatRes } from './index';

const main = async (payload: TPayload) => {
  const body = {
    msg: 'Nothing really exciting here on main route, be more specific'
  };
  
  return formatRes(body, HttpStatusCodes.OK);
}

export default main;
